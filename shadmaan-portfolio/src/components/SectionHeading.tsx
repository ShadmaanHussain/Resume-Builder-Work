import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  eyebrow?: string;
  /** Two-digit section index, e.g. "02". Renders an indexed rail above the title. */
  index?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  subtitle,
  className,
  align = 'left',
}: Props) {
  const centered = align === 'center';
  return (
    <div
      className={cn(
        'mb-14',
        centered ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl',
        className,
      )}
    >
      {(index || eyebrow) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className={cn(
            'flex items-center gap-4 mb-4',
            centered && 'justify-center',
          )}
        >
          {index && (
            <span className="font-mono text-xs sm:text-sm text-primary/80">
              {index}
            </span>
          )}
          <span
            className={cn(
              'h-px bg-gradient-to-r from-primary/60 to-transparent',
              centered ? 'w-16' : 'flex-1 max-w-[5rem]',
            )}
          />
          {eyebrow && (
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {eyebrow}
            </span>
          )}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={cn(
            'mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed',
            !centered && 'flex gap-3',
          )}
        >
          {!centered && (
            <span aria-hidden className="font-mono text-primary/70 select-none">
              &gt;
            </span>
          )}
          <span>{subtitle}</span>
        </motion.p>
      )}
    </div>
  );
}
