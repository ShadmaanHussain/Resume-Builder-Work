import { motion } from 'framer-motion';
import { activeResume } from '@/config/variant';
import { SectionHeading } from '@/components/SectionHeading';
import { InteractiveCard } from '@/components/InteractiveCard';

export function Skills() {
  const { skills } = activeResume;

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="04"
          eyebrow="Skills"
          title="My toolbox"
          subtitle="Languages, frameworks, and platforms I work with day-to-day."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: gi * 0.05 }}
            >
              <InteractiveCard tilt={5} className="rounded-2xl glass p-6 sm:p-7">
              <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-3">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                  }}
                />
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.3,
                      delay: 0.15 + i * 0.025,
                      ease: 'easeOut',
                    }}
                    whileHover={{ y: -3 }}
                    className="inline-flex items-center rounded-full border border-border/80 bg-background/40 px-3 py-1 text-xs sm:text-sm font-medium text-foreground/90 hover:border-primary/60 hover:text-primary hover:shadow-md hover:shadow-primary/10 transition-all"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
