#!/usr/bin/env python3
"""Add comprehensive real opportunities to database"""

import os
from sqlalchemy import text
from database_setup import SessionLocal
from datetime import date

# Comprehensive list of real opportunities
opportunities = [
    # SCHOLARSHIPS - USA
    {
        "title": "Fulbright Foreign Student Program 2025",
        "organization": "U.S. Department of State",
        "type": "scholarship",
        "description": "Fully funded graduate study in the United States for international students. Covers tuition, living expenses, airfare, and health insurance.",
        "url": "https://foreign.fulbrightonline.org/",
        "location": "United States",
        "deadline": "2025-10-15",
        "tags": "graduate,fully-funded,usa,international"
    },
    {
        "title": "Hubert H. Humphrey Fellowship Program",
        "organization": "U.S. Department of State",
        "type": "fellowship",
        "description": "One-year non-degree program for experienced professionals from developing countries",
        "url": "https://www.humphreyfellowship.org/",
        "location": "United States",
        "deadline": "2025-09-30",
        "tags": "fellowship,leadership,usa,developing-countries"
    },
    
    # SCHOLARSHIPS - UK
    {
        "title": "Chevening Scholarships 2025",
        "organization": "UK Foreign, Commonwealth & Development Office",
        "type": "scholarship",
        "description": "UK government's global scholarship program for one-year master's degrees in the UK",
        "url": "https://www.chevening.org/scholarships/",
        "location": "United Kingdom",
        "deadline": "2025-11-02",
        "tags": "masters,fully-funded,uk,leadership"
    },
    {
        "title": "Rhodes Scholarship",
        "organization": "Rhodes Trust",
        "type": "scholarship",
        "description": "Fully funded postgraduate study at the University of Oxford",
        "url": "https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/",
        "location": "Oxford, United Kingdom",
        "deadline": "2025-10-01",
        "tags": "oxford,fully-funded,postgraduate,prestigious"
    },
    {
        "title": "Gates Cambridge Scholarships",
        "organization": "Gates Cambridge Trust",
        "type": "scholarship",
        "description": "Full-cost scholarships for outstanding applicants to pursue postgraduate study at Cambridge",
        "url": "https://www.gatescambridge.org/",
        "location": "Cambridge, United Kingdom",
        "deadline": "2025-12-02",
        "tags": "cambridge,fully-funded,postgraduate,phd"
    },
    {
        "title": "Commonwealth Scholarships",
        "organization": "UK Government",
        "type": "scholarship",
        "description": "Scholarships for students from Commonwealth countries to study in the UK",
        "url": "https://cscuk.fcdo.gov.uk/scholarships/",
        "location": "United Kingdom",
        "deadline": "2025-10-14",
        "tags": "masters,phd,commonwealth,uk"
    },
    
    # SCHOLARSHIPS - Germany
    {
        "title": "DAAD Scholarships",
        "organization": "German Academic Exchange Service",
        "type": "scholarship",
        "description": "Master's and PhD scholarships in Germany for international students",
        "url": "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
        "location": "Germany",
        "deadline": "2025-11-30",
        "tags": "masters,phd,germany,research"
    },
    {
        "title": "Deutschlandstipendium",
        "organization": "German Federal Government",
        "type": "scholarship",
        "description": "Merit-based scholarship for high-achieving students in Germany",
        "url": "https://www.deutschlandstipendium.de/",
        "location": "Germany",
        "deadline": "2025-09-30",
        "tags": "germany,merit-based,undergraduate,masters"
    },
    
    # SCHOLARSHIPS - Australia & New Zealand
    {
        "title": "Australia Awards Scholarships",
        "organization": "Australian Government",
        "type": "scholarship",
        "description": "Scholarships for students from developing countries to study in Australia",
        "url": "https://www.dfat.gov.au/people-to-people/australia-awards",
        "location": "Australia",
        "deadline": "2025-04-30",
        "tags": "australia,developing-countries,fully-funded,masters"
    },
    {
        "title": "New Zealand Scholarships",
        "organization": "New Zealand Government",
        "type": "scholarship",
        "description": "Scholarships for international students to study in New Zealand",
        "url": "https://www.studyinnewzealand.govt.nz/how-to-apply/scholarship",
        "location": "New Zealand",
        "deadline": "2025-07-15",
        "tags": "new-zealand,international,undergraduate,masters"
    },
    
    # SCHOLARSHIPS - Canada
    {
        "title": "Vanier Canada Graduate Scholarships",
        "organization": "Government of Canada",
        "type": "scholarship",
        "description": "Doctoral scholarships worth $50,000 per year for three years",
        "url": "https://vanier.gc.ca/en/home-accueil.html",
        "location": "Canada",
        "deadline": "2025-11-01",
        "tags": "canada,phd,research,fully-funded"
    },
    {
        "title": "Lester B. Pearson International Scholarship",
        "organization": "University of Toronto",
        "type": "scholarship",
        "description": "Full scholarships for exceptional international undergraduate students",
        "url": "https://future.utoronto.ca/pearson/",
        "location": "Toronto, Canada",
        "deadline": "2025-11-07",
        "tags": "canada,undergraduate,fully-funded,international"
    },
    
    # SCHOLARSHIPS - Europe (Multiple)
    {
        "title": "Erasmus Mundus Joint Masters",
        "organization": "European Commission",
        "type": "scholarship",
        "description": "Fully funded master's programs across multiple European universities",
        "url": "https://ec.europa.eu/programmes/erasmus-plus/opportunities/erasmus-mundus-joint-master-degrees_en",
        "location": "Europe (Multiple)",
        "deadline": "2026-01-15",
        "tags": "europe,masters,fully-funded,erasmus"
    },
    {
        "title": "Swiss Government Excellence Scholarships",
        "organization": "Swiss Government",
        "type": "scholarship",
        "description": "Research scholarships for international PhD students and postdoctoral researchers",
        "url": "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html",
        "location": "Switzerland",
        "deadline": "2025-12-01",
        "tags": "switzerland,phd,postdoc,research"
    },
    
    # SCHOLARSHIPS - Asia
    {
        "title": "MEXT Scholarship Japan",
        "organization": "Japanese Government",
        "type": "scholarship",
        "description": "Full scholarships for international students to study in Japan",
        "url": "https://www.studyinjapan.go.jp/en/planning/scholarship/",
        "location": "Japan",
        "deadline": "2025-05-30",
        "tags": "japan,undergraduate,masters,phd,fully-funded"
    },
    {
        "title": "Korean Government Scholarship Program",
        "organization": "Korean Government",
        "type": "scholarship",
        "description": "Scholarships for international students to study in South Korea",
        "url": "https://www.studyinkorea.go.kr/en/sub/gks/allnew_invite.do",
        "location": "South Korea",
        "deadline": "2025-03-31",
        "tags": "korea,undergraduate,masters,phd"
    },
    
    # ACCELERATORS & STARTUP PROGRAMS
    {
        "title": "Y Combinator",
        "organization": "Y Combinator",
        "type": "accelerator",
        "description": "Startup accelerator providing $500k investment and 3-month program",
        "url": "https://www.ycombinator.com/",
        "location": "San Francisco, USA / Remote",
        "deadline": None,
        "tags": "startup,accelerator,seed-funding,silicon-valley"
    },
    {
        "title": "Techstars",
        "organization": "Techstars",
        "type": "accelerator",
        "description": "3-month mentorship-driven accelerator program with $120k investment",
        "url": "https://www.techstars.com/",
        "location": "Global (Multiple Cities)",
        "deadline": None,
        "tags": "startup,accelerator,mentorship,investment"
    },
    {
        "title": "500 Global",
        "organization": "500 Global",
        "type": "accelerator",
        "description": "Early-stage venture fund and accelerator with $150k investment",
        "url": "https://500.co/",
        "location": "Global",
        "deadline": None,
        "tags": "startup,accelerator,seed-funding,global"
    },
    {
        "title": "Entrepreneur First",
        "organization": "Entrepreneur First",
        "type": "accelerator",
        "description": "Pre-seed accelerator helping individuals find co-founders and build companies",
        "url": "https://www.joinef.com/",
        "location": "Global (London, Singapore, etc)",
        "deadline": None,
        "tags": "startup,pre-seed,co-founder-matching,deep-tech"
    },
    {
        "title": "Antler",
        "organization": "Antler",
        "type": "accelerator",
        "description": "Day-zero investor enabling anyone to start and scale a company",
        "url": "https://www.antler.co/",
        "location": "Global",
        "deadline": None,
        "tags": "startup,early-stage,global,investment"
    },
    
    # GRANTS & FELLOWSHIPS
    {
        "title": "National Science Foundation Graduate Research Fellowship",
        "organization": "NSF",
        "type": "fellowship",
        "description": "$37,000 annual stipend for graduate students in STEM fields",
        "url": "https://www.nsfgrfp.org/",
        "location": "United States",
        "deadline": "2025-10-15",
        "tags": "usa,stem,phd,research,grant"
    },
    {
        "title": "NIH Graduate Partnerships Program",
        "organization": "National Institutes of Health",
        "type": "fellowship",
        "description": "PhD training in biomedical sciences at NIH",
        "url": "https://www.training.nih.gov/programs/gpp",
        "location": "Bethesda, USA",
        "deadline": "2026-01-01",
        "tags": "biomedical,phd,research,usa"
    },
    {
        "title": "European Research Council Grants",
        "organization": "European Commission",
        "type": "grant",
        "description": "Research grants for excellent scientists in Europe",
        "url": "https://erc.europa.eu/",
        "location": "Europe",
        "deadline": "2025-10-24",
        "tags": "europe,research,grant,postdoc,professor"
    },
    
    # UNDERGRADUATE SCHOLARSHIPS
    {
        "title": "Schwarzman Scholars",
        "organization": "Schwarzman Foundation",
        "type": "scholarship",
        "description": "One-year master's program at Tsinghua University in China",
        "url": "https://www.schwarzmanscholars.org/",
        "location": "Beijing, China",
        "deadline": "2025-09-21",
        "tags": "china,masters,leadership,fully-funded"
    },
    {
        "title": "Knight-Hennessy Scholars",
        "organization": "Stanford University",
        "type": "scholarship",
        "description": "Full funding for graduate study at Stanford University",
        "url": "https://knight-hennessy.stanford.edu/",
        "location": "Stanford, USA",
        "deadline": "2025-10-09",
        "tags": "stanford,graduate,fully-funded,leadership"
    },
    {
        "title": "Clarendon Scholarships Oxford",
        "organization": "University of Oxford",
        "type": "scholarship",
        "description": "Graduate scholarships covering tuition and living costs at Oxford",
        "url": "https://www.ox.ac.uk/clarendon",
        "location": "Oxford, United Kingdom",
        "deadline": "2026-01-08",
        "tags": "oxford,graduate,fully-funded"
    },
    
    # SPECIALIZED FIELDS
    {
        "title": "Paul & Daisy Soros Fellowships",
        "organization": "Paul & Daisy Soros",
        "type": "fellowship",
        "description": "Fellowships for new Americans pursuing graduate school",
        "url": "https://www.pdsoros.org/",
        "location": "United States",
        "deadline": "2025-11-01",
        "tags": "usa,immigrants,graduate,fellowship"
    },
    {
        "title": "Watson Fellowship",
        "organization": "Thomas J. Watson Foundation",
        "type": "fellowship",
        "description": "$36,000 for one year of independent study and travel abroad",
        "url": "https://watson.foundation/fellowships/tj",
        "location": "International Travel",
        "deadline": "2025-11-02",
        "tags": "gap-year,travel,research,undergraduate"
    },
    {
        "title": "Marshall Scholarship",
        "organization": "Marshall Aid Commemoration Commission",
        "type": "scholarship",
        "description": "Finance for up to 3 years of postgraduate study in the UK",
        "url": "https://www.marshallscholarship.org/",
        "location": "United Kingdom",
        "deadline": "2025-09-30",
        "tags": "uk,graduate,usa-citizens,fully-funded"
    },
]

def add_opportunities():
    db = SessionLocal()
    added = 0
    skipped = 0
    
    try:
        for opp in opportunities:
            # Check if exists
            result = db.execute(
                text("SELECT id FROM opportunities WHERE url = :url"),
                {"url": opp["url"]}
            )
            if result.fetchone():
                print(f"⏭️  Skipping (exists): {opp['title'][:50]}")
                skipped += 1
                continue
            
            # Insert
            db.execute(
                text("""
                    INSERT INTO opportunities 
                    (title, organization, type, description, url, location, deadline, tags, is_verified)
                    VALUES (:title, :org, :type, :desc, :url, :loc, :deadline, :tags, true)
                """),
                {
                    "title": opp["title"],
                    "org": opp["organization"],
                    "type": opp["type"],
                    "desc": opp["description"],
                    "url": opp["url"],
                    "loc": opp["location"],
                    "deadline": opp.get("deadline"),
                    "tags": opp["tags"]
                }
            )
            print(f"✅ Added: {opp['title']}")
            added += 1
        
        db.commit()
        print(f"\n🎉 Database populated successfully!")
        print(f"✅ Added: {added} opportunities")
        print(f"⏭️  Skipped: {skipped} (already existed)")
        
        # Count total
        result = db.execute(text("SELECT COUNT(*) FROM opportunities"))
        count = result.scalar()
        print(f"📊 Total opportunities in database: {count}")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    add_opportunities()

