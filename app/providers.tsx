'use client';

// app/providers.tsx
// Client-side providers wrapper with hydration handling

import { useEffect, useState } from 'react';
import { AuthProvider } from '@/lib/auth';
import { useUserStore, useChatStore } from '@/lib/store';

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
      {children}
    </AuthProvider>
  );
}
