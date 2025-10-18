#!/usr/bin/env python3
"""Add test opportunities to database"""

import os
from sqlalchemy import text
from database_setup import SessionLocal

# Sample opportunities
test_opportunities = [
    {
        "title": "Fulbright Scholarship 2025",
        "organization": "U.S. Department of State",
        "type": "scholarship",
        "description": "Fully funded graduate study in the United States",
        "url": "https://foreign.fulbrightonline.org/",
        "location": "United States",
        "deadline": "2025-10-15",
        "tags": "graduate,fully-funded,usa"
    },
    {
        "title": "Chevening Scholarships",
        "organization": "UK Government",
        "type": "scholarship",
        "description": "UK government scholarships for master's degrees",
        "url": "https://www.chevening.org/",
        "location": "United Kingdom",
        "deadline": "2025-11-02",
        "tags": "masters,fully-funded,uk"
    },
    {
        "title": "Y Combinator",
        "organization": "Y Combinator",
        "type": "accelerator",
        "description": "Startup accelerator program",
        "url": "https://www.ycombinator.com/",
        "location": "Remote",
        "deadline": None,
        "tags": "startup,accelerator,investment"
    }
]

db = SessionLocal()

try:
    for opp in test_opportunities:
        # Check if exists
        result = db.execute(
            text("SELECT id FROM opportunities WHERE url = :url"),
            {"url": opp["url"]}
        )
        if result.fetchone():
            print(f"⏭️  Skipping (already exists): {opp['title']}")
            continue
        
        # Insert
        db.execute(
            text("""
                INSERT INTO opportunities 
                (title, organization, type, description, url, location, deadline, tags, is_verified)
                VALUES (:title, :org, :type, :desc, :url, :loc, :deadline, :tags, false)
            """),
            {
                "title": opp["title"],
                "org": opp["organization"],
                "type": opp["type"],
                "desc": opp["description"],
                "url": opp["url"],
                "loc": opp["location"],
                "deadline": opp["deadline"],
                "tags": opp["tags"]
            }
        )
        print(f"✅ Added: {opp['title']}")
    
    db.commit()
    print(f"\n🎉 Test data added successfully!")
    
    # Count total
    result = db.execute(text("SELECT COUNT(*) FROM opportunities"))
    count = result.scalar()
    print(f"📊 Total opportunities in database: {count}")
    
except Exception as e:
    print(f"❌ Error: {e}")
    db.rollback()
finally:
    db.close()

