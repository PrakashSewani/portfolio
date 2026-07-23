import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WORKSPACES, type WorkspaceId } from '../App';
import { profile } from '../data/portfolio';

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
  activeWorkspace: WorkspaceId;
  onWorkspaceChange?: (id: WorkspaceId) => void;
}

const toast = (message: string) => {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
};

const getUptimeDays = () => {
  const start = new Date('2022-07-01');
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

export default function CommandPalette({ isOpen, onClose, onWorkspaceChange }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const listboxId = 'cmd-results-list';

  const commands: Command[] = useMemo(() => {
    const nav = WORKSPACES.map((ws) => ({
      id: ws.id,
      label: ws.label,
      hint: 'workspace',
      action: () => {
        onWorkspaceChange?.(ws.id);
        document.getElementById(ws.id)?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      section: 'workspaces',
    }));

    return [
      ...nav,
      { id: 'whoami', label: 'whoami', hint: 'identity', action: () => { document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); onClose(); toast('prakash_sewani // senior_software_engineer'); }, section: 'shell' },
      { id: 'uptime', label: 'uptime', hint: 'career days', action: () => { toast(`uptime: ${getUptimeDays()} days`); onClose(); }, section: 'shell' },
      { id: 'clear', label: 'clear', hint: 'scroll top', action: () => { window.scrollTo({ top: 0, behavior: 'smooth' }); onClose(); }, section: 'shell' },
      { id: 'github', label: 'open_github', hint: 'external', action: () => window.open(profile.github, '_blank'), section: 'links' },
      { id: 'linkedin', label: 'linkedin', hint: 'external', action: () => window.open(profile.linkedin, '_blank'), section: 'links' },
      { id: 'resume', label: 'view_resume', hint: 'external', action: () => window.open(profile.resume, '_blank'), section: 'links' },
      { id: 'email', label: 'copy_email', hint: 'clipboard', action: async () => { try { await navigator.clipboard.writeText(profile.email); toast(`copied: ${profile.email}`); } catch { toast('copy failed'); } onClose(); }, section: 'actions' },
    ];
  }, [onClose, onWorkspaceChange]);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

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
              <span className="cmd-prompt">PS /</span>
              <input
                ref={inputRef}
                type="text"
                className="cmd-input"
                placeholder="Jump to work or open a link..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                spellCheck={false}
                role="combobox"
                aria-autocomplete="list"
                aria-controls={listboxId}
                aria-activedescendant={filtered[activeIndex] ? `cmd-item-${filtered[activeIndex].id}` : undefined}
                aria-expanded={filtered.length > 0}
              />
            </div>

            <div
              id={listboxId}
              className="cmd-results"
              ref={resultsRef}
              role="listbox"
              aria-label="Command results"
            >
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-ink-subtle text-xs uppercase tracking-widest">
                  no results
                </div>
              ) : (
                filtered.map((cmd, i) => (
                  <div
                    key={cmd.id}
                    id={`cmd-item-${cmd.id}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    tabIndex={-1}
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
