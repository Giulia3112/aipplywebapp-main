# 🔗 Scraper + Database Integration Guide

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│  User searches on Frontend                  │
│  https://aipply-app.web.app                │
└──────────────────┬──────────────────────────┘
                   │
                   ↓
    ┌──────────────────────────────────────┐
    │  Database API (Fast Filtered Search)  │
    │  Railway Service #2                   │
    │  - PostgreSQL queries                 │
    │  - Returns stored opportunities       │
    └──────────────────────────────────────┘
                   ↑
                   │ Saves scraped data
                   │
    ┌──────────────────────────────────────┐
    │  Scraper API (Live Web Scraping)      │
    │  Railway Service #1                   │
    │  - Scrapes 30+ sources               │
    │  - AI Chat interface                 │
    │  - AUTO-SAVES to database            │
    └──────────────────────────────────────┘
```

---

## Step-by-Step Setup

### **Step 1: Reconnect Original Scraper**

1. Railway Dashboard → **AIpply-AI-Agent-Main** service
2. Settings → Service Source
3. Disconnect current source
4. Connect to: `Giulia3112/AIpply-AI-Agent-Main`
5. Railway will redeploy automatically

### **Step 2: Add Database Connection to Scraper**

In the `AIpply-AI-Agent-Main` repository, add these files:

#### File: `database_config.py`
```python
"""
Database configuration for saving scraped opportunities
"""
import os
from sqlalchemy import create_engine, Column, Integer, String, Text, Date, DateTime, Boolean, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Get DATABASE_URL from environment
DATABASE_URL = os.environ.get("DATABASE_URL")

# Only create engine if DATABASE_URL is set
if DATABASE_URL:
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
        """Save scraped opportunities to database"""
        if not DATABASE_URL:
            return 0
        
        db = SessionLocal()
        saved_count = 0
        
        try:
            for opp in opportunities_list:
                # Check if exists
                existing = db.query(Opportunity).filter(
                    Opportunity.url == opp.get('url')
                ).first()
                
                if not existing:
                    db_opp = Opportunity(
                        title=opp.get('title'),
                        organization=opp.get('organization'),
                        type=opp.get('type'),
                        deadline=opp.get('deadline'),
                        location=opp.get('location'),
                        description=opp.get('description'),
                        url=opp.get('url'),
                        tags=opp.get('tags', ''),
                        is_verified=True  # Scraped data is verified
                    )
                    db.add(db_opp)
                    saved_count += 1
            
            db.commit()
            print(f"✅ Saved {saved_count} new opportunities to database")
            return saved_count
        except Exception as e:
            print(f"❌ Database save error: {e}")
            db.rollback()
            return 0
        finally:
            db.close()
else:
    # No database configured
    def save_to_database(opportunities_list):
        print("⚠️ DATABASE_URL not set, skipping database save")
        return 0
```

#### File: Modify existing scraper to call `save_to_database()`

In your main scraper file (likely `main.py` or `main_enhanced.py`), add:

```python
# At the top
from database_config import save_to_database

# In your search/scrape endpoint, after scraping:
@app.get("/api/search")
async def search_opportunities(keyword: str = None, region: str = None, type: str = None):
    # Your existing scraping code...
    opportunities = scrape_opportunities(keyword, region, type)
    
    # NEW: Auto-save to database
    save_to_database(opportunities)
    
    # Return results
    return opportunities
```

### **Step 3: Configure Railway Environment**

#### For Scraper API (Service #1):
- Add `DATABASE_URL` reference from PostgreSQL
- Keep existing environment variables (`OPENAI_API_KEY`, etc.)

#### For Database API (Service #2):
- Already configured ✅
- Has `DATABASE_URL` connected
- Provides filtered search

### **Step 4: Update Frontend**

Your React app can now use **either** API:

```javascript
// For live scraping (slower, fresh data)
const liveResults = await fetch(
  'https://aipply-ai-agent-main-production.up.railway.app/api/search?keyword=scholarship'
);

// For fast database search (faster, cached data)
const cachedResults = await fetch(
  'https://aipply-database-api.up.railway.app/search?keyword=scholarship'
);

// Or use database API as primary, fall back to scraper
async function searchOpportunities(keyword) {
  try {
    // Try database first (fast)
    const response = await fetch(
      `https://aipply-database-api.up.railway.app/search?keyword=${keyword}`
    );
    const data = await response.json();
    
    if (data.length > 0) {
      return data; // Return cached results
    }
  } catch (error) {
    console.log('Database API failed, trying scraper...');
  }
  
  // Fallback to live scraper
  const response = await fetch(
    `https://aipply-ai-agent-main-production.up.railway.app/api/search?keyword=${keyword}`
  );
  return await response.json();
}
```

---

## Benefits of This Architecture

✅ **Always Growing Database**
- Every scrape adds new opportunities automatically
- Database grows over time with fresh data
- No manual data entry needed

✅ **Fast Searches**
- Database API returns results instantly
- No waiting for web scraping
- Better user experience

✅ **Fresh Data**
- Scraper API still provides live data when needed
- New opportunities discovered and saved automatically
- Database stays up-to-date

✅ **Redundancy**
- If database is slow, use scraper
- If scraper fails, use database
- Best of both worlds

---

## Maintenance

### Periodic Database Cleanup
Run occasionally to remove old opportunities:

```sql
DELETE FROM opportunities 
WHERE deadline < CURRENT_DATE - INTERVAL '30 days';
```

### Monitor Database Growth
```sql
SELECT COUNT(*), type 
FROM opportunities 
GROUP BY type;
```

---

## Next Steps

1. ✅ Reconnect Railway to original scraper repo
2. ✅ Add `database_config.py` to scraper repo
3. ✅ Modify scraper to call `save_to_database()`
4. ✅ Add `DATABASE_URL` to scraper service in Railway
5. ✅ Test: Scrape → Check database → Verify auto-save works
6. ✅ Update frontend to use database API as primary

---

**Result:** A self-populating database that grows automatically! 🚀

