import React, { useState } from 'react';
import { Search, Loader2, ExternalLink } from 'lucide-react';
import { searchOpportunities } from '@/lib/railwayApiClient';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * OpportunitySearch Component
 * Demonstrates integration with Railway API for web search
 */
export default function OpportunitySearch() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const { toast } = useToast();

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        variant: "destructive",
        title: "Search query required",
        description: "Please enter what you're looking for.",
      });
      return;
    }

    setLoading(true);
    try {
      const opportunities = await searchOpportunities({
        keyword: query,
        // Optional: type: 'scholarship' | 'fellowship' | 'accelerator'
        // Optional: region: 'USA' | 'Europe' | etc.
      });

      const resultArray = opportunities.opportunities || opportunities || [];
      setResults(resultArray);
      
      toast({
        title: "Search completed!",
        description: `Found ${resultArray.length} opportunities.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Search failed",
        description: error.message || "Could not connect to the API. Please try again.",
      });
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="bg-gray-800/50 border-gray-700/50">
        <CardHeader>
          <CardTitle className="text-white">AI-Powered Opportunity Search</CardTitle>
          <CardDescription className="text-gray-400">
            💡 <strong>Tip:</strong> Be specific! Try "computer science scholarship USA" or "design fellowship Europe"
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSearch} className="flex gap-3">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Be specific: e.g., 'AI research fellowship for students in Europe'"
              className="flex-grow bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
              disabled={loading}
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-neon-blue hover:bg-neon-blue/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </form>
          
          {/* Search Tips */}
          <div className="bg-gray-900/30 border border-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">
              <span className="text-neon-blue font-semibold">🎯 For best results, include:</span>
            </p>
            <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
              <li><strong>What:</strong> scholarship, fellowship, grant, accelerator</li>
              <li><strong>Field:</strong> computer science, design, engineering, business</li>
              <li><strong>Location:</strong> USA, Europe, Asia, remote, specific country</li>
              <li><strong>Level:</strong> undergraduate, graduate, PhD, early-stage startup</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">
            Found {results.length} opportunities
          </h3>
          {results.map((opportunity, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700/50 hover:border-neon-blue/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">
                      {opportunity.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                      {opportunity.description}
                    </CardDescription>
                  </div>
                  {opportunity.url && (
                    <a
                      href={opportunity.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon-blue hover:text-neon-blue/80"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardHeader>
              {(opportunity.deadline || opportunity.location || opportunity.type) && (
                <CardContent>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                    {opportunity.type && (
                      <span className="px-2 py-1 bg-neon-blue/20 text-neon-blue rounded">
                        {opportunity.type}
                      </span>
                    )}
                    {opportunity.location && (
                      <span className="px-2 py-1 bg-gray-700/50 rounded">
                        📍 {opportunity.location}
                      </span>
                    )}
                    {opportunity.deadline && (
                      <span className="px-2 py-1 bg-gray-700/50 rounded">
                        ⏰ {opportunity.deadline}
                      </span>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

