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

export default function App() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceId>('home');
  const activeWorkspaceRef = useRef<WorkspaceId>(activeWorkspace);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useEffect(() => {
    activeWorkspaceRef.current = activeWorkspace;
  }, [activeWorkspace]);

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
      const trigger = window.scrollY + window.innerHeight * 0.4;
      let nextId: WorkspaceId = ids[0];
      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top + window.scrollY <= trigger) nextId = id;
        else break;
      }
      if (nextId !== activeWorkspaceRef.current) {
        setActiveWorkspace(nextId);
        activeWorkspaceRef.current = nextId;
      }
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
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
