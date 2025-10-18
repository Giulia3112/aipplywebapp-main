# Database setup for Railway API
# This file contains the database connection and schema setup

import os
from sqlalchemy import (
    create_engine, Column, Integer, String, Text, Date, DateTime, Boolean, func
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Get DATABASE_URL from environment
DATABASE_URL = os.environ.get("DATABASE_URL")

# Fix for Railway PostgreSQL URL (psycopg2 compatibility)
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Create engine
engine = create_engine(DATABASE_URL)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Database model for Opportunity (using your existing schema)
class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    organization = Column(String, index=True)
    type = Column(String, index=True)  # e.g. Fellowship, Grant, Scholarship
    deadline = Column(Date)
    location = Column(String, index=True)
    description = Column(Text)
    url = Column(String, unique=True, nullable=False)
    tags = Column(String)  # comma-separated tags
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

# Create all tables
def init_db():
    """Initialize database tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")

# Dependency to get database session
def get_db():
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

if __name__ == "__main__":
    # Run this to create tables
    init_db()

