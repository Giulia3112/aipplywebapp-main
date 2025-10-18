# 🔗 Scraper Database Integration Files

These files enable **automatic database saving** for your web scraper.

---

## 📦 What's Included

1. **`database_config.py`** - Database connection and save function
2. **`integration_example.py`** - Example code showing how to integrate
3. **This README** - Step-by-step instructions

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Add File to Your Scraper Repo

1. Go to your local clone of `AIpply-AI-Agent-Main` repository
2. Copy `database_config.py` to the root directory
3. Commit and push:
   ```bash
   git add database_config.py
   git commit -m "Add database auto-save integration"
   git push
   ```

### Step 2: Modify Your main.py

Add these lines to your `main.py` or `main_enhanced.py`:

```python
# At the top with other imports
from database_config import save_to_database, DATABASE_ENABLED

# In your search endpoint, after scraping
opportunities = scrape_opportunities(keyword, region, type)

# Add this line to auto-save
if DATABASE_ENABLED:
    save_to_database(opportunities)

return opportunities
```

### Step 3: Configure Railway

1. Go to Railway Dashboard
2. Open **AIpply-AI-Agent-Main** service
3. Go to **Variables** tab
4. Add reference: `DATABASE_URL` from your PostgreSQL service
5. Railway will auto-redeploy

### Step 4: Test It!

```bash
# Trigger a scrape
curl "https://aipply-ai-agent-main-production.up.railway.app/api/search?keyword=scholarship"

# Check database
curl "https://your-database-api.up.railway.app/search?keyword=scholarship"

# Should see the same results!
```

---

## 🎯 How It Works

```
1. User searches → Scraper API receives request
2. Scraper fetches from 30+ websites
3. Results returned to user (fast!)
4. BACKGROUND: Results auto-saved to PostgreSQL
5. Next search: Database API has cached results (instant!)
```

### Key Features

✅ **Non-blocking** - Scraping stays fast, saving happens in background
✅ **Duplicate prevention** - Only saves new opportunities (checks URL)
✅ **Graceful fallback** - Works even if database is down
✅ **Auto-growing database** - Gets bigger with every scrape
✅ **No manual work** - Completely automatic

---

## 📊 Optional: Add Database Stats Endpoint

See `integration_example.py` for code to add:

- `/api/database/stats` - See how many opportunities stored
- `/api/admin/sync-database` - Manually trigger full sync

---

## 🔧 Requirements

Make sure your `requirements.txt` in scraper repo includes:

```txt
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
python-dateutil==2.8.2
```

---

## ✅ Verification Checklist

After setup:

- [ ] `database_config.py` added to scraper repo
- [ ] `main.py` modified to call `save_to_database()`
- [ ] Pushed to GitHub
- [ ] `DATABASE_URL` added in Railway variables
- [ ] Railway redeployed successfully
- [ ] Test scrape works
- [ ] Test database contains scraped data

---

## 🆘 Troubleshooting

### "DATABASE_URL not set" message
- Check Railway Variables tab
- Make sure PostgreSQL service reference is added
- Redeploy service

### "Database save failed"
- Check Railway logs for errors
- Verify PostgreSQL service is running
- Check DATABASE_URL format

### Data not appearing in database
- Verify URL uniqueness (might already exist)
- Check Railway logs for "Auto-saved X new opportunities"
- Try manual sync: `POST /api/admin/sync-database`

---

## 📈 Expected Results

After integration:

- **First scrape:** 50+ opportunities saved to database
- **Subsequent scrapes:** Only new opportunities saved
- **Database growth:** Steady increase over time
- **Search speed:** Database API becomes faster than scraper
- **Data freshness:** Always up-to-date from live scraping

---

**Ready to integrate? Start with Step 1!** 🚀

