# 🚀 Create Database Tables via Railway API

Since you have the internal Railway DATABASE_URL, the easiest way is to create tables directly on Railway.

## Method 1: Using the API Endpoint

Your `main_with_db.py` already has an endpoint to create tables. Just call it:

```bash
curl -X POST "https://YOUR-RAILWAY-APP-URL.up.railway.app/api/admin/create-tables"
```

Replace `YOUR-RAILWAY-APP-URL` with your actual Railway deployment URL.

## Method 2: Use Railway CLI

```bash
# Install Railway CLI (if not installed)
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run the script on Railway
railway run python create_db_tables.py
```

This will run the script directly on Railway's servers where the internal URL works!

## Method 3: Deploy and Let It Auto-Create

Your `main_with_db.py` has a startup event that automatically creates tables:

```python
@app.on_event("startup")
def startup_event():
    init_db()  # This creates tables automatically
```

So when you deploy, tables should be created automatically!

## Verify Tables Were Created

After using any method above, verify with:

```bash
curl "https://YOUR-RAILWAY-APP-URL.up.railway.app/api/admin/opportunities"
```

If it returns `[]` (empty array), tables exist but are empty.
If it returns an error, tables weren't created.

---

**Note:** The internal URL (`postgres.railway.internal`) only works inside Railway's network, not from your local machine.

