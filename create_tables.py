#!/usr/bin/env python3
"""
Simple script to create database tables
Run this after setting DATABASE_URL environment variable
"""

import os
from database_setup import init_db, engine, Base

def main():
    print("🔧 Creating database tables...")
    print(f"📍 Database URL: {os.environ.get('DATABASE_URL', 'Not set!')[:50]}...")
    
    try:
        # Create all tables
        init_db()
        print("✅ Tables created successfully!")
        
        # List tables
        from sqlalchemy import inspect
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        print(f"\n📋 Created tables: {tables}")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    
    return True

if __name__ == "__main__":
    if not os.environ.get('DATABASE_URL'):
        print("⚠️  DATABASE_URL not set!")
        print("Set it first: export DATABASE_URL='your-postgres-url'")
    else:
        main()

