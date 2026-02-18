'use client';

// app/providers.tsx
// Client-side providers wrapper with hydration handling

import { useEffect, useState } from 'react';
import { AuthProvider } from '@/lib/auth';
import { useUserStore, useChatStore } from '@/lib/store';

/**
 * Cleans up any Mermaid error elements that may have been
 * inserted into the DOM by failed diagram renders.
 */
function MermaidCleanup() {
  useEffect(() => {
    const cleanup = () => {
      // Remove any SVGs containing Mermaid syntax errors
      document.querySelectorAll('svg').forEach((el) => {
        if (el.textContent?.includes('Syntax error')) {
          el.parentElement?.remove();
        }
      });
      // Remove any orphaned Mermaid containers with errors
      document.querySelectorAll('div').forEach((el) => {
        if (
          el.textContent?.includes('Syntax error') &&
          el.textContent?.includes('mermaid') &&
          !el.closest('.diagram-container')
        ) {
          el.remove();
        }
      });
    };

    // Run cleanup on mount and after a short delay (for async renders)
    cleanup();
    const timer = setTimeout(cleanup, 500);

    return () => clearTimeout(timer);
  }, []);

  return null;
}

/**
 * Handles Zustand store rehydration on client mount.
 * This ensures persisted state is loaded from localStorage
 * only after the initial render to avoid hydration mismatches.
 */
function StoreHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Rehydrate stores on mount
    const unsubUser = useUserStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    // Trigger rehydration
    useUserStore.persist.rehydrate();
    useChatStore.persist.rehydrate();

    return () => {
      unsubUser();
    };
  }, []);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StoreHydration />
      <MermaidCleanup />
      {children}
    </AuthProvider>
  );
}
