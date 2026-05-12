import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { activeResume } from '@/config/variant';
import { ResumeDownloadButton } from '@/components/ResumeDownloadButton';

const letterVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.4 + i * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  const { name, title, tagline, contact } = activeResume;
  const [first, ...rest] = name.split(' ');
  const last = rest.join(' ');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-20"
    >
      <div className="mx-auto max-w-6xl w-full px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs sm:text-sm font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Available for new opportunities
        </motion.p>

        <h1 className="mt-6 font-display font-bold tracking-tight text-5xl sm:text-7xl lg:text-8xl leading-[0.95]">
          <span className="block overflow-hidden">
            <span className="inline-flex">
              {first.split('').map((c, i) => (
                <motion.span
                  key={`f-${i}`}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="inline-flex gradient-text">
              {last.split('').map((c, i) => (
                <motion.span
                  key={`l-${i}`}
                  custom={i + first.length}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {c}
                </motion.span>
              ))}
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl"
        >
          {title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-2 text-sm sm:text-base text-muted-foreground/80"
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
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

        <motion.a
          href="#about"
          aria-label="Scroll to about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="grid place-items-center"
          >
            <ArrowDown className="h-5 w-5" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
