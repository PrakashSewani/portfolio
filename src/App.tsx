import { useState, useEffect } from 'react';
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const handler = () => setCmdOpen((prev) => !prev);
    window.addEventListener('toggle-cmd-palette', handler);
    return () => window.removeEventListener('toggle-cmd-palette', handler);
  }, []);

  return (
    <div className="relative min-h-screen bg-base text-ink">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <GlobalBackground />
      <div className="scanline-overlay" />
      <EasterEggs />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        ) : (
          <motion.main
            id="main"
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative min-h-screen"
          >
            <Navbar onOpenCmd={() => setCmdOpen(true)} />
            <HeroDashboard />
            <Expertise />
            <Projects />
            <Experience />
            <Certifications />
            <Interests />
            <Contact />
            <StatusBar />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
