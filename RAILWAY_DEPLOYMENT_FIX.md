# 🚂 Railway Deployment Fix

## Problem Detected
Your Railway URL is only serving frontend HTML, not the API endpoints.

- ✅ Root URL works: `https://aipply-ai-agent-main-production.up.railway.app/`
- ❌ API endpoints don't work: `/api/health`, `/api/search`, etc.

## Solution: Deploy the Correct Service

### Option 1: Check Which Service is Deployed

1. Go to [Railway Dashboard](https://railway.app)
2. Open your AIpply project
3. Check which service is deployed:
   - Is it deploying the `frontend` folder? ❌ Wrong
   - Is it deploying the `startup_opps_api` folder? ✅ Correct
   - Is it deploying the root `main.py`? ✅ Correct

### Option 2: Set the Correct Start Command

In Railway:

1. Go to your service **Settings**
2. Find **Start Command** or **Build & Deploy** section
3. Set the start command to:
   ```bash
   python main.py
   ```
   OR
   ```bash
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

### Option 3: Check Your Railway Configuration

Make sure your Railway deployment has:

#### Root Directory:
Should point to the folder containing `main.py` or `main_enhanced.py`

#### Start Command:
```bash
python main.py
```
OR
```bash
python main_enhanced.py
```

#### Environment Variables:
```env
OPENAI_API_KEY=your_openai_key
DATABASE_URL=postgresql://... (or sqlite:///./aipply.db)
PORT=8000
```

### Option 4: Check Procfile or railway.json

If you have a `Procfile`, it should contain:
```
web: python main.py
```

If you have `railway.json`, it should have:
```json
{
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "python main.py"
  }
}
```

## Testing After Fix

Once you've fixed the deployment, test these URLs in your browser:

1. **Health Check:**
   ```
   https://aipply-ai-agent-main-production.up.railway.app/api/health
   ```
   Should return: `{"status": "healthy"}`

2. **API Root:**
   ```
   https://aipply-ai-agent-main-production.up.railway.app/api
   ```
   Should return: Welcome message

3. **Search Test:**
   ```
   https://aipply-ai-agent-main-production.up.railway.app/api/search?keyword=scholarship
   ```
   Should return: JSON with opportunities

## Alternative: Deploy a Separate Backend Service

If you want both frontend and backend:

### Create Two Services in Railway:

1. **Frontend Service:**
   - Deploy the `frontend` or `landing-page` folder
   - Serves static files

2. **Backend Service:**
   - Deploy the root folder (with `main.py`)
   - Runs the FastAPI server
   - This is what your landing page should connect to

Then use the **Backend Service URL** in your `.env.local`:
```env
VITE_RAILWAY_API_URL=https://backend-service-url.up.railway.app
```

## Quick Fix Steps:

1. **Go to Railway Dashboard**
2. **Check deployment logs** - Look for errors
3. **Verify start command** is running `main.py`
4. **Check environment variables** are set
5. **Redeploy** if needed
6. **Test** the `/api/health` endpoint

## Need Help?

Check Railway logs for errors:
```
Railway Dashboard → Your Service → Deployments → View Logs
```

Common issues:
- Missing dependencies in `requirements.txt`
- Wrong Python version
- Missing environment variables
- Start command pointing to wrong file

---

Once the API is properly deployed, your landing page will work perfectly! 🚀

