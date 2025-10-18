/**
 * Railway API Client for AIpply Web Search Agent
 * This client handles all communication with the Railway-deployed API
 */

// Hardcode the Railway URL to ensure we're using the correct endpoint
const RAILWAY_API_URL = 'https://aipply-ai-agent-main-production.up.railway.app';

/**
 * Generic fetch wrapper with error handling
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${RAILWAY_API_URL}${endpoint}`;
  
  console.log('🚀 API Request:', url); // Debug log
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    console.log('📡 API Response Status:', response.status); // Debug log
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ API Response Data:', data); // Debug log
    return data;
  } catch (error) {
    console.error('❌ Railway API Error:', error);
    throw error;
  }
}

/**
 * Search for opportunities on the web
 * @param {Object} params - Search parameters
 * @param {string} params.keyword - Search keyword/query
 * @param {string} params.region - Region filter (optional)
 * @param {string} params.type - Type filter: 'scholarship', 'fellowship', 'accelerator' (optional)
 * @returns {Promise<Array>} - Array of opportunities
 */
export async function searchOpportunities(params) {
  // Build query string from params
  const queryParams = new URLSearchParams();
  if (params.keyword || params.query) queryParams.append('keyword', params.keyword || params.query);
  if (params.region) queryParams.append('region', params.region);
  if (params.type || params.category) queryParams.append('type', params.type || params.category);
  
  console.log('🔍 Search Parameters:', params); // Debug log
  
  // Use the correct endpoint path from your API
  return apiRequest(`/search?${queryParams.toString()}`, {
    method: 'GET',
  });
}

/**
 * Get all stored opportunities from database
 * Note: Uses search without keyword to get all results
 * @returns {Promise<Array>} - Array of all opportunities
 */
export async function getAllOpportunities() {
  // Use search endpoint with empty keyword to get all opportunities
  // Admin endpoint requires authentication
  return searchOpportunities({ keyword: '' });
}

/**
 * Search for opportunities with enhanced detailed results
 * @param {Object} params - Search parameters
 * @param {string} params.keyword - Search keyword/query
 * @param {string} params.region - Region filter (optional)
 * @param {string} params.type - Type filter (optional)
 * @returns {Promise<Object>} - Enhanced search results
 */
export async function searchDetailedOpportunities(params) {
  // Build query string from params
  const queryParams = new URLSearchParams();
  if (params.keyword || params.query) queryParams.append('keyword', params.keyword || params.query);
  if (params.region) queryParams.append('region', params.region);
  if (params.type || params.category) queryParams.append('type', params.type || params.category);
  
  // Use the enhanced search endpoint
  return apiRequest(`/api/search-detailed?${queryParams.toString()}`, {
    method: 'GET',
  });
}

/**
 * Health check for the Railway API
 * @returns {Promise<Object>} - API health status
 */
export async function checkApiHealth() {
  return apiRequest('/');
}

export default {
  searchOpportunities,
  searchDetailedOpportunities,
  getAllOpportunities,
  checkApiHealth,
};

