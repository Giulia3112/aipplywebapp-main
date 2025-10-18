import React, { useState } from 'react';
import { Search } from 'lucide-react';

/**
 * Simple Opportunity Search Component for testing
 */
export default function SimpleOpportunitySearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search clicked:', query);
    
    // Mock results for testing
    setResults([
      {
        title: "Test Scholarship",
        description: "This is a test result",
        url: "https://example.com",
        type: "scholarship"
      }
    ]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Search Opportunities</h2>
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for scholarships, grants, opportunities..."
            className="flex-grow bg-gray-900/50 border border-gray-700 text-white px-4 py-3 rounded-lg placeholder:text-gray-500"
          />
          <button 
            type="submit"
            className="bg-neon-blue hover:bg-neon-blue/90 text-white px-6 py-3 rounded-lg flex items-center"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </button>
        </form>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">
            Found {results.length} opportunities
          </h3>
          {results.map((opportunity, index) => (
            <div key={index} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-white font-semibold text-lg mb-2">
                {opportunity.title}
              </h4>
              <p className="text-gray-400 mb-3">
                {opportunity.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full text-sm">
                  {opportunity.type}
                </span>
                <a
                  href={opportunity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-blue hover:text-neon-blue/80 text-sm"
                >
                  View Details →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
