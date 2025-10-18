# AIpply Railway API Integration Guide

This guide explains how to connect your AIpply landing page with the Railway-deployed API agent for web search.

## 🚀 Quick Setup

### 1. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Then edit `.env.local` and add your Railway API URL:

```env
VITE_RAILWAY_API_URL=https://your-actual-railway-app.up.railway.app
```

### 2. Railway API Client

The `src/lib/railwayApiClient.js` file provides a clean interface to interact with your Railway API:

```javascript
import { searchOpportunities, analyzeDocument, getRecommendations } from '@/lib/railwayApiClient';

// Search for opportunities
const results = await searchOpportunities({
  query: 'software engineering scholarships',
  category: 'scholarships',
  location: 'USA'
});

// Analyze a document
const analysis = await analyzeDocument({
  documentUrl: 'https://example.com/document.pdf',
  question: 'What are the eligibility criteria?'
});

// Get personalized recommendations
const recommendations = await getRecommendations({
  interests: ['technology', 'entrepreneurship'],
  location: 'USA',
  education: 'undergraduate'
});
```

## 📦 Available API Functions

### `searchOpportunities(params)`
Search for opportunities on the web.

**Parameters:**
- `query` (string): Search query
- `category` (string, optional): Filter by category
- `location` (string, optional): Filter by location

**Returns:** Array of opportunities

### `getOpportunityDetails(opportunityId)`
Get detailed information about a specific opportunity.

**Parameters:**
- `opportunityId` (string): The opportunity ID

**Returns:** Opportunity object with full details

### `analyzeDocument(params)`
Extract information from documents using AI.

**Parameters:**
- `documentUrl` (string): URL of the document to analyze
- `question` (string): Question to ask about the document

**Returns:** Extracted information object

### `getRecommendations(userProfile)`
Get AI-powered opportunity recommendations.

**Parameters:**
- `userProfile` (object): User profile data including interests, location, education, etc.

**Returns:** Array of recommended opportunities

### `checkApiHealth()`
Check if the Railway API is online and healthy.

**Returns:** Health status object

## 🎨 Using the OpportunitySearch Component

A pre-built search component is available at `src/components/OpportunitySearch.jsx`.

### Add to Landing Page

```jsx
import OpportunitySearch from '@/components/OpportunitySearch';

function LandingPage() {
  return (
    <div>
      {/* Your existing content */}
      
      <section className="py-24">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Try Our AI Search
        </h2>
        <OpportunitySearch />
      </section>
      
      {/* More content */}
    </div>
  );
}
```

## 🔧 Customize API Endpoints

If your Railway API has different endpoints, modify `src/lib/railwayApiClient.js`:

```javascript
// Example: Custom endpoint
export async function customEndpoint(data) {
  return apiRequest('/api/your-custom-endpoint', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
```

## 🌐 Railway Deployment URL

To find your Railway API URL:

1. Go to your Railway dashboard
2. Select your API project
3. Go to the "Settings" tab
4. Find your deployment URL (e.g., `https://your-app.up.railway.app`)
5. Add it to `.env.local` as `VITE_RAILWAY_API_URL`

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Use environment variables for all sensitive data
- The Railway API URL can be public, but add authentication if handling sensitive operations
- Consider adding rate limiting to prevent abuse

## 🧪 Testing the Connection

Create a simple test to verify the connection:

```javascript
import { checkApiHealth } from '@/lib/railwayApiClient';

async function testConnection() {
  try {
    const health = await checkApiHealth();
    console.log('✅ API is healthy:', health);
  } catch (error) {
    console.error('❌ API connection failed:', error);
  }
}
```

## 🚨 Troubleshooting

### CORS Errors
If you see CORS errors, ensure your Railway API includes these headers:

```python
# Example for Python/FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Connection Refused
- Verify your Railway API is deployed and running
- Check the Railway logs for errors
- Ensure the URL in `.env.local` is correct

### 404 Errors
- Verify the API endpoints match what your Railway API expects
- Check the Railway API documentation for correct endpoint paths

## 📚 Next Steps

1. **Add Authentication**: Implement user authentication to personalize searches
2. **Cache Results**: Add caching to reduce API calls and improve performance
3. **Error Handling**: Enhance error messages and retry logic
4. **Analytics**: Track search queries to understand user behavior
5. **Real-time Updates**: Add WebSocket support for live opportunity updates

## 🤝 Need Help?

If you encounter issues:
1. Check Railway logs for API errors
2. Use browser DevTools Network tab to inspect requests
3. Verify environment variables are loaded correctly
4. Test API endpoints directly using Postman or curl

---

**Happy coding! 🎉**

