/**
 * Hook to handle client-side mounting
 * Useful for avoiding hydration mismatches
 */

import { useEffect, useState } from 'react';

export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
