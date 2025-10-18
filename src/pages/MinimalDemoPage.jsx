import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function MinimalDemoPage() {
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

        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Minimal Demo Page
          </h1>
          <p className="text-gray-400 mb-8">
            This is the most basic version possible.
          </p>
          
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              ✅ Page is Working!
            </h2>
            <p className="text-gray-400 mb-6">
              If you can see this, the basic page structure works.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
