import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { activeResume } from '@/config/variant';
import { ResumeDownloadButton } from '@/components/ResumeDownloadButton';
import { useMousePosition } from '@/hooks/useMousePosition';

const letterVariants = {
  hidden: { y: '110%', opacity: 0, rotate: 6 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { delay: 0.4 + i * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

/** Pulls a flat list of marquee chips from the resume's skill groups. */
function getMarqueeItems(): string[] {
  const items: string[] = [];
  for (const group of activeResume.skills) {
    for (const item of group.items) {
      if (!items.includes(item)) items.push(item);
      if (items.length >= 18) break;
    }
    if (items.length >= 18) break;
  }
  return items;
}

/** Builds a rotating list of role descriptors from the title. */
function getRotatingRoles(title: string): string[] {
  const split = title
    .split(/[·•|,/]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return split.length > 1 ? split : [title];
}

export function Hero() {
  const { name, title, tagline, contact } = activeResume;
  const [first, ...rest] = name.split(' ');
  const last = rest.join(' ');

  const reduce = useReducedMotion();
  const { nx, ny } = useMousePosition();

  // Subtle name parallax — only when motion is allowed.
  const nameX = useTransform(nx, (v) => (reduce ? 0 : v * -18));
  const nameY = useTransform(ny, (v) => (reduce ? 0 : v * -12));
  const orbX = useTransform(nx, (v) => (reduce ? 0 : v * 40));
  const orbY = useTransform(ny, (v) => (reduce ? 0 : v * 28));

  const roles = getRotatingRoles(title);
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    if (roles.length <= 1) return;
    const t = window.setInterval(
      () => setRoleIdx((i) => (i + 1) % roles.length),
      2600,
    );
    return () => window.clearInterval(t);
  }, [roles.length]);

  const marquee = getMarqueeItems();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col pt-28 pb-20 overflow-hidden"
    >
      {/* Decorative side rail */}
      <div
        aria-hidden
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 text-[10px] uppercase tracking-[0.35em] text-muted-foreground/70"
      >
        <span className="h-24 w-px bg-gradient-to-b from-transparent via-foreground/30 to-transparent" />
        <span className="[writing-mode:vertical-rl] rotate-180">Scroll</span>
        <span className="h-24 w-px bg-gradient-to-b from-transparent via-foreground/30 to-transparent" />
      </div>

      {/* Decorative corner brackets */}
      <CornerBrackets />

      {/* Slow rotating ring behind the name */}
      <motion.div
        aria-hidden
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none absolute top-[28%] left-[8%] hidden md:block will-change-transform"
      >
        <div className="relative h-[28rem] w-[28rem] animate-spin-slow opacity-50 dark:opacity-40">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'conic-gradient(from 90deg, transparent 0%, hsl(var(--primary) / 0.35) 25%, transparent 50%, hsl(var(--accent) / 0.35) 75%, transparent 100%)',
              mask: 'radial-gradient(circle, transparent 55%, black 56%, black 60%, transparent 61%)',
              WebkitMask:
                'radial-gradient(circle, transparent 55%, black 56%, black 60%, transparent 61%)',
            }}
          />
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-12 flex-1 flex flex-col justify-center">
        {/* Indexed eyebrow row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-4"
        >
          <span className="font-mono text-xs sm:text-sm text-primary/80">01</span>
          <span className="h-px flex-1 max-w-[5rem] bg-gradient-to-r from-primary/60 to-transparent" />
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Introduction
          </span>
        </motion.div>

        {/* Status pill */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-5 self-start inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs sm:text-sm font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Available for new opportunities
          <Sparkles className="h-3.5 w-3.5 text-primary/80" />
        </motion.p>

        {/* Name */}
        <motion.h1
          style={{ x: nameX, y: nameY }}
          className="relative mt-6 font-display font-bold tracking-tight text-5xl sm:text-7xl lg:text-[8.5rem] leading-[0.9] will-change-transform"
        >
          {/* Glow blob behind text */}
          <span
            aria-hidden
            className="absolute -inset-x-8 -inset-y-6 -z-10 blur-3xl opacity-60 dark:opacity-50"
            style={{
              background:
                'radial-gradient(60% 60% at 30% 50%, hsl(var(--primary) / 0.35), transparent 70%), radial-gradient(60% 60% at 80% 50%, hsl(var(--accent) / 0.35), transparent 70%)',
            }}
          />

          <span className="block overflow-hidden">
            <span className="inline-flex">
              {first.split('').map((c, i) => (
                <HoverLetter key={`f-${i}`} char={c} index={i} />
              ))}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="inline-flex gradient-text">
              {last.split('').map((c, i) => (
                <HoverLetter
                  key={`l-${i}`}
                  char={c}
                  index={i + first.length}
                  gradient
                />
              ))}
            </span>
          </span>
        </motion.h1>

        {/* Rotating role line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-7 flex items-center gap-3 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl"
        >
          <span className="hidden sm:inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_2px_hsl(var(--primary)/0.6)]" />
          <span className="font-mono text-sm sm:text-base text-primary/80">&gt;</span>
          <span className="relative inline-flex min-h-[1.4em] flex-1 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={roles[roleIdx]}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-110%', opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-foreground/90"
              >
                {roles[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-3 text-sm sm:text-base text-muted-foreground/80 max-w-2xl"
        >
          {tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <ResumeDownloadButton />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold hover:bg-card/80 transition-colors"
          >
            Get in touch
          </a>
          <div className="ml-1 flex items-center gap-1">
            {[
              { href: contact.github, Icon: Github, label: 'GitHub' },
              { href: contact.linkedin, Icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${contact.email}`, Icon: Mail, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                className="h-10 w-10 rounded-full glass grid place-items-center hover:scale-110 hover:text-primary transition-all"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Stat strip */}
        {activeResume.stats && activeResume.stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.35 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm"
          >
            {activeResume.stats.slice(0, 4).map((s, i) => (
              <div key={s.label} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="hidden sm:inline-block h-4 w-px bg-border" />
                )}
                <span className="font-display text-xl font-bold gradient-text">
                  {s.value}
                </span>
                <span className="text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Skills marquee */}
      {marquee.length > 0 && (
        <div
          aria-hidden
          className="relative mt-16 sm:mt-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex gap-3 whitespace-nowrap animate-marquee"
            style={{ width: 'max-content' }}
          >
            {[...marquee, ...marquee].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      )}

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="mt-10 self-center flex flex-col items-center gap-1 text-muted-foreground/70 hover:text-foreground transition-colors"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="grid place-items-center"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}

/** A single hero letter with hover micro-interaction. */
function HoverLetter({
  char,
  index,
  gradient = false,
}: {
  char: string;
  index: number;
  gradient?: boolean;
}) {
  if (char === ' ') {
    return <span className="inline-block w-[0.35em]">&nbsp;</span>;
  }
  return (
    <motion.span
      custom={index}
      variants={letterVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -10,
        scale: 1.08,
        transition: { type: 'spring', stiffness: 300, damping: 14 },
      }}
      className={
        'inline-block cursor-default transition-colors ' +
        (gradient ? '' : 'hover:text-primary')
      }
    >
      {char}
    </motion.span>
  );
}

function CornerBrackets() {
  const cls =
    'pointer-events-none absolute h-10 w-10 border-primary/40 hidden md:block';
  return (
    <>
      <span aria-hidden className={`${cls} top-24 left-4 border-l border-t`} />
      <span aria-hidden className={`${cls} top-24 right-4 border-r border-t`} />
      <span aria-hidden className={`${cls} bottom-6 left-4 border-l border-b`} />
      <span aria-hidden className={`${cls} bottom-6 right-4 border-r border-b`} />
    </>
  );
}
