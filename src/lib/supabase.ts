import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (typeof window === 'undefined') {
  console.log('[Supabase] Initializing...');
  if (supabaseUrl) console.log('✅ NEXT_PUBLIC_SUPABASE_URL loaded');
  if (supabaseAnonKey) console.log('✅ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY loaded');
  if (!supabaseUrl) console.warn('⚠️ NEXT_PUBLIC_SUPABASE_URL not found');
  if (!supabaseAnonKey) console.warn('⚠️ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY not found');
}

// Create client - use actual values, let it fail if not configured
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

// Export a function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};
