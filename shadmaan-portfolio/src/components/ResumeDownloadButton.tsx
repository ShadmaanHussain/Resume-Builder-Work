import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { activeResume } from '@/config/variant';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  variant?: 'solid' | 'ghost';
  label?: string;
}

export function ResumeDownloadButton({
  className,
  variant = 'solid',
  label = 'Download Resume',
}: Props) {
  const pdfPath = activeResume.resumePdfPath.replace(/^\//, '');
  const href = import.meta.env.BASE_URL + pdfPath;
  const fileName = pdfPath.split('/').pop() ?? 'resume.pdf';
  const isSolid = variant === 'solid';

  return (
    <motion.a
      href={href}
      download={fileName}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      className={cn(
        'group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'transition-shadow',
        isSolid
          ? 'text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50'
          : 'glass hover:bg-card/80',
        className,
      )}
      style={
        isSolid
          ? {
              backgroundImage:
                'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
            }
          : undefined
      }
    >
      <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
      {label}
    </motion.a>
  );
}
