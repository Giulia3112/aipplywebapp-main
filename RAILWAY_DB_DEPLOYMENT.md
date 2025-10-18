# 🚀 Railway Database Deployment - Step by Step

## ✅ Files Updated (Using Your Schema)

All files now use your existing `Opportunity` table schema:
- ✅ `database_setup.py` - Database connection + your Opportunity model
- ✅ `services/db_service.py` - Search, store, and filter logic
- ✅ `main_with_db.py` - FastAPI endpoints with database
- ✅ `requirements_db.txt` - All dependencies
- ✅ `create_tables.py` - Helper script to create tables

---

## 📋 Deployment Steps

### **Step 1: Add PostgreSQL to Railway**

1. Go to Railway dashboard: https://railway.app
2. Open your `AIpply-AI-Agent-Main` project
3. Click **"+ New"**
4. Select **"Database"** → **"PostgreSQL"**
5. Railway automatically creates `DATABASE_URL` environment variable
6. ✅ Done! PostgreSQL is ready

---

### **Step 2: Copy Files to Railway Repository**

Copy these files from **this folder** to your **Railway API repository**:

```
📁 Your Railway Repo Root:
  ├── database_setup.py          ← NEW (copy this)
  ├── create_tables.py            ← NEW (copy this)
  ├── main.py                     ← REPLACE with main_with_db.py
  ├── requirements.txt            ← UPDATE (merge requirements_db.txt)
  └── services/
      ├── db_service.py           ← NEW (copy this)
      └── run_scraper.py          (your existing file)
```

**Commands** (if using Git):
```bash
# Navigate to your Railway API folder
cd /path/to/AIpply-AI-Agent-Main

# Copy files
cp "path/to/database_setup.py" .
cp "path/to/create_tables.py" .
cp "path/to/main_with_db.py" main.py
cp "path/to/services/db_service.py" services/

# Update requirements.txt (add these lines):
cat requirements_db.txt >> requirements.txt

# Commit and push
git add .
git commit -m "Add PostgreSQL database integration"
git push
```

---

### **Step 3: Verify Railway Environment**

In Railway dashboard, check environment variables:
- ✅ `DATABASE_URL` - Auto-created by PostgreSQL service
- ✅ `PORT` - Set to `8000`
- ✅ `OPENAI_API_KEY` - Your existing API key
- ✅ Any other scraper-related variables

---

### **Step 4: Update requirements.txt**

Make sure your `requirements.txt` includes:
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
python-dateutil==2.8.2
requests==2.31.0
beautifulsoup4==4.12.2
lxml==4.9.3
```

Plus any other dependencies your scraper needs.

---

### **Step 5: Deploy to Railway**

Railway will automatically:
1. Detect changes
2. Rebuild your service
3. Create database tables on startup (via `init_db()`)
4. Start the API

**Monitor the logs:**
```
✅ Database initialized successfully!
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
```

---

### **Step 6: Initialize Database with Data**

Once deployed, populate the database:

**Option A: Manual Refresh (Recommended)**
```bash
curl -X POST "https://aipply-ai-agent-main-production.up.railway.app/api/admin/refresh"
```

This will:
- Run your scraper
- Store all opportunities in database
- Return count of new opportunities

**Option B: Wait for First Search**
The API will auto-populate on the first search request.

---

## 🧪 Testing

### **Test 1: Health Check**
```bash
curl https://aipply-ai-agent-main-production.up.railway.app/
```
Expected response:
```json
{
  "status": "healthy",
  "service": "AIpply Opportunity Search API",
  "version": "2.0 with Database"
}
```

### **Test 2: Search with Keyword** (This should FILTER now!)
```bash
curl "https://aipply-ai-agent-main-production.up.railway.app/search?keyword=machine+learning"
```
Expected: **Only** opportunities matching "machine learning"

### **Test 3: Get All Opportunities**
```bash
curl https://aipply-ai-agent-main-production.up.railway.app/api/admin/opportunities
```
Expected: All stored opportunities

---

## 🎯 How the New System Works

### **Search Flow:**
```
User searches "AI scholarship" 
    ↓
API checks database for recent data (<6 hours old)
    ↓
If data exists: Search database (INSTANT! ⚡)
    ↓
Filter by keyword: title, description, type, location, tags
    ↓
Return filtered results (not all 57!)
    ↓
If data is stale: Trigger background refresh
```

### **Key Features:**
- ✅ **Fast searches** - Database queries are instant
- ✅ **Smart filtering** - AND logic (all keywords must match)
- ✅ **Auto-refresh** - Updates every 6 hours automatically
- ✅ **No duplicates** - URL is unique constraint
- ✅ **Fallback** - If DB fails, falls back to direct scraping

---

## 🔧 Table Schema (Your Existing Model)

```python
opportunities
├── id (Integer, Primary Key)
├── title (String, Indexed)
├── organization (String, Indexed)
├── type (String, Indexed)          # scholarship, fellowship, grant
├── deadline (Date)
├── location (String, Indexed)
├── description (Text)
├── url (String, Unique)            # Prevents duplicates
├── tags (String)
├── is_verified (Boolean)
├── created_at (DateTime)
├── updated_at (DateTime)
```

---

## 🐛 Troubleshooting

### **Issue: "Module not found: database_setup"**
- Make sure `database_setup.py` is in the root directory
- Check Railway logs for import errors

### **Issue: "No opportunities returned"**
```bash
# Check if database has data
curl https://aipply-ai-agent-main-production.up.railway.app/api/admin/opportunities

# If empty, manually refresh
curl -X POST https://aipply-ai-agent-main-production.up.railway.app/api/admin/refresh
```

### **Issue: "Database connection error"**
- Verify `DATABASE_URL` exists in Railway environment
- Check PostgreSQL service is running
- Railway auto-fixes URL format (postgres:// → postgresql://)

### **Issue: "Still returning all results"**
- Check Railway logs for database query logs
- Verify `search_opportunities_db` is being called
- Test with browser console to see actual API response

---

## 🎊 Success Indicators

You'll know it's working when:
- ✅ `/search?keyword=AI` returns **only AI-related** opportunities
- ✅ Search is **instant** (no 5-10 second scraping delay)
- ✅ Same search twice is cached (super fast second time)
- ✅ Different keywords return **different** filtered results

---

## 📞 Next Steps After Deployment

1. **Test the search** on your frontend (localhost:5173/search-demo)
2. **Monitor Railway logs** for any errors
3. **Verify filtering** works (search "scholarship" vs "fellowship")
4. **Set up periodic refresh** (optional - already auto-refreshes every 6 hours)

---

Need help? Check Railway logs or test endpoints with `curl`! 🚀

