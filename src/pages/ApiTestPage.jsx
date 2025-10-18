import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

/**
 * API Test Page - Debug Railway API endpoints
 */
export default function ApiTestPage() {
  const [baseUrl, setBaseUrl] = useState(import.meta.env.VITE_RAILWAY_API_URL || '');
  const [endpoint, setEndpoint] = useState('/health');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const testEndpoint = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const fullUrl = `${baseUrl}${endpoint}`;

    try {
      console.log('Testing:', fullUrl);
      const res = await fetch(fullUrl);
      
      const contentType = res.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      if (!res.ok) {
        setError({
          status: res.status,
          statusText: res.statusText,
          data
        });
      } else {
        setResponse({
          status: res.status,
          statusText: res.statusText,
          data
        });
        toast({
          title: "Success!",
          description: `Endpoint returned ${res.status}`,
        });
      }
    } catch (err) {
      setError({
        message: err.message,
        type: 'Network Error'
      });
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const commonEndpoints = [
    '/',
    '/search?keyword=scholarship',
    '/api/search-detailed?keyword=scholarship',
    '/api/cache/stats',
    '/docs',
    '/admin-panel',
  ];

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

        <h1 className="text-4xl font-bold text-white mb-2">Railway API Tester</h1>
        <p className="text-gray-400 mb-8">Debug and test your Railway API endpoints</p>

        {/* Configuration */}
        <Card className="bg-gray-800/50 border-gray-700/50 mb-6">
          <CardHeader>
            <CardTitle className="text-white">API Configuration</CardTitle>
            <CardDescription className="text-gray-400">
              From your .env.local file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Base URL
              </label>
              <Input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://your-app.up.railway.app"
                className="bg-gray-900/50 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Endpoint Path
              </label>
              <Input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="/health"
                className="bg-gray-900/50 border-gray-700 text-white"
              />
            </div>
            <div className="text-sm text-gray-400 bg-gray-900/50 p-3 rounded">
              <strong>Testing:</strong> {baseUrl}{endpoint}
            </div>
            <Button 
              onClick={testEndpoint} 
              disabled={loading || !baseUrl}
              className="w-full bg-neon-blue hover:bg-neon-blue/90"
            >
              {loading ? 'Testing...' : 'Test Endpoint'}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Test Buttons */}
        <Card className="bg-gray-800/50 border-gray-700/50 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Quick Tests</CardTitle>
            <CardDescription className="text-gray-400">
              Try common endpoint patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {commonEndpoints.map((ep) => (
                <Button
                  key={ep}
                  variant="outline"
                  size="sm"
                  onClick={() => setEndpoint(ep)}
                  className="bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  {ep}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Success Response */}
        {response && (
          <Card className="bg-green-900/20 border-green-700/50 mb-6">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                ✅ Success - {response.status} {response.statusText}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900/50 p-4 rounded overflow-auto text-sm text-gray-300">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Error Response */}
        {error && (
          <Card className="bg-red-900/20 border-red-700/50 mb-6">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center">
                <AlertCircle className="mr-2" />
                {error.type || `Error - ${error.status} ${error.statusText}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {error.status === 404 && (
                  <div className="bg-yellow-900/20 border border-yellow-700/50 p-4 rounded mb-4">
                    <p className="text-yellow-400 font-semibold mb-2">
                      404 - Endpoint Not Found
                    </p>
                    <p className="text-sm text-gray-300">
                      This means your Railway URL is correct, but the endpoint path doesn't exist.
                      Try the "Quick Tests" above to find valid endpoints.
                    </p>
                  </div>
                )}
                {error.message && (
                  <div className="text-gray-300 mb-2">
                    <strong>Message:</strong> {error.message}
                  </div>
                )}
                {error.data && (
                  <pre className="bg-gray-900/50 p-4 rounded overflow-auto text-sm text-gray-300">
                    {typeof error.data === 'string' ? error.data : JSON.stringify(error.data, null, 2)}
                  </pre>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="bg-gray-800/50 border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">How to Use</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 space-y-2 text-sm">
            <p><strong>1.</strong> Make sure your Railway API URL is set in .env.local</p>
            <p><strong>2.</strong> Click the "Quick Tests" buttons to try common endpoints</p>
            <p><strong>3.</strong> Look for a successful response (green card)</p>
            <p><strong>4.</strong> Once you find working endpoints, let me know so I can update the API client!</p>
            <p className="mt-4 text-gray-400">
              💡 Tip: If you get 404 errors, your Railway API might use different endpoint paths.
              Check your Railway project's code or documentation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

