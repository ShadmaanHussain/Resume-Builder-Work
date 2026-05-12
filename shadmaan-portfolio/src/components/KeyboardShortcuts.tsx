import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, X } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { activeResume } from '@/config/variant';
import { cn } from '@/lib/utils';

const SECTIONS = ['hero', 'about', 'experience', 'skills', 'contact'] as const;
type SectionId = (typeof SECTIONS)[number];

const GO_MAP: Record<string, SectionId> = {
  h: 'hero',
  a: 'about',
  e: 'experience',
  s: 'skills',
  c: 'contact',
};

const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ['G', 'H'], label: 'Go to Hero' },
  { keys: ['G', 'A'], label: 'Go to About' },
  { keys: ['G', 'E'], label: 'Go to Experience' },
  { keys: ['G', 'S'], label: 'Go to Skills' },
  { keys: ['G', 'C'], label: 'Go to Contact' },
  { keys: ['J'], label: 'Next section' },
  { keys: ['K'], label: 'Previous section' },
  { keys: ['T'], label: 'Toggle theme' },
  { keys: ['R'], label: 'Download resume' },
  { keys: ['?'], label: 'Show this help' },
  { keys: ['Esc'], label: 'Close dialog' },
];

function isTypingTarget(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  if (!el) return false;
  if (el.isContentEditable) return true;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
}

function scrollToSection(id: SectionId) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function currentSectionIndex(): number {
  const mid = window.scrollY + window.innerHeight * 0.35;
  let best = 0;
  for (let i = 0; i < SECTIONS.length; i += 1) {
    const el = document.getElementById(SECTIONS[i]);
    if (!el) continue;
    const top = el.offsetTop;
    if (top <= mid) best = i;
  }
  return best;
}

export function KeyboardShortcuts() {
  const { toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [hintShown, setHintShown] = useState(false);
  const [awaitingGo, setAwaitingGo] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // First-visit subtle hint about the help shortcut.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = window.localStorage.getItem('shadmaan-portfolio-keys-hint');
    if (seen) return;
    const t = window.setTimeout(() => {
      setShowHint(true);
      setHintShown(true);
    }, 1800);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!hintShown) return;
    const t = window.setTimeout(() => setShowHint(false), 6000);
    return () => window.clearTimeout(t);
  }, [hintShown]);

  const dismissHint = useCallback(() => {
    setShowHint(false);
    try {
      window.localStorage.setItem('shadmaan-portfolio-keys-hint', '1');
    } catch {
      /* ignore */
    }
  }, []);

  const downloadResume = useCallback(() => {
    const a = document.createElement('a');
    a.href = activeResume.resumePdfPath;
    a.download = activeResume.resumePdfPath.split('/').pop() ?? 'resume.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, []);

  useEffect(() => {
    let goTimer: number | undefined;

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      const key = e.key;

      if (key === 'Escape') {
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        if (awaitingGo) setAwaitingGo(false);
        return;
      }

      // ? opens help (Shift+/ on US layouts)
      if (key === '?' || (e.shiftKey && key === '/')) {
        e.preventDefault();
        setOpen((v) => !v);
        dismissHint();
        return;
      }

      if (open) return;

      const lower = key.toLowerCase();

      if (awaitingGo) {
        const target = GO_MAP[lower];
        if (target) {
          e.preventDefault();
          scrollToSection(target);
        }
        setAwaitingGo(false);
        if (goTimer) window.clearTimeout(goTimer);
        return;
      }

      if (lower === 'g') {
        e.preventDefault();
        setAwaitingGo(true);
        goTimer = window.setTimeout(() => setAwaitingGo(false), 1200);
        return;
      }

      if (lower === 't') {
        e.preventDefault();
        toggleTheme();
        return;
      }

      if (lower === 'r') {
        e.preventDefault();
        downloadResume();
        return;
      }

      if (lower === 'j') {
        e.preventDefault();
        const i = currentSectionIndex();
        scrollToSection(SECTIONS[Math.min(SECTIONS.length - 1, i + 1)]);
        return;
      }

      if (lower === 'k') {
        e.preventDefault();
        const i = currentSectionIndex();
        scrollToSection(SECTIONS[Math.max(0, i - 1)]);
        return;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (goTimer) window.clearTimeout(goTimer);
    };
  }, [open, awaitingGo, toggleTheme, downloadResume, dismissHint]);

  return (
    <>
      {/* "g …" indicator */}
      <AnimatePresence>
        {awaitingGo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full glass px-4 py-2 text-xs font-medium shadow-lg"
          >
            <span className="text-muted-foreground">Press</span>{' '}
            <Kbd>H</Kbd> <Kbd>A</Kbd> <Kbd>E</Kbd> <Kbd>S</Kbd> <Kbd>C</Kbd>{' '}
            <span className="text-muted-foreground">to jump…</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* First-visit hint */}
      <AnimatePresence>
        {showHint && !open && (
          <motion.button
            type="button"
            onClick={() => {
              setOpen(true);
              dismissHint();
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 right-6 z-50 hidden md:inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium shadow-lg hover:text-primary transition-colors"
          >
            <Command className="h-3.5 w-3.5" />
            Press <Kbd>?</Kbd> for shortcuts
          </motion.button>
        )}
      </AnimatePresence>

      {/* Help dialog */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-background/60 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard shortcuts"
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl glass p-6 shadow-2xl shadow-primary/10"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold flex items-center gap-2">
                  <Command className="h-4 w-4 text-primary" />
                  Keyboard shortcuts
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="h-8 w-8 grid place-items-center rounded-full hover:bg-card transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <ul className="mt-4 divide-y divide-border/60">
                {SHORTCUTS.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between py-2 text-sm"
                  >
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="flex items-center gap-1">
                      {s.keys.map((k, i) => (
                        <span key={i} className="flex items-center gap-1">
                          {i > 0 && (
                            <span className="text-muted-foreground/60 text-[10px]">
                              then
                            </span>
                          )}
                          <Kbd>{k}</Kbd>
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-xs text-muted-foreground">
                Tip: shortcuts ignore typing inside form fields.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        'inline-grid min-w-[1.6rem] place-items-center rounded-md border border-border bg-card/70 px-1.5 py-0.5',
        'font-sans text-[11px] font-semibold text-foreground shadow-sm',
        className,
      )}
    >
      {children}
    </kbd>
  );
}
