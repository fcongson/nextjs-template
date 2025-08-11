/**
 * Tests for useMounted hook
 */

import { renderHook, waitFor } from '@testing-library/react';
import { useMounted } from './use-mounted';

describe('useMounted', () => {
  it('eventually returns true after mount', async () => {
    const { result } = renderHook(() => useMounted());

    // Wait for the useEffect to run and set mounted to true
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('maintains mounted state after rerenders', async () => {
    const { result, rerender } = renderHook(() => useMounted());

    // Wait for initial mount
    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    // Additional rerenders should maintain true
    rerender();
    expect(result.current).toBe(true);
  });
});
