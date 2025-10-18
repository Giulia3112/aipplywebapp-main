# 🚀 Quick Start - Connect Railway API to Landing Page

## ⚡ 3-Minute Setup

### Step 1: Get Your Railway URL (30 seconds)

1. Open [Railway.app](https://railway.app) in a new tab
2. Find your AIpply API project
3. Copy the deployment URL (e.g., `https://aipply-api-production.up.railway.app`)

### Step 2: Configure Environment (1 minute)

Create a file named `.env.local` in your project root:

```bash
# Create the file
notepad .env.local
```

Add this content (replace with YOUR Railway URL):

```env
VITE_RAILWAY_API_URL=https://YOUR-ACTUAL-RAILWAY-URL.up.railway.app
VITE_SUPABASE_URL=https://qphnyfdtjxrqmdbjspoe.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaG55ZmR0anhycW1kYmpzcG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMTA4NTYsImV4cCI6MjA2NzU4Njg1Nn0.XPqD6vd3TOLk-aMVVU8XLXWr7zBj9NzDIpifTIakebg
```

### Step 3: Restart Dev Server (30 seconds)

Stop your current server (Ctrl+C) and restart:

```bash
npm run dev
```

### Step 4: Test It! (1 minute)

Open in your browser:
```
http://localhost:5173/search-demo
```

Try searching for: "computer science scholarships"

---

## ✅ What You Can Do Now

### 1. **View Your Website**
- Homepage: http://localhost:5173
- Demo: http://localhost:5173/search-demo
- Privacy: http://localhost:5173/privacy-policy

### 2. **Use the Railway API**
The landing page now connects to your Railway API through:

```javascript
// Import anywhere in your app
import { searchOpportunities } from '@/lib/railwayApiClient';

// Use it
const results = await searchOpportunities({
  query: "engineering scholarships",
  category: "scholarships",
  location: "USA"
});
```

### 3. **Customize the Search Component**
Edit `src/components/OpportunitySearch.jsx` to match your needs.

### 4. **Add Search Anywhere**
```jsx
import OpportunitySearch from '@/components/OpportunitySearch';

function MyPage() {
  return (
    <div>
      <h1>Find Opportunities</h1>
      <OpportunitySearch />
    </div>
  );
}
```

---

## 🎯 What I've Built for You

### ✅ New Files Created:
1. **`src/lib/railwayApiClient.js`** - API client with all functions
2. **`src/components/OpportunitySearch.jsx`** - Beautiful search UI
3. **`src/pages/SearchDemoPage.jsx`** - Demo page showing search
4. **`.env.example`** - Template for environment variables
5. **Documentation files** - Guides and setup instructions

### ✅ Files Modified:
1. **`src/App.jsx`** - Added `/search-demo` route
2. **`src/pages/LandingPage.jsx`** - Added "Try Demo" button
3. **`src/lib/customSupabaseClient.js`** - Now uses env variables

---

## 🔧 Match Your Railway API

### If Your API Uses Different Endpoints:

Edit `src/lib/railwayApiClient.js`:

```javascript
// Change the endpoint path
export async function searchOpportunities(params) {
  return apiRequest('/your-endpoint-here', {  // ← Change this
    method: 'POST',
    body: JSON.stringify(params),
  });
}
```

### If Your API Returns Different Data:

Edit `src/components/OpportunitySearch.jsx` to match your data structure.

For example, if your API returns:
```json
{
  "results": [...],
  "total": 10
}
```

Change line ~46 in `OpportunitySearch.jsx`:
```javascript
// From:
setResults(opportunities);

// To:
setResults(opportunities.results);
```

---

## 📚 Documentation

I've created detailed documentation for you:

| File | Purpose |
|------|---------|
| `QUICK_START.md` | This file - get started fast! |
| `RAILWAY_CONNECTION_SUMMARY.md` | Overview of everything |
| `RAILWAY_INTEGRATION.md` | Detailed integration guide |
| `SETUP_RAILWAY.md` | Step-by-step setup |
| `ARCHITECTURE.md` | System architecture diagram |

---

## 🐛 Troubleshooting

### Problem: Can't access `/search-demo`

**Solution**: Make sure you restarted the dev server after creating `.env.local`

### Problem: Search returns errors

**Solutions**:
1. Check your Railway URL is correct in `.env.local`
2. Verify your Railway API is running (visit the URL in browser)
3. Check Railway logs for errors
4. Test the API with curl or Postman first

### Problem: CORS errors in browser console

**Solution**: Your Railway API needs to allow requests from your domain. Add CORS headers to your Railway API.

Example for Python/FastAPI:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, use specific domain
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Problem: Environment variables not loading

**Solutions**:
1. File MUST be named `.env.local` (not `.env`)
2. Variables MUST start with `VITE_`
3. Restart dev server after creating/editing
4. Check file is in project root (same folder as `package.json`)

---

## 🚢 Deploy to Production

### Deploy Frontend (Hostinger/Vercel/Netlify)

Set these environment variables in your hosting platform:

```
VITE_RAILWAY_API_URL=https://your-railway-url.up.railway.app
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
```

### Deploy Backend (Already on Railway ✅)

Your Railway API is already deployed! Just make sure:
- It's running and healthy
- CORS is configured for your frontend domain
- All necessary environment variables are set in Railway

---

## 💡 Next Steps

Now that everything is connected:

1. **Test the demo** - Visit `/search-demo` and try searching
2. **Customize the UI** - Match your brand colors and style
3. **Add to landing page** - Put the search component on your homepage
4. **Add features** - Authentication, saved searches, favorites
5. **Go live** - Deploy to production!

---

## ❓ Need Help?

1. **Check the docs** - See the other `.md` files
2. **Test the API directly** - Use curl or Postman
3. **Check logs** - Browser console and Railway logs
4. **Email** - alvaresgiulia@gmail.com

---

**You're all set! Your AIpply landing page is connected to Railway! 🎉**

Try the demo at: http://localhost:5173/search-demo

