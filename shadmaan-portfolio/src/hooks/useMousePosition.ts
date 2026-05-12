import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * Tracks the global mouse position as motion values.
 * - `x`, `y`: raw client coordinates (springed for smoothness).
 * - `nx`, `ny`: normalized to viewport, range [-0.5, 0.5] (0 at center).
 *
 * Disabled for users with `prefers-reduced-motion` (values stay at 0).
 */
export function useMousePosition() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });
  const snx = useSpring(nx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sny = useSpring(ny, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      nx.set(e.clientX / window.innerWidth - 0.5);
      ny.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y, nx, ny]);

  return { x: sx, y: sy, nx: snx, ny: sny };
}
