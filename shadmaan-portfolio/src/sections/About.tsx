import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { activeResume } from '@/config/variant';
import { SectionHeading } from '@/components/SectionHeading';
import { InteractiveCard } from '@/components/InteractiveCard';

function StatCounter({ value, label }: { value: string; label: string }) {
  // Try to parse a leading numeric portion (e.g. "2+" or "$1M+")
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (n) => Math.round(n).toString());

  useEffect(() => {
    if (inView && match) mv.set(Number(match[2]));
  }, [inView, mv, match]);

  return (
    <InteractiveCard tilt={8} className="rounded-2xl glass p-5">
      <div ref={ref}>
        <div className="font-display text-3xl sm:text-4xl font-bold gradient-text">
          {match ? (
            <span>
              {match[1]}
              <motion.span>{display}</motion.span>
              {match[3]}
            </span>
          ) : (
            value
          )}
        </div>
        <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{label}</div>
      </div>
    </InteractiveCard>
  );
}

export function About() {
  const { about, summary, stats, name } = activeResume;
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="02"
          eyebrow="About"
          title="A quick introduction"
          subtitle={about}
        />

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-[2rem] opacity-60 blur-2xl"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                }}
              />
              <div
                className="relative grid h-56 w-56 sm:h-64 sm:w-64 place-items-center rounded-[2rem] text-6xl sm:text-7xl font-display font-bold text-white"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                }}
              >
                {initials}
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-3 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="text-base sm:text-lg leading-relaxed text-muted-foreground"
            >
              {summary}
            </motion.p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                >
                  <StatCounter value={s.value} label={s.label} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
