import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Simple demo page for testing
 */
export default function SimpleDemoPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-6">
      <div className="container mx-auto max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple Demo Test
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            This is a simple test page to check if the routing works.
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            ✅ Demo Page is Working!
          </h2>
          <p className="text-gray-400 mb-6">
            If you can see this, the basic routing and styling are working correctly.
          </p>
          <Link 
            to="/search-demo"
            className="bg-neon-blue text-white font-bold px-6 py-3 rounded-lg hover:brightness-125 transition-colors inline-block"
          >
            Try Full Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
