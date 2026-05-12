import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees on each axis. */
  tilt?: number;
  /** Show a cursor-following spotlight glow. */
  spotlight?: boolean;
  /** Optional inline style passthrough. */
  style?: CSSProperties;
  as?: 'div' | 'article' | 'li';
}

/**
 * Card wrapper that adds 3D tilt + a cursor-tracked spotlight on hover.
 * Falls back gracefully on touch / reduced-motion (CSS handles the rest).
 */
export function InteractiveCard({
  children,
  className,
  tilt = 6,
  spotlight = true,
  style,
  as = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const active = useMotionValue(0);

  const sx = useSpring(px, { stiffness: 220, damping: 22, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 220, damping: 22, mass: 0.5 });
  const sActive = useSpring(active, { stiffness: 180, damping: 24 });

  const rotateY = useTransform(sx, [0, 1], [-tilt, tilt]);
  const rotateX = useTransform(sy, [0, 1], [tilt, -tilt]);
  const mxPct = useTransform(sx, (v) => `${v * 100}%`);
  const myPct = useTransform(sy, (v) => `${v * 100}%`);
  const spotlightBg = useMotionTemplate`radial-gradient(320px circle at ${mxPct} ${myPct}, hsl(var(--primary) / 0.22), transparent 60%)`;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const handleEnter = () => active.set(1);
  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
    active.set(0);
  };

  const MotionTag = (motion[as] as typeof motion.div) ?? motion.div;

  return (
    <MotionTag
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        ...style,
      }}
      className={cn(
        'relative will-change-transform [transform-style:preserve-3d]',
        className,
      )}
    >
      {spotlight && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: spotlightBg, opacity: sActive }}
        />
      )}
      <div className="relative h-full [transform:translateZ(20px)]">{children}</div>
    </MotionTag>
  );
}
