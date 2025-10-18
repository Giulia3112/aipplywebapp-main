# 🚂 Railway API Reference

Based on your [GitHub repository](https://github.com/Giulia3112/AIpply-AI-Agent-Main)

## 🎯 API Endpoints

### Base URL
```
Development: http://localhost:8000
Production: https://your-railway-url.up.railway.app
```

### Available Endpoints

#### 1. Health Check
```http
GET /api/health
```
**Response:**
```json
{
  "status": "healthy",
  "message": "API is running"
}
```

#### 2. Search Opportunities
```http
GET /api/search?keyword={keyword}&region={region}&type={type}
```
**Query Parameters:**
- `keyword` (required): Search term (e.g., "engineering scholarship")
- `region` (optional): Geographic region
- `type` (optional): Type of opportunity
  - `scholarship`
  - `fellowship`
  - `accelerator`

**Example:**
```
GET /api/search?keyword=computer%20science&type=scholarship
```

**Response:**
```json
{
  "opportunities": [
    {
      "title": "Google Scholarship",
      "description": "Scholarship for CS students",
      "url": "https://...",
      "source": "WeMakeScholars",
      "type": "scholarship",
      "deadline": "2024-12-31"
    }
  ],
  "count": 10
}
```

#### 3. Get All Opportunities
```http
GET /api/opportunities
```
**Response:**
```json
[
  {
    "id": 1,
    "title": "Opportunity Title",
    "description": "Description",
    "url": "https://...",
    "type": "scholarship",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

#### 4. AI Chat
```http
POST /api/chat
Content-Type: application/json
```
**Request Body:**
```json
{
  "message": "I'm looking for AI scholarships in Europe"
}
```

**Response:**
```json
{
  "reply": "Here are some AI scholarships in Europe...",
  "opportunities": [...]
}
```

## 🔧 How to Use in Your Landing Page

### 1. Search for Opportunities
```javascript
import { searchOpportunities } from '@/lib/railwayApiClient';

const results = await searchOpportunities({
  keyword: "engineering scholarship",
  type: "scholarship",
  region: "USA"
});
```

### 2. Get All Opportunities
```javascript
import { getAllOpportunities } from '@/lib/railwayApiClient';

const allOpps = await getAllOpportunities();
```

### 3. Chat with AI
```javascript
import { chatWithAI } from '@/lib/railwayApiClient';

const response = await chatWithAI("Find me tech scholarships");
console.log(response.reply);
console.log(response.opportunities);
```

### 4. Health Check
```javascript
import { checkApiHealth } from '@/lib/railwayApiClient';

const health = await checkApiHealth();
console.log(health.status); // "healthy"
```

## 📊 Opportunity Sources

Your API scrapes **30+ sources** including:

### Scholarships:
- Partiu Intercambio
- WeMakeScholars
- Fulbright Brazil & US

### Fellowships:
- ProFellow
- Start Fellowship
- Watson Impact Fellowships
- Kauffman Fellows

### Accelerators:
- Y Combinator
- Techstars
- 500 Global
- Station F
- SEBRAE Startups

## 🧪 Testing Your API

### Test Page
Visit: http://localhost:5173/api-test

### Manual Testing with curl
```bash
# Health check
curl https://your-railway-url.up.railway.app/api/health

# Search
curl "https://your-railway-url.up.railway.app/api/search?keyword=scholarship"

# Get all opportunities
curl https://your-railway-url.up.railway.app/api/opportunities

# Chat with AI (requires OpenAI API key)
curl -X POST https://your-railway-url.up.railway.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Find tech scholarships"}'
```

## 🔑 Environment Variables

Your Railway API needs:
```env
OPENAI_API_KEY=your_openai_key_here
DATABASE_URL=postgresql://... (or sqlite:///./aipply.db)
ENVIRONMENT=production
```

## ✅ Integration Checklist

- [x] API client updated to use correct endpoints
- [x] Search component uses `keyword` parameter
- [x] Health check endpoint corrected to `/api/health`
- [x] GET method used for search (not POST)
- [ ] Add your Railway URL to `.env.local`
- [ ] Test the connection at `/api-test`
- [ ] Try the search demo at `/search-demo`

## 🚀 Next Steps

1. **Test the API**
   - Go to http://localhost:5173/api-test
   - Click "Test Endpoint" with `/api/health`
   - Should see green success message ✅

2. **Try Search Demo**
   - Go to http://localhost:5173/search-demo
   - Search for "computer science scholarship"
   - Should see results from your API ✅

3. **Deploy**
   - Make sure Railway API is deployed
   - Set environment variables on Railway
   - Update `.env.local` with Railway URL

---

**Your API is now properly connected!** 🎉

