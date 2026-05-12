import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { activeResume } from '@/config/variant';
import { SectionHeading } from '@/components/SectionHeading';

export function Experience() {
  const { experience } = activeResume;

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've been building"
          subtitle="Production work shipped with Microsoft engineering teams and enterprise customers."
        />

        <div className="relative">
          {/* vertical line */}
          <div
            aria-hidden
            className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent"
          />

          <div className="space-y-12">
            {experience.map((item, idx) => {
              const onLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={`${item.company}-${idx}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="relative grid sm:grid-cols-2 gap-6 sm:gap-12 items-start"
                >
                  {/* dot */}
                  <span
                    aria-hidden
                    className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-3 h-4 w-4 rounded-full ring-4 ring-background"
                    style={{
                      backgroundImage:
                        'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                    }}
                  />

                  <div
                    className={
                      onLeft
                        ? 'sm:col-start-1 sm:pr-10 sm:text-right pl-12 sm:pl-0'
                        : 'sm:col-start-2 sm:pl-10 pl-12'
                    }
                  >
                    <div className="rounded-2xl glass p-6 sm:p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <Briefcase className="h-3.5 w-3.5" />
                        {item.period}
                      </div>
                      <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold">
                        {item.role}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.company} · {item.location}
                      </p>
                      <ul
                        className={`mt-4 space-y-2.5 text-sm leading-relaxed ${
                          onLeft ? 'sm:text-right' : ''
                        }`}
                      >
                        {item.bullets.map((b, i) => (
                          <li
                            key={i}
                            className="text-muted-foreground/95 relative pl-4 sm:pl-0"
                          >
                            <span
                              className={`absolute top-2 ${
                                onLeft
                                  ? 'left-0 sm:left-auto sm:right-[-0.9rem]'
                                  : 'left-0 sm:-left-4'
                              } h-1.5 w-1.5 rounded-full bg-primary`}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
