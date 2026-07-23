import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Command, Menu, Moon, Sun, X } from 'lucide-react';
import { WORKSPACES, type Theme, type WorkspaceId } from '../App';
import { profile } from '../data/portfolio';

interface NavbarProps {
  onOpenCmd: () => void;
  activeWorkspace: WorkspaceId;
  onWorkspaceChange: (id: WorkspaceId) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export default function Navbar({ onOpenCmd, activeWorkspace, onWorkspaceChange, theme, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const goTo = (id: WorkspaceId) => {
    setOpen(false);
    onWorkspaceChange(id);
  };

  return (
    <header className="site-header">
      <button className="wordmark" onClick={() => goTo('home')} aria-label="Go to introduction">
        <span>PS</span>
        <strong>Prakash Sewani</strong>
        <small>Senior Engineer</small>
      </button>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {WORKSPACES.slice(1).map((item) => (
          <button
            key={item.id}
            className={activeWorkspace === item.id ? 'active' : ''}
            onClick={() => goTo(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button
          className="theme-button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <motion.span
            key={theme}
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </motion.span>
          <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
        <button id="cmd-trigger" className="command-button" onClick={onOpenCmd} aria-label="Open command palette">
          <Command size={15} /> <span>⌘ K</span>
        </button>
        <a className="resume-button" href={profile.resume} target="_blank" rel="noreferrer">
          Résumé <ArrowUpRight size={15} />
        </a>
        <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {WORKSPACES.map((item, index) => (
              <button key={item.id} onClick={() => goTo(item.id)}>
                <span>0{index + 1}</span>{item.label}
              </button>
            ))}
            <a href={profile.resume} target="_blank" rel="noreferrer">Open résumé <ArrowUpRight /></a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
