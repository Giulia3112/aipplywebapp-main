import React from 'react';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import OpportunitySearch from '@/components/OpportunitySearch';
import SimpleOpportunitySearch from '@/components/SimpleOpportunitySearch';

/**
 * Demo page showing Railway API integration
 * This can be used for testing or as a preview of the search functionality
 */
export default function SearchDemoPage() {
  return (
    <>
      <Helmet>
        <title>Search Demo - AIpply</title>
        <meta name="description" content="Try AIpply's AI-powered opportunity search" />
      </Helmet>

      <div className="min-h-screen bg-[#0A0A0A] text-gray-200">
        <div className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#2D5FFF_100%)]"></div>
        
        <div className="container mx-auto px-6 py-12 relative z-10">
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

          <SimpleOpportunitySearch />

          <div className="mt-16 text-center">
            <div className="inline-block bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 max-w-2xl">
              <h3 className="text-xl font-semibold text-white mb-3">
                How it works
              </h3>
              <div className="text-gray-400 space-y-2">
                <p>
                  🤖 Our AI agent searches 30+ sources including Fulbright, Techstars, Y Combinator
                </p>
                <p>
                  📊 Results are filtered and ranked based on relevance and your criteria
                </p>
                <p>
                  ⚡ Powered by our Railway-deployed backend API with real-time data
                </p>
              </div>
            </div>
            
            <div className="mt-8">
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
      </div>
    </>
  );
}

