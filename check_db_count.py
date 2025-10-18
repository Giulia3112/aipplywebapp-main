#!/usr/bin/env python3
"""Check how many opportunities are in the database"""

import os
from sqlalchemy import create_engine, text

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    print("ERROR: DATABASE_URL not set")
    exit(1)

engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    result = conn.execute(text('SELECT COUNT(*) FROM opportunities'))
    count = result.scalar()
    print(f"✅ Opportunities in database: {count}")
    
    if count == 0:
        print("\n⚠️  Database is EMPTY!")
        print("Your deployed API is NOT connected to this database.")
        print("\nTo fix:")
        print("1. Make sure DATABASE_URL in Railway matches:")
        print(f"   {DATABASE_URL[:60]}...")
        print("2. Deploy main_with_db.py to Railway")
        print("3. Call /api/admin/refresh to populate data")

