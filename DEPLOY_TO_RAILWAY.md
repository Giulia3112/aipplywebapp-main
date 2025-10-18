# 🚀 Deploy Database-Connected API to Railway

## Current Problem
- Database is empty (0 records)
- API returns 57 opportunities from a different source
- Deployed code is NOT using `main_with_db.py`

## Solution: Deploy the Correct Version

### **Files You Need in Railway Repository:**

```
your-railway-repo/
├── main.py                    ← Rename main_with_db.py to this
├── database_setup.py
├── requirements.txt           ← Must include database packages
├── services/
│   ├── __init__.py
│   ├── db_service.py
│   └── run_scraper.py
└── Procfile                   ← Optional: tells Railway how to start
```

### **Step 1: Prepare Files**

1. **Rename** `main_with_db.py` → `main.py`
   ```bash
   cp main_with_db.py main.py
   ```

2. **Create/Update requirements.txt**:
   ```txt
   fastapi==0.104.1
   uvicorn[standard]==0.24.0
   sqlalchemy==2.0.23
   psycopg2-binary==2.9.9
   python-dateutil==2.8.2
   ```

3. **Create Procfile** (optional but recommended):
   ```
   web: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

### **Step 2: Deploy to Railway**

**Option A: Via GitHub (Recommended)**

1. Find your Railway backend repository
2. Copy these files to it:
   - `database_setup.py`
   - `services/` folder
   - `main.py` (renamed from main_with_db.py)
   - Update `requirements.txt`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Add PostgreSQL database integration"
   git push
   ```
4. Railway will auto-deploy

**Option B: Via Railway CLI**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Deploy
railway up
```

### **Step 3: Verify DATABASE_URL in Railway**

1. Go to Railway Dashboard → Your Project
2. Click on **PostgreSQL** service → **Variables** tab
3. Copy the `DATABASE_URL`
4. Go to your **API** service → **Variables** tab
5. Make sure `DATABASE_URL` is set (Railway should auto-link it)

The URL should be:
```
postgresql://postgres:orZPWEpyYlOWjqALGlOdFvUotncUhidr@postgres.railway.internal:5432/railway
```
(Use internal URL for Railway deployments)

### **Step 4: Verify Deployment**

After deployment, test:

```bash
# Should return FastAPI health check (not HTML)
curl https://aipply-ai-agent-main-production.up.railway.app/

# Expected response:
# {
#   "status": "healthy",
#   "service": "AIpply Opportunity Search API",
#   "version": "2.0 with Database"
# }
```

### **Step 5: Populate Database**

Once deployed, populate with data:

```bash
curl -X POST "https://aipply-ai-agent-main-production.up.railway.app/api/admin/refresh"
```

## 🎯 Success Checklist

- [ ] Database tables created (done ✅)
- [ ] `main_with_db.py` deployed to Railway as `main.py`
- [ ] DATABASE_URL configured in Railway
- [ ] API returns FastAPI JSON response (not HTML)
- [ ] Database populated with opportunities

## 🔍 Troubleshooting

### "Still getting HTML"
- Check Railway logs: Railway Dashboard → Deployments → View Logs
- Make sure `main.py` exists in root of repository
- Verify Procfile or start command is correct

### "Database connection error"
- Verify DATABASE_URL in Railway environment variables
- Make sure PostgreSQL service is running
- Check Railway logs for connection errors

### "API works but database still empty"
- Call `/api/admin/refresh` to populate
- Or wait for first search (auto-populates)
- Check if scraper is working in logs

---

**Need Help?** 
- Check Railway logs for errors
- Verify all files are in the repository
- Make sure DATABASE_URL matches between local and Railway

