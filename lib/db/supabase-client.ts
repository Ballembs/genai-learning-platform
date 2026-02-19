// lib/db/supabase-client.ts
// Modern Supabase client setup for Next.js App Router using @supabase/ssr
//
// Key types:
// - Publishable key: Safe for client-side, REQUIRES Row Level Security (RLS)
// - Secret key: Server-side only, bypasses RLS - NEVER expose to browser

import { createBrowserClient } from '@supabase/ssr';
import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null = null;

/**
 * Create a Supabase client for use in the browser (Client Components)
 * Uses the Publishable key which requires RLS policies to protect data
 */
export function createClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    console.warn('Supabase not configured. Using localStorage fallback.');
    return null;
  }

  // Singleton pattern for browser client
  if (browserClient) return browserClient;

  browserClient = createBrowserClient(supabaseUrl, supabasePublishableKey);
  return browserClient;
}

/**
 * Direct Supabase client getter using Publishable key
 * Use this for simple client-side operations
 * REQUIRES Row Level Security (RLS) policies to be enabled
 * Uses the same singleton as createClient() to avoid multiple GoTrueClient instances
 */
export function getSupabase(): SupabaseClient | null {
  return createClient();
}

// Legacy export for backwards compatibility - use getSupabase() instead
export const supabase = null; // Deprecated: use createClient() or getSupabase()

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}
