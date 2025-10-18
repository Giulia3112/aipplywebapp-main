# Updated main.py with database integration

from fastapi import FastAPI, Query, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import os

# Import database setup
from database_setup import get_db, init_db, Opportunity, engine
from services.db_service import (
    search_opportunities_db,
    get_all_opportunities,
    store_opportunities,
    needs_refresh,
    opportunity_to_dict
)

# Import your existing scraper
from services.run_scraper import scrape_opportunities

app = FastAPI(title="AIpply Opportunity Search API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
def startup_event():
    """Initialize database tables on startup"""
    try:
        init_db()
        print("✅ Database initialized successfully!")
    except Exception as e:
        print(f"❌ Database initialization error: {e}")

@app.get("/")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "AIpply Opportunity Search API",
        "version": "2.0 with Database"
    }

@app.post("/api/admin/create-tables")
def create_tables_endpoint():
    """
    Manually create database tables
    Call this endpoint after deployment to initialize the database
    """
    try:
        init_db()
        
        # Verify tables were created
        from sqlalchemy import inspect
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        
        return {
            "status": "success",
            "message": "Database tables created successfully!",
            "tables": tables
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "details": f"Failed to create tables: {e}"
        }

@app.get("/search")
def search_opportunities_endpoint(
    keyword: str = Query(..., description="Search keyword (e.g., 'machine learning scholarship')"),
    region: Optional[str] = Query(None, description="Region filter (e.g., 'USA', 'Europe')"),
    type: Optional[str] = Query(None, description="Type filter (e.g., 'scholarship', 'fellowship')"),
    db: Session = Depends(get_db),
    background_tasks: BackgroundTasks = None
):
    """
    Search opportunities with keyword filtering
    
    - Searches database first (fast)
    - If database is stale (>6 hours), triggers background refresh
    - Returns filtered results based on keyword, region, and type
    """
    try:
        # Check if database needs refresh
        if needs_refresh(db, max_age_hours=6):
            print("🔄 Database is stale, triggering background refresh...")
            # Trigger scraping in background (non-blocking)
            if background_tasks:
                background_tasks.add_task(refresh_database, keyword, region, type)
        
        # Search from database (fast!)
        results = search_opportunities_db(
            keyword=keyword,
            region=region,
            type_filter=type,
            db=db,
            limit=100
        )
        
        # Convert to dict format
        opportunities = [opportunity_to_dict(opp) for opp in results]
        
        print(f"✅ Found {len(opportunities)} opportunities for keyword: '{keyword}'")
        return opportunities
        
    except Exception as e:
        print(f"❌ Search error: {e}")
        # Fallback to direct scraping if database fails
        return scrape_opportunities(keyword, region, type)

@app.get("/api/admin/opportunities")
def get_all_opportunities_endpoint(
    db: Session = Depends(get_db),
    limit: int = Query(1000, description="Maximum number of results")
):
    """
    Get all stored opportunities from database
    Admin endpoint for viewing all data
    """
    try:
        results = get_all_opportunities(db, limit=limit)
        opportunities = [opportunity_to_dict(opp) for opp in results]
        return opportunities
    except Exception as e:
        print(f"❌ Error fetching all opportunities: {e}")
        return []

@app.post("/api/admin/refresh")
def manual_refresh_endpoint(
    keyword: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Manually trigger database refresh by scraping
    Admin endpoint
    """
    try:
        # Run scraper
        scraped_opps = scrape_opportunities(keyword, region, type)
        
        # Store in database
        new_count = store_opportunities(scraped_opps, db)
        
        return {
            "status": "success",
            "scraped": len(scraped_opps),
            "new_opportunities": new_count,
            "message": f"Database refreshed with {new_count} new opportunities"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

def refresh_database(keyword: str = None, region: str = None, type_filter: str = None):
    """
    Background task to refresh database with fresh scraped data
    """
    from database_setup import SessionLocal
    
    try:
        print(f"🔄 Starting background scrape for: {keyword}")
        
        # Scrape fresh opportunities
        scraped_opps = scrape_opportunities(keyword, region, type_filter)
        
        # Store in database
        db = SessionLocal()
        new_count = store_opportunities(scraped_opps, db)
        db.close()
        
        print(f"✅ Background scrape complete: {new_count} new opportunities added")
    except Exception as e:
        print(f"❌ Background scrape error: {e}")

# Run the app
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

