#!/usr/bin/env python3
"""
Simple standalone script to create database tables
Run this with: python create_db_tables.py
Make sure DATABASE_URL environment variable is set first
"""

from sqlalchemy import create_engine, inspect
import os
import sys

# Get DATABASE_URL from environment
DATABASE_URL = os.environ.get("DATABASE_URL")

if not DATABASE_URL:
    print("❌ ERROR: DATABASE_URL environment variable is not set!")
    print("\nPlease set it first:")
    print("  export DATABASE_URL='postgresql://user:password@host:port/database'")
    sys.exit(1)

# Fix for Railway PostgreSQL URL (psycopg2 compatibility)
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    print("🔧 Fixed PostgreSQL URL format")

print(f"📍 Connecting to database: {DATABASE_URL[:50]}...")

# Create engine
engine = create_engine(DATABASE_URL)

# Import Base from database_setup (this contains all your models)
try:
    from database_setup import Base
    print("✅ Imported database models")
except ImportError as e:
    print(f"❌ ERROR: Could not import database_setup: {e}")
    print("Make sure database_setup.py is in the same directory")
    sys.exit(1)

# Create all tables
try:
    print("\n🔧 Creating database tables...")
    Base.metadata.create_all(engine)
    print("✅ Tables created successfully!")
    
    # Verify tables were created
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    
    if tables:
        print(f"\n📋 Created tables ({len(tables)}):")
        for table in tables:
            print(f"  - {table}")
    else:
        print("⚠️  Warning: No tables found after creation")
    
except Exception as e:
    print(f"\n❌ ERROR creating tables: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

print("\n🎉 Database setup complete!")

