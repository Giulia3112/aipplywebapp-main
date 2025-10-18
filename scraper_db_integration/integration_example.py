"""
Example: How to integrate database auto-save into your scraper API

Add these changes to your main.py or main_enhanced.py in AIpply-AI-Agent-Main repo
"""

# 1. Add this import at the top of main.py
from database_config import save_to_database, DATABASE_ENABLED

# 2. Modify your existing search endpoint like this:

@app.get("/api/search")
async def search_opportunities(
    keyword: str = Query(None, description="Search keyword"),
    region: str = Query(None, description="Region filter"),
    type: str = Query(None, description="Type filter (scholarship, fellowship, etc.)")
):
    """
    Search opportunities from web scraping
    NOW WITH AUTO-SAVE TO DATABASE!
    """
    try:
        # Your existing scraping logic
        opportunities = scrape_opportunities(keyword, region, type)
        
        # NEW: Auto-save to database (non-blocking)
        if DATABASE_ENABLED and opportunities:
            try:
                saved_count = save_to_database(opportunities)
                print(f"📊 Scraped: {len(opportunities)} | Saved: {saved_count} new to DB")
            except Exception as e:
                print(f"⚠️ Database save failed (non-critical): {e}")
                # Continue anyway - scraping still works even if DB fails
        
        # Return scraped results as before
        return {
            "results": opportunities,
            "count": len(opportunities),
            "database_saved": saved_count if DATABASE_ENABLED else 0
        }
        
    except Exception as e:
        print(f"Error in search: {e}")
        return {"error": str(e), "results": []}


# 3. Optional: Add an endpoint to see database stats

@app.get("/api/database/stats")
async def database_stats():
    """Check database status and statistics"""
    if not DATABASE_ENABLED:
        return {"enabled": False, "message": "Database not configured"}
    
    from database_config import SessionLocal, Opportunity
    
    db = SessionLocal()
    try:
        total = db.query(Opportunity).count()
        by_type = db.execute(
            "SELECT type, COUNT(*) as count FROM opportunities GROUP BY type"
        ).fetchall()
        
        return {
            "enabled": True,
            "total_opportunities": total,
            "by_type": [{"type": t[0], "count": t[1]} for t in by_type]
        }
    finally:
        db.close()


# 4. Optional: Add manual database sync endpoint

@app.post("/api/admin/sync-database")
async def sync_database():
    """
    Manually trigger a full scrape and database sync
    Useful for initial population or maintenance
    """
    if not DATABASE_ENABLED:
        return {"error": "Database not configured"}
    
    try:
        # Scrape all sources without filters
        all_opportunities = scrape_opportunities()
        
        # Save all to database
        saved_count = save_to_database(all_opportunities)
        
        return {
            "status": "success",
            "scraped": len(all_opportunities),
            "saved": saved_count,
            "message": f"Synced {saved_count} new opportunities to database"
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

