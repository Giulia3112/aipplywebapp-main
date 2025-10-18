# 🚂 Setting Up Railway API Connection

## Step-by-Step Guide

### Step 1: Get Your Railway API URL

1. Log in to [Railway.app](https://railway.app)
2. Go to your AIpply API project
3. Click on your service/deployment
4. Copy the deployment URL (looks like: `https://your-app.up.railway.app` or `https://your-app-production.up.railway.app`)

### Step 2: Create Environment File

1. In your project root, copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder with your Railway URL:
   ```env
   VITE_RAILWAY_API_URL=https://your-actual-app.up.railway.app
   ```

### Step 3: Test the Connection

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Visit the demo page:
   ```
   http://localhost:5173/search-demo
   ```

3. Try searching for something like "computer science scholarships"

### Step 4: Expected Railway API Structure

Your Railway API should expose these endpoints:

#### POST /api/search
Search for opportunities
```json
Request:
{
  "query": "software engineering scholarships",
  "category": "scholarships",
  "location": "USA"
}

Response:
[
  {
    "title": "Google Scholarship Program",
    "description": "For CS students...",
    "url": "https://...",
    "type": "scholarship",
    "location": "USA",
    "deadline": "2024-03-15"
  }
]
```

#### GET /health
Check API status
```json
Response:
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 🔧 If Your API is Different

If your Railway API has different endpoints or data structures, edit `src/lib/railwayApiClient.js` to match your API's specifications.

## 🎯 Next Steps

After confirming the connection works:

1. ✅ Update the search functionality based on your actual API response format
2. ✅ Add authentication if your API requires it
3. ✅ Customize the `OpportunitySearch` component styling
4. ✅ Add the search component to your landing page

## 🐛 Troubleshooting

**Problem: CORS errors**
- Solution: Make sure your Railway API allows requests from your domain

**Problem: 404 errors**
- Solution: Check that the endpoint paths match your API

**Problem: Can't connect to Railway**
- Solution: Verify your Railway app is deployed and the URL is correct

## 📞 Test Your Railway API Directly

Use curl to test:
```bash
curl -X POST https://your-app.up.railway.app/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "test"}'
```

Or use Postman/Insomnia to test the endpoints before integrating.

