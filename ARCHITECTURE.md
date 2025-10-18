# 🏗️ AIpply Architecture - Landing Page + Railway API

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER'S BROWSER                          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           AIpply Landing Page (React)                │  │
│  │                                                      │  │
│  │  Components:                                         │  │
│  │  • LandingPage.jsx ─────────┐                       │  │
│  │  • SearchDemoPage.jsx       │                       │  │
│  │  • OpportunitySearch.jsx ───┤                       │  │
│  │                             │                       │  │
│  │  Uses:                      │                       │  │
│  │  • railwayApiClient.js ◄────┘                       │  │
│  │                                                      │  │
│  └─────────────────────────┬────────────────────────────┘  │
│                            │                               │
└────────────────────────────┼───────────────────────────────┘
                             │
                             │ fetch() requests
                             │ with JSON
                             ▼
              ┌──────────────────────────────┐
              │   VITE_RAILWAY_API_URL       │
              │  (.env.local variable)       │
              └──────────────┬───────────────┘
                             │
                             ▼
         ┌───────────────────────────────────────┐
         │       Railway Deployment               │
         │   https://your-app.up.railway.app     │
         │                                        │
         │   AI Web Search Agent API              │
         │                                        │
         │   Endpoints:                           │
         │   • POST /api/search                   │
         │   • GET  /api/opportunities/:id        │
         │   • POST /api/analyze-document         │
         │   • POST /api/recommendations          │
         │   • GET  /health                       │
         │                                        │
         └───────────────────────────────────────┘
                             │
                             │ Searches & scrapes
                             ▼
                    ┌─────────────────┐
                    │   Web Sources   │
                    │  • Google       │
                    │  • Scholarship  │
                    │    sites        │
                    │  • Job boards   │
                    │  • Grant sites  │
                    └─────────────────┘
```

## Data Flow Example

### 1. User Searches for Opportunities

```
User types "software scholarships"
         ↓
OpportunitySearch component
         ↓
railwayApiClient.searchOpportunities({
  query: "software scholarships",
  category: "scholarships",
  location: "USA"
})
         ↓
POST https://your-app.up.railway.app/api/search
         ↓
Railway API processes request
         ↓
Railway API searches the web
         ↓
Railway API returns results:
[
  {
    title: "Google Scholarship",
    description: "...",
    url: "...",
    deadline: "2024-12-31"
  },
  ...
]
         ↓
OpportunitySearch displays results
         ↓
User sees beautiful cards with opportunities!
```

## File Structure

```
aipply-landing/
├── .env.example              # Environment variables template
├── .env.local               # Your actual config (create this!)
│
├── src/
│   ├── App.jsx              # Routes ✅ MODIFIED
│   │
│   ├── lib/
│   │   ├── railwayApiClient.js    # API client ✅ NEW
│   │   └── customSupabaseClient.js # ✅ MODIFIED
│   │
│   ├── components/
│   │   ├── OpportunitySearch.jsx  # Search UI ✅ NEW
│   │   └── ui/
│   │       └── (existing components)
│   │
│   └── pages/
│       ├── LandingPage.jsx        # ✅ MODIFIED (added button)
│       ├── SearchDemoPage.jsx     # Demo page ✅ NEW
│       └── (other pages)
│
└── Documentation/
    ├── RAILWAY_CONNECTION_SUMMARY.md  # Quick summary
    ├── RAILWAY_INTEGRATION.md         # Detailed guide
    ├── SETUP_RAILWAY.md              # Setup steps
    └── ARCHITECTURE.md               # This file!
```

## API Client Functions

```javascript
// In your components, import and use:
import { 
  searchOpportunities,
  getOpportunityDetails,
  analyzeDocument,
  getRecommendations,
  checkApiHealth 
} from '@/lib/railwayApiClient';

// Example usage:
const results = await searchOpportunities({
  query: "tech scholarships",
  category: "scholarships",
  location: "USA"
});
```

## Environment Variables

```
Development (.env.local):
├── VITE_RAILWAY_API_URL → Railway deployment URL
├── VITE_SUPABASE_URL → Supabase project URL
└── VITE_SUPABASE_ANON_KEY → Supabase anon key

Production (Hostinger/Vercel/Netlify):
└── Same variables set in hosting platform
```

## Component Hierarchy

```
App.jsx
├── LandingPage (/)
│   └── Header with "Try Demo" button
│
├── SearchDemoPage (/search-demo)
│   └── OpportunitySearch
│       ├── Input field
│       ├── Search button
│       └── Results cards
│           ├── Title
│           ├── Description
│           ├── URL link
│           └── Metadata (type, location, deadline)
│
└── PrivacyPolicyPage (/privacy-policy)
```

## Technology Stack

### Frontend (This Landing Page)
- **React 18** - UI framework
- **Vite 4** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Radix UI** - UI components
- **Lucide React** - Icons

### Backend (Your Railway API)
- **Railway** - Hosting platform
- **Your API** - Web search agent
  - Language: (Python/Node.js/Go/etc.?)
  - Framework: (FastAPI/Express/etc.?)

### Database
- **Supabase** - User data, waitlist, etc.

## Security Flow

```
1. All API keys stored in .env.local (not in git)
2. Frontend makes requests to Railway API
3. Railway API has CORS enabled for your domain
4. Railway API handles authentication (if needed)
5. Railway API makes external web searches
6. Results sanitized and returned to frontend
```

## Deployment Options

### Frontend Deployment
- **Hostinger** (current)
- **Vercel** (recommended for Vite/React)
- **Netlify**
- **GitHub Pages**

### Backend Deployment
- **Railway** ✅ (current)
- Alternative: Heroku, Render, Fly.io

## URLs

| Environment | Frontend | Backend (Railway) |
|------------|----------|------------------|
| Development | http://localhost:5173 | http://localhost:8000 (or your local port) |
| Production | https://your-domain.com | https://your-app.up.railway.app |

## Next Enhancement Ideas

1. **Authentication Flow**
   - User login/signup
   - Saved searches
   - Personal dashboard

2. **Real-time Features**
   - WebSocket for live updates
   - Notifications when new opportunities match

3. **Advanced Search**
   - Filters (deadline, amount, field)
   - Sort options
   - Save search preferences

4. **Analytics**
   - Track popular searches
   - User engagement metrics
   - A/B testing

5. **AI Features**
   - Personalized recommendations
   - Document analysis
   - Application assistance

---

**Your landing page is now architectured to work with your Railway AI agent! 🚀**

