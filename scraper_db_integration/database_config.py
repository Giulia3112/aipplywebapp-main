"""
Database configuration for auto-saving scraped opportunities
Add this file to your AIpply-AI-Agent-Main repository
"""
import os
from sqlalchemy import create_engine, Column, Integer, String, Text, Date, DateTime, Boolean, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# Get DATABASE_URL from environment
DATABASE_URL = os.environ.get("DATABASE_URL")

# Only set up database if URL is provided
if DATABASE_URL:
    # Fix Railway URL format
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base = declarative_base()
    
    class Opportunity(Base):
        __tablename__ = "opportunities"
        
        id = Column(Integer, primary_key=True, index=True)
        title = Column(String, nullable=False, index=True)
        organization = Column(String, index=True)
        type = Column(String, index=True)
        deadline = Column(Date)
        location = Column(String, index=True)
        description = Column(Text)
        url = Column(String, unique=True, nullable=False)
        tags = Column(String)
        is_verified = Column(Boolean, default=False)
        created_at = Column(DateTime(timezone=True), server_default=func.now())
        updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def save_to_database(opportunities_list):
        """
        Save scraped opportunities to database
        Only saves new opportunities (checks URL uniqueness)
        """
        if not opportunities_list:
            return 0
        
        db = SessionLocal()
        saved_count = 0
        
        try:
            for opp in opportunities_list:
                url = opp.get('url')
                if not url:
                    continue
                
                # Check if already exists
                existing = db.query(Opportunity).filter(
                    Opportunity.url == url
                ).first()
                
                if not existing:
                    # Parse deadline if string
                    deadline = opp.get('deadline')
                    if deadline and isinstance(deadline, str):
                        try:
                            from dateutil import parser
                            deadline = parser.parse(deadline).date()
                        except:
                            deadline = None
                    
                    db_opp = Opportunity(
                        title=opp.get('title', 'Untitled')[:200],
                        organization=opp.get('organization', 'Unknown'),
                        type=opp.get('type', 'opportunity'),
                        deadline=deadline,
                        location=opp.get('location', 'International'),
                        description=opp.get('description', '')[:500],
                        url=url,
                        tags=opp.get('tags', ''),
                        is_verified=True  # Scraped data is verified
                    )
                    db.add(db_opp)
                    saved_count += 1
            
            db.commit()
            if saved_count > 0:
                print(f"✅ Auto-saved {saved_count} new opportunities to database")
            return saved_count
            
        except Exception as e:
            print(f"❌ Database save error: {e}")
            db.rollback()
            return 0
        finally:
            db.close()
    
    DATABASE_ENABLED = True

else:
    # No database configured - create dummy function
    def save_to_database(opportunities_list):
        print("⚠️  DATABASE_URL not set, skipping database save")
        return 0
    
    DATABASE_ENABLED = False

# Export
__all__ = ['save_to_database', 'DATABASE_ENABLED']

