import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowLeft, MoveRight, Search, Loader2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { searchOpportunities } from '@/lib/railwayApiClient';
import { useToast } from "@/components/ui/use-toast";

/**
 * Working Search Demo Page - Built step by step
 */
export default function WorkingSearchDemoPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
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
    setHasSearched(true);
    
    try {
      const opportunities = await searchOpportunities({
        keyword: query,
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
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Search Demo - AIpply</title>
        <meta name="description" content="Try AIpply's AI-powered opportunity search" />
      </Helmet>

      <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-6">
        <div className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#2D5FFF_100%)]"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center mb-12">
            <div className="inline-block bg-neon-blue/20 text-neon-blue text-sm font-semibold px-4 py-2 rounded-full border border-neon-blue/30 mb-6">
              🚀 Live Demo - Real AI Search
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Try Our AI Opportunity Search
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
              Search 30+ trusted sources for scholarships, fellowships, and accelerator programs. 
              <span className="text-white font-semibold"> Get real results in seconds!</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
              <span className="px-3 py-1 bg-gray-800/50 rounded-full">✅ No signup required</span>
              <span className="px-3 py-1 bg-gray-800/50 rounded-full">✅ Real opportunities</span>
              <span className="px-3 py-1 bg-gray-800/50 rounded-full">✅ Instant results</span>
            </div>
          </div>

          {/* Working Search Form */}
          <div className="w-full max-w-4xl mx-auto mb-12">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-2">AI-Powered Opportunity Search</h2>
              <p className="text-sm text-gray-400 mb-4">
                💡 <strong className="text-neon-blue">Tip:</strong> Be specific for better results! Include field, location, and level.
              </p>
              
              <div className="bg-green-900/20 border border-green-700/50 p-3 rounded-lg mb-4">
                <p className="text-green-400 text-sm">
                  ✅ <strong>Live Demo:</strong> Searching 30+ sources in real-time with AI
                </p>
              </div>
              
              <form onSubmit={handleSearch} className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Be specific: 'AI research fellowship for students in Europe'"
                  className="flex-grow bg-gray-900/50 border border-gray-700 text-white px-4 py-3 rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                  disabled={loading}
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-neon-blue hover:bg-neon-blue/90 text-white px-6 py-3 rounded-lg flex items-center font-semibold disabled:opacity-50 whitespace-nowrap"
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
                </button>
              </form>
              
              {/* Enhanced Search Tips */}
              <div className="bg-gray-900/30 border border-gray-700/50 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">
                  <span className="text-neon-blue font-semibold">🎯 For best results, include:</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-400">
                  <div><strong className="text-white">Type:</strong> scholarship, fellowship, grant, accelerator</div>
                  <div><strong className="text-white">Field:</strong> computer science, design, engineering</div>
                  <div><strong className="text-white">Location:</strong> USA, Europe, Asia, remote</div>
                  <div><strong className="text-white">Level:</strong> undergraduate, graduate, PhD, startup</div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  <strong className="text-gray-400">Example:</strong> "machine learning PhD scholarship USA" or "design fellowship Europe 2024"
                </p>
              </div>
            </div>
          </div>

          {/* Search Results */}
          {hasSearched && !loading && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                {results.length > 0 ? `Found ${results.length} opportunities` : 'No opportunities found'}
              </h3>
              
              {results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((opportunity, index) => (
                    <div key={index} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:border-neon-blue/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-white font-semibold text-lg">
                          {opportunity.title || 'Opportunity Title'}
                        </h4>
                        {opportunity.url && (
                          <a
                            href={opportunity.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neon-blue hover:text-neon-blue/80 text-sm flex items-center"
                          >
                            View Details <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        )}
                      </div>
                      <p className="text-gray-400 mb-3">
                        {opportunity.description || opportunity.organization || 'No description available'}
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm">
                        {opportunity.type && (
                          <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full">
                            {opportunity.type}
                          </span>
                        )}
                        {opportunity.location && (
                          <span className="px-3 py-1 bg-gray-700/50 rounded-full text-gray-400">
                            📍 {opportunity.location}
                          </span>
                        )}
                        {opportunity.deadline && (
                          <span className="px-3 py-1 bg-gray-700/50 rounded-full text-gray-400">
                            ⏰ {opportunity.deadline}
                          </span>
                        )}
                        {opportunity.organization && (
                          <span className="px-3 py-1 bg-gray-700/50 rounded-full text-gray-400">
                            🏢 {opportunity.organization}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8">
                    <p className="text-gray-400 text-lg mb-4">
                      No opportunities found for "{query}"
                    </p>
                    <p className="text-gray-500 text-sm">
                      Try different keywords or check back later for new opportunities.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sample Results (shown when no search has been performed) */}
          {!hasSearched && (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                Example Results (from your Railway API)
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-semibold text-lg">
                      Chevening Scholarships 2025
                    </h4>
                    <span className="text-gray-500 text-sm">Example</span>
                  </div>
                  <p className="text-gray-400 mb-3">
                    UK government's global scholarship program for one-year master's degrees at UK universities.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full">
                      scholarship
                    </span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-gray-400">
                      🇬🇧 UK
                    </span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-gray-400">
                      ⏰ Rolling deadline
                    </span>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-semibold text-lg">
                      Techstars Startup Accelerator
                    </h4>
                    <span className="text-gray-500 text-sm">Example</span>
                  </div>
                  <p className="text-gray-400 mb-3">
                    13-week program providing funding, mentorship, and access to a global network of entrepreneurs.
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full">
                      accelerator
                    </span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-gray-400">
                      🌍 Global
                    </span>
                    <span className="px-3 py-1 bg-gray-700/50 rounded-full text-gray-400">
                      💰 $120k funding
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-neon-blue/10 to-purple-500/10 p-6 rounded-xl border border-neon-blue/20 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-3">
                🎯 Love what you see?
              </h3>
              <p className="text-gray-300 mb-4">
                We're building AI-assisted applications to help you apply to these opportunities with personalized writing assistance.
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Join our waitlist to be the first to experience the complete AIpply ecosystem.
              </p>
              <Link 
                to="/"
                className="inline-flex items-center bg-neon-blue text-white font-bold px-6 py-3 rounded-lg hover:brightness-125 transition-colors"
              >
                📧 Join Waitlist for Early Access <MoveRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
