import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import HeroDashboard from './components/HeroDashboard';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Interests from './components/Interests';
import Contact from './components/Contact';
import Preloader from './components/Preloader';
import GlobalBackground from './components/GlobalBackground';
import StatusBar from './components/StatusBar';
import CommandPalette from './components/CommandPalette';
import EasterEggs from './components/EasterEggs';

export const WORKSPACES = [
  { id: 'home', label: 'home', href: '#home' },
  { id: 'expertise', label: 'expertise', href: '#expertise' },
  { id: 'projects', label: 'projects', href: '#projects' },
  { id: 'journey', label: 'journey', href: '#journey' },
  { id: 'certifications', label: 'certs', href: '#certifications' },
  { id: 'interests', label: 'interests', href: '#interests' },
  { id: 'contact', label: 'contact', href: '#contact' },
] as const;

export type WorkspaceId = (typeof WORKSPACES)[number]['id'];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceId>('home');
  const activeWorkspaceRef = useRef<WorkspaceId>(activeWorkspace);
  const isProgrammaticScroll = useRef(false);

  useEffect(() => {
    activeWorkspaceRef.current = activeWorkspace;
  }, [activeWorkspace]);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleCmdClose = useCallback(() => {
    setCmdOpen(false);
    // Restore focus to the trigger for keyboard users
    setTimeout(() => {
      document.getElementById('cmd-trigger')?.focus();
    }, 0);
  }, []);

  useEffect(() => {
    const handler = () => setCmdOpen((prev) => !prev);
    window.addEventListener('toggle-cmd-palette', handler);
    return () => window.removeEventListener('toggle-cmd-palette', handler);
  }, []);

  // Track active workspace from scroll position + hash
  useEffect(() => {
    if (isLoading) return;

    const ids = WORKSPACES.map((w) => w.id);

    const updateActive = () => {
      if (isProgrammaticScroll.current) return;

      const viewportCenter = window.scrollY + window.innerHeight * 0.35;
      let closestId: WorkspaceId | null = null;
      let minDistance = Infinity;

      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;
        const distance = Math.abs(element.offsetTop - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestId = id;
        }
      });

      if (closestId && closestId !== activeWorkspaceRef.current) {
        setActiveWorkspace(closestId);
        activeWorkspaceRef.current = closestId;
        if (window.location.hash !== `#${closestId}`) {
          history.replaceState(null, '', `#${closestId}`);
        }
      }
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });

    // Restore hash on load
    const hash = window.location.hash.replace('#', '') as WorkspaceId;
    if (ids.includes(hash)) {
      setActiveWorkspace(hash);
      activeWorkspaceRef.current = hash;
      setTimeout(() => {
        isProgrammaticScroll.current = true;
        document.getElementById(hash)?.scrollIntoView({ behavior: 'auto' });
        window.setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 50);
      }, 100);
    }

    return () => window.removeEventListener('scroll', updateActive);
  }, [isLoading]);

  const shellSpring = {
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 },
  };

  return (
    <div className="relative min-h-screen bg-base text-ink">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <GlobalBackground />
      <div className="scanline-overlay" />
      <EasterEggs />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        ) : (
          <>
            <motion.nav
              key="menubar"
              {...shellSpring}
              className="fixed top-0 left-0 right-0 z-40"
              aria-label="Workspace menu"
            >
              <Navbar
                activeWorkspace={activeWorkspace}
                onWorkspaceChange={(id) => {
                  setActiveWorkspace(id);
                  activeWorkspaceRef.current = id;
                  isProgrammaticScroll.current = true;
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  window.setTimeout(() => {
                    isProgrammaticScroll.current = false;
                  }, 800);
                }}
                onOpenCmd={() => setCmdOpen(true)}
              />
            </motion.nav>

            <motion.main
              id="main"
              key="main"
              initial={{ opacity: 0, scale: 0.995 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative min-h-screen pt-16"
            >
              <HeroDashboard />
              <Expertise />
              <Projects />
              <Experience />
              <Certifications />
              <Interests />
              <Contact />
            </motion.main>

            <motion.div
              key="statusbar"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="fixed bottom-0 left-0 right-0 z-40"
            >
              <StatusBar activeWorkspace={activeWorkspace} />
            </motion.div>

            <CommandPalette
              isOpen={cmdOpen}
              onClose={handleCmdClose}
              activeWorkspace={activeWorkspace}
              onWorkspaceChange={(id) => {
                setActiveWorkspace(id);
                activeWorkspaceRef.current = id;
                isProgrammaticScroll.current = true;
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                window.setTimeout(() => {
                  isProgrammaticScroll.current = false;
                }, 800);
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
