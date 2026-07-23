import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import HeroDashboard from './components/HeroDashboard';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Interests from './components/Interests';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';

export const WORKSPACES = [
  { id: 'home', label: 'Intro', href: '#home' },
  { id: 'projects', label: 'Work', href: '#projects' },
  { id: 'expertise', label: 'Expertise', href: '#expertise' },
  { id: 'journey', label: 'Career', href: '#journey' },
  { id: 'interests', label: 'About', href: '#interests' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

export type WorkspaceId = (typeof WORKSPACES)[number]['id'];
export type Theme = 'light' | 'dark';

export default function App() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  );
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceId>('home');
  const activeWorkspaceRef = useRef<WorkspaceId>(activeWorkspace);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useEffect(() => {
    activeWorkspaceRef.current = activeWorkspace;
  }, [activeWorkspace]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem('portfolio-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#11110f' : '#f1efe7');
  }, [theme]);

  const handleCmdClose = () => {
    setCmdOpen(false);
    window.setTimeout(() => document.getElementById('cmd-trigger')?.focus(), 0);
  };

  useEffect(() => {
    const handler = () => setCmdOpen((prev) => !prev);
    window.addEventListener('toggle-cmd-palette', handler);
    return () => window.removeEventListener('toggle-cmd-palette', handler);
  }, []);

  useEffect(() => {
    const ids = WORKSPACES.map((w) => w.id);
    const updateActive = () => {
      const viewportCenter = window.scrollY + window.innerHeight * 0.35;
      let closestId: WorkspaceId = 'home';
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

      if (closestId !== activeWorkspaceRef.current) {
        setActiveWorkspace(closestId);
        activeWorkspaceRef.current = closestId;
      }
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, []);

  const navigate = (id: WorkspaceId) => {
    setActiveWorkspace(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="site-shell">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Navbar
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={navigate}
        onOpenCmd={() => setCmdOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
      />
      <main id="main">
        <HeroDashboard />
        <Projects />
        <Expertise />
        <Experience />
        <Interests />
        <Contact />
      </main>
      <CommandPalette
        isOpen={cmdOpen}
        onClose={handleCmdClose}
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={navigate}
      />
    </div>
  );
}
