import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { activeResume } from '@/config/variant';
import { SectionHeading } from '@/components/SectionHeading';
import { ResumeDownloadButton } from '@/components/ResumeDownloadButton';

export function Footer() {
  const { contact, name } = activeResume;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const socials = [
    { href: contact.github, Icon: Github, label: 'GitHub' },
    { href: contact.linkedin, Icon: Linkedin, label: 'LinkedIn' },
    { href: `mailto:${contact.email}`, Icon: Mail, label: 'Email' },
    { href: `tel:${contact.phone.replace(/\s+/g, '')}`, Icon: Phone, label: 'Phone' },
  ];

  return (
    <footer id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something."
          subtitle="Open to roles, collaborations, and interesting problems. The fastest way to reach me is below."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl rounded-3xl glass p-8 sm:p-10 text-center"
        >
          <button
            type="button"
            onClick={copyEmail}
            className="group inline-flex items-center gap-3 rounded-full px-5 py-3 text-base sm:text-lg font-semibold border border-border hover:border-primary/60 transition-colors"
          >
            <Mail className="h-5 w-5 text-primary" />
            <span className="gradient-text">{contact.email}</span>
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </button>

          {contact.location && (
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {contact.location}
            </p>
          )}

          <div className="mt-8 flex items-center justify-center gap-3">
            {socials.map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-12 w-12 rounded-full grid place-items-center border border-border hover:border-primary/60 hover:text-primary transition-colors"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <ResumeDownloadButton />
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {name}. Crafted with React, Tailwind & Framer
            Motion.
          </p>
          <p className="opacity-70">Designed & built for the curious.</p>
        </div>
      </div>
    </footer>
  );
}
