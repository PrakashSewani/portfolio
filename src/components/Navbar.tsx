import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Command, Terminal } from 'lucide-react';
import { isMacOs } from 'react-device-detect';
import { WORKSPACES, type WorkspaceId } from '../App';

interface NavbarProps {
  onOpenCmd?: () => void;
  activeWorkspace: WorkspaceId;
  onWorkspaceChange?: (id: WorkspaceId) => void;
}

export default function Navbar({ onOpenCmd, activeWorkspace, onWorkspaceChange }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col bg-base/95 border-b border-border backdrop-blur-md">
      <div className="flex items-center justify-between px-4 md:px-6 h-14 relative z-[70]">
        {/* Logo / PSX */}
        <div className="flex items-center gap-3 min-w-0">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onWorkspaceChange?.('home');
            }}
            className="flex items-center gap-2 text-ink hover:text-accent transition-colors"
            aria-label="Home workspace"
          >
            <Terminal size={16} className="text-accent" />
            <span className="font-mono text-xs tracking-tighter uppercase font-bold text-ink hidden sm:inline">
              psx
            </span>
          </a>
          <span className="hidden sm:block h-4 w-px bg-border" />
          <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-ink-dim hidden md:inline truncate">
            prakash_sewani
          </span>
        </div>

        {/* Desktop Workspaces */}
        <div className="hidden md:flex items-center gap-1">
          {WORKSPACES.map((ws) => (
            <a
              key={ws.id}
              href={ws.href}
              onClick={(e) => {
                e.preventDefault();
                onWorkspaceChange?.(ws.id);
              }}
              className={`relative px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold transition-colors font-mono rounded-sm ${
                activeWorkspace === ws.id
                  ? 'text-accent bg-accent-dim'
                  : 'text-ink-dim hover:text-ink hover:bg-surface-hover'
              }`}
            >
              {ws.label}
              {activeWorkspace === ws.id && (
                <motion.div
                  layoutId="activeWorkspace"
                  className="absolute inset-0 border border-accent/40 rounded-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 bg-success animate-pulse" />
            <span className="text-[10px] font-mono uppercase text-ink-dim tracking-widest">
              ready_for_hire
            </span>
          </div>

          {/* Command Palette Trigger */}
          <button
            id="cmd-trigger"
            onClick={onOpenCmd}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-surface border border-border text-ink-dim hover:text-ink hover:border-border-hover transition-all font-mono text-[10px] uppercase tracking-widest"
            aria-label="Open command palette"
          >
            <Command size={14} />
            <span className="hidden sm:inline">{isMacOs ? '⌘K' : 'Ctrl K'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center bg-surface border border-border text-ink-dim hover:text-ink transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden overflow-hidden border-t border-border bg-base"
        >
          <div className="flex flex-col gap-1 p-4">
            {WORKSPACES.map((ws, index) => (
              <motion.a
                key={ws.id}
                href={ws.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick();
                  onWorkspaceChange?.(ws.id);
                }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 + 0.05 }}
                className={`px-3 py-3 text-sm uppercase tracking-widest font-mono transition-colors ${
                  activeWorkspace === ws.id
                    ? 'text-accent bg-accent-dim'
                    : 'text-ink-subtle hover:text-ink hover:bg-surface-hover'
                }`}
              >
                {ws.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
