import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.18] dark:opacity-[0.10]"
        style={{
          backgroundImage:
            'linear-gradient(to right, hsl(var(--foreground) / 0.08) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.08) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Aurora blobs */}
      <motion.div
        className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-50 dark:opacity-40 animate-aurora-1"
        style={{
          background:
            'radial-gradient(circle at center, hsl(var(--primary) / 0.55), transparent 65%)',
        }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-50 dark:opacity-40 animate-aurora-2"
        style={{
          background:
            'radial-gradient(circle at center, hsl(var(--accent) / 0.55), transparent 65%)',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-40 dark:opacity-30 animate-aurora-3"
        style={{
          background:
            'radial-gradient(circle at center, hsl(200 95% 60% / 0.45), transparent 65%)',
        }}
      />
    </div>
  );
}
