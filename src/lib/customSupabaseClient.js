import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qphnyfdtjxrqmdbjspoe.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaG55ZmR0anhycW1kYmpzcG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMTA4NTYsImV4cCI6MjA2NzU4Njg1Nn0.XPqD6vd3TOLk-aMVVU8XLXWr7zBj9NzDIpifTIakebg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);