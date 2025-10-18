// Quick test to verify environment variables are loading
console.log('🔍 Environment Variables Check:');
console.log('─────────────────────────────────');
console.log('Railway API URL:', import.meta.env.VITE_RAILWAY_API_URL || '❌ NOT SET');
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL || '❌ NOT SET');
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ SET' : '❌ NOT SET');
console.log('─────────────────────────────────');

export const checkEnvVars = () => {
  const railwayUrl = import.meta.env.VITE_RAILWAY_API_URL;
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  return {
    railway: !!railwayUrl,
    supabase: !!(supabaseUrl && supabaseKey),
    railwayUrl,
    supabaseUrl
  };
};

