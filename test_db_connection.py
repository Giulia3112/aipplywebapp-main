#!/usr/bin/env python3
"""
Test database connection and create tables
Run this to debug database issues
"""

import os
import sys

def test_connection():
    print("🔍 Testing database connection...\n")
    
    # Check DATABASE_URL
    db_url = os.environ.get("DATABASE_URL")
    if not db_url:
        print("❌ DATABASE_URL environment variable not set!")
        print("   Set it in Railway environment variables")
        return False
    
    print(f"✅ DATABASE_URL found: {db_url[:30]}...")
    
    # Fix Railway URL format
    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)
        print("✅ Fixed URL format for psycopg2")
    
    # Try to import required packages
    try:
        import sqlalchemy
        import psycopg2
        print("✅ Required packages installed")
    except ImportError as e:
        print(f"❌ Missing package: {e}")
        print("   Run: pip install sqlalchemy psycopg2-binary")
        return False
    
    # Try to connect
    try:
        from sqlalchemy import create_engine, inspect
        engine = create_engine(db_url)
        
        # Test connection
        with engine.connect() as conn:
            print("✅ Database connection successful!")
        
        # Check existing tables
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        
        if tables:
            print(f"\n📋 Existing tables: {tables}")
        else:
            print("\n⚠️  No tables found (this is OK for first run)")
        
        return True
        
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return False

def create_tables():
    print("\n🔨 Creating tables...\n")
    
    try:
        from database_setup import init_db, engine
        from sqlalchemy import inspect
        
        # Create tables
        init_db()
        print("✅ Tables created successfully!")
        
        # List tables
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        print(f"📋 Tables in database: {tables}")
        
        # Show columns for opportunities table
        if 'opportunities' in tables:
            columns = inspector.get_columns('opportunities')
            print("\n📊 Columns in 'opportunities' table:")
            for col in columns:
                print(f"   - {col['name']}: {col['type']}")
        
        return True
        
    except Exception as e:
        print(f"❌ Failed to create tables: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    print("=" * 50)
    print("  DATABASE CONNECTION TEST")
    print("=" * 50 + "\n")
    
    if test_connection():
        print("\n" + "=" * 50)
        if create_tables():
            print("\n✅ ALL TESTS PASSED!")
        else:
            print("\n❌ TABLE CREATION FAILED")
            sys.exit(1)
    else:
        print("\n❌ CONNECTION TEST FAILED")
        sys.exit(1)
    
    print("=" * 50)

