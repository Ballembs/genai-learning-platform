// lib/cache.ts
// Generic localStorage cache utility for client-side caching

const CACHE_PREFIX = 'genai_cache_';
const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

/**
 * Get cached data from localStorage.
 * Returns null if not found, expired, or on server-side.
 */
export function getCached<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - entry.timestamp > entry.ttl) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

/**
 * Save data to localStorage cache.
 * Silently fails if localStorage is full or unavailable.
 */
export function setCache<T>(key: string, data: T, ttlMs: number = DEFAULT_TTL_MS): void {
  if (typeof window === 'undefined') return;
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now(), ttl: ttlMs };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable - silently fail
  }
}

/**
 * Clear all cached data with our prefix.
 */
export function clearCache(): void {
  if (typeof window === 'undefined') return;
  const keys = Object.keys(localStorage).filter(k => k.startsWith(CACHE_PREFIX));
  keys.forEach(k => localStorage.removeItem(k));
}

/**
 * Remove a specific cache entry.
 */
export function removeCache(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CACHE_PREFIX + key);
  } catch {
    // Silently fail
  }
}
