import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Command {
  id: string;
  label: string;
  hint?: string;
  action: () => void;
  section?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const commands: Command[] = [
    { id: 'expertise', label: 'expertise', hint: 'jump to', action: () => scrollTo('expertise'), section: 'navigate' },
    { id: 'projects', label: 'projects', hint: 'jump to', action: () => scrollTo('projects'), section: 'navigate' },
    { id: 'journey', label: 'journey', hint: 'jump to', action: () => scrollTo('journey'), section: 'navigate' },
    { id: 'certifications', label: 'certifications', hint: 'jump to', action: () => scrollTo('certifications'), section: 'navigate' },
    { id: 'interests', label: 'interests', hint: 'jump to', action: () => scrollTo('interests'), section: 'navigate' },
    { id: 'contact', label: 'contact', hint: 'jump to', action: () => scrollTo('contact'), section: 'navigate' },
    { id: 'github', label: 'open_github', hint: 'external', action: () => window.open('https://github.com/PrakashSewani', '_blank'), section: 'links' },
    { id: 'linkedin', label: 'linkedin', hint: 'external', action: () => window.open('https://www.linkedin.com/in/prakash-s-2a389721a/', '_blank'), section: 'links' },
    { id: 'resume', label: 'view_resume', hint: 'external', action: () => window.open('https://prakashsewaniresume.tiiny.site', '_blank'), section: 'links' },
    { id: 'email', label: 'copy_email', hint: 'clipboard', action: () => copyToClipboard('contact@prakashsewani.com'), section: 'actions' },
    { id: 'phone', label: 'copy_phone', hint: 'clipboard', action: () => copyToClipboard('+918850260072'), section: 'actions' },
    { id: 'top', label: 'scroll_to_top', hint: 'navigate', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }), section: 'navigate' },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`copied: ${text}`);
    } catch {
      showToast('copy failed');
    }
    onClose();
  };

  const showToast = (message: string) => {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault();
        filtered[activeIndex].action();
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [filtered, activeIndex, onClose]
  );

  // Global keyboard listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Dispatch a custom event that App listens to
          window.dispatchEvent(new CustomEvent('toggle-cmd-palette'));
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Scroll active result into view
  useEffect(() => {
    const active = resultsRef.current?.children[activeIndex] as HTMLElement;
    active?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="cmd-backdrop"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="cmd-modal"
          >
            <div className="cmd-input-wrapper">
              <span className="cmd-prompt">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                className="cmd-input"
                placeholder="type a command..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            <div className="cmd-results" ref={resultsRef}>
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-ink-subtle text-xs uppercase tracking-widest">
                  no results
                </div>
              ) : (
                filtered.map((cmd, i) => (
                  <div
                    key={cmd.id}
                    className={`cmd-result ${i === activeIndex ? 'cmd-result-active' : ''}`}
                    onClick={() => cmd.action()}
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    <span className="cmd-result-label">{cmd.label}</span>
                    <span className="cmd-result-hint">{cmd.hint}</span>
                  </div>
                ))
              )}
            </div>

            <div className="cmd-footer">
              <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
              <span><kbd>esc</kbd> close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
