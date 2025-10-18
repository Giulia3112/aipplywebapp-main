# Database service for storing and retrieving opportunities

from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from database_setup import Opportunity, get_db
from typing import List, Optional
from datetime import datetime, timedelta, date

def store_opportunities(opportunities: List[dict], db: Session) -> int:
    """
    Store scraped opportunities in database
    Returns: number of new opportunities added
    """
    new_count = 0
    
    for opp_data in opportunities:
        # Check if opportunity already exists (by URL - unique constraint)
        url = opp_data.get('url')
        if not url:
            continue  # Skip if no URL
            
        existing = db.query(Opportunity).filter(
            Opportunity.url == url
        ).first()
        
        if not existing:
            # Parse deadline if it's a string
            deadline_value = opp_data.get('deadline')
            if deadline_value and isinstance(deadline_value, str):
                try:
                    # Try to parse common date formats
                    from dateutil import parser
                    deadline_value = parser.parse(deadline_value).date()
                except:
                    deadline_value = None  # If parsing fails, set to None
            
            # Create new opportunity
            db_opp = Opportunity(
                title=opp_data.get('title'),
                description=opp_data.get('description'),
                type=opp_data.get('type'),
                organization=opp_data.get('organization'),
                location=opp_data.get('location'),
                deadline=deadline_value,
                url=url,
                tags=opp_data.get('tags', ''),
                is_verified=False
            )
            db.add(db_opp)
            new_count += 1
        else:
            # Update existing opportunity
            existing.title = opp_data.get('title', existing.title)
            existing.description = opp_data.get('description', existing.description)
            existing.type = opp_data.get('type', existing.type)
            existing.organization = opp_data.get('organization', existing.organization)
            existing.location = opp_data.get('location', existing.location)
            existing.tags = opp_data.get('tags', existing.tags)
    
    db.commit()
    return new_count

def search_opportunities_db(
    keyword: Optional[str] = None,
    region: Optional[str] = None,
    type_filter: Optional[str] = None,
    db: Session = None,
    limit: int = 100
) -> List[Opportunity]:
    """
    Search opportunities from database with filters
    """
    query = db.query(Opportunity)
    
    # Keyword search (searches in multiple fields)
    if keyword:
        search_terms = keyword.lower().split()
        filters = []
        
        for term in search_terms:
            term_filter = or_(
                Opportunity.title.ilike(f'%{term}%'),
                Opportunity.description.ilike(f'%{term}%'),
                Opportunity.type.ilike(f'%{term}%'),
                Opportunity.organization.ilike(f'%{term}%'),
                Opportunity.location.ilike(f'%{term}%'),
                Opportunity.tags.ilike(f'%{term}%')
            )
            filters.append(term_filter)
        
        # Combine all term filters (AND logic - all terms must match)
        if filters:
            query = query.filter(and_(*filters))
    
    # Region filter (search in location field)
    if region:
        query = query.filter(Opportunity.location.ilike(f'%{region}%'))
    
    # Type filter
    if type_filter:
        query = query.filter(Opportunity.type.ilike(f'%{type_filter}%'))
    
    # Order by most recently created first
    query = query.order_by(Opportunity.created_at.desc())
    
    return query.limit(limit).all()

def get_all_opportunities(db: Session, limit: int = 1000) -> List[Opportunity]:
    """Get all opportunities"""
    return db.query(Opportunity).order_by(
        Opportunity.created_at.desc()
    ).limit(limit).all()

def needs_refresh(db: Session, max_age_hours: int = 6) -> bool:
    """
    Check if database needs refresh (data older than max_age_hours)
    """
    cutoff_time = datetime.utcnow() - timedelta(hours=max_age_hours)
    recent_count = db.query(Opportunity).filter(
        Opportunity.created_at > cutoff_time
    ).count()
    
    # If no recent data, needs refresh
    return recent_count == 0

def opportunity_to_dict(opp: Opportunity) -> dict:
    """Convert database model to dictionary"""
    return {
        'id': opp.id,
        'title': opp.title,
        'description': opp.description,
        'type': opp.type,
        'organization': opp.organization,
        'location': opp.location,
        'deadline': opp.deadline.isoformat() if opp.deadline else None,
        'url': opp.url,
        'tags': opp.tags,
        'is_verified': opp.is_verified,
        'created_at': opp.created_at.isoformat() if opp.created_at else None,
        'updated_at': opp.updated_at.isoformat() if opp.updated_at else None
    }

