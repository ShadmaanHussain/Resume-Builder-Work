import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * A soft blob that follows the cursor, plus a small precise dot.
 * Hidden on touch devices and when reduced-motion is requested.
 * Scales up when hovering interactive elements (a, button, [role="button"]).
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, summary, [data-cursor="hover"]',
      );
      setHovering(interactive);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      x.set(-200);
      y.set(-200);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointerleave', onLeave, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Soft glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[60] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen dark:mix-blend-screen blur-3xl"
        style={{
          x: sx,
          y: sy,
          background:
            'radial-gradient(circle at center, hsl(var(--primary) / 0.45), hsl(var(--accent) / 0.25) 40%, transparent 70%)',
          opacity: hovering ? 0.9 : 0.55,
          scale: pressed ? 0.85 : hovering ? 1.15 : 1,
          transition: 'opacity 200ms ease, scale 200ms ease',
        }}
      />
      {/* Precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[60] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x,
          y,
          width: hovering ? 36 : 8,
          height: hovering ? 36 : 8,
          border: hovering ? '1.5px solid hsl(var(--primary) / 0.7)' : 'none',
          backgroundColor: hovering ? 'transparent' : 'hsl(var(--primary) / 0.9)',
          transition: 'width 180ms ease, height 180ms ease, background-color 180ms ease, border 180ms ease',
        }}
      />
    </>
  );
}
