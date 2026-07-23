import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, MapPin, GitBranch, Activity } from 'lucide-react';

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const ist = time.toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const date = time.toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <div className="dashboard-cell-value text-accent font-mono tabular-nums">{ist}</div>
      <div className="dashboard-cell-sub">{date}</div>
    </>
  );
}

function UptimeCounter() {
  const startDate = new Date('2022-07-01');
  const [days, setDays] = useState(0);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      setDays(diff);
    };
    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="dashboard-cell-value font-mono tabular-nums">{days.toLocaleString()}</div>
      <div className="dashboard-cell-sub">days since hire</div>
    </>
  );
}

function RepoCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/PrakashSewani')
      .then((res) => res.json())
      .then((data) => setCount(data.public_repos))
      .catch(() => setCount(null));
  }, []);

  return (
    <>
      <div className="dashboard-cell-value font-mono tabular-nums">
        {count !== null ? count : '—'}
      </div>
      <div className="dashboard-cell-sub">public repositories</div>
    </>
  );
}

const techStack = [
  'TypeScript', 'JavaScript', 'Node.js', 'Python',
  'React', 'Angular', '.NET Core', 'GraphQL',
  'Single-Spa', 'WebSockets', 'SQL', 'NoSQL',
];

export default function HeroDashboard() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-32 md:pb-12 overflow-hidden bg-base">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex flex-col gap-8"
        >
          {/* Terminal prompt */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <Terminal size={14} className="text-accent" />
            <span className="text-xs font-mono uppercase tracking-widest text-ink-dim">
              <span className="text-accent">$</span> system_status --all
            </span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-mono font-bold tracking-[-0.03em] text-ink leading-[0.9]">
              Prakash Sewani
            </h1>
            <p className="text-ink-dim font-mono text-sm mt-2 uppercase tracking-widest">
              senior_software_engineer
            </p>
          </motion.div>

          {/* Dashboard Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-px bg-border"
          >
            {/* Row 1: Time | Uptime | Status */}
            <div className="dashboard-cell">
              <div className="dashboard-cell-label">system_time</div>
              <LiveClock />
            </div>
            <div className="dashboard-cell">
              <div className="dashboard-cell-label">uptime</div>
              <UptimeCounter />
            </div>
            <div className="dashboard-cell">
              <div className="dashboard-cell-label">status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success animate-pulse" />
                <div className="dashboard-cell-value text-success text-lg">ready for hire</div>
              </div>
              <div className="dashboard-cell-sub">open to opportunities</div>
            </div>
            <div className="dashboard-cell">
              <div className="dashboard-cell-label">open source</div>
              <div className="flex items-center gap-2 mt-1">
                <GitBranch size={14} className="text-accent" />
                <RepoCount />
              </div>
            </div>

            {/* Row 2: Stack (full width) */}
            <div className="dashboard-cell md:col-span-2">
              <div className="dashboard-cell-label">stack</div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                {techStack.map((tech) => (
                  <span key={tech} className="text-sm font-mono text-ink flex items-center gap-2">
                    <span className="text-accent text-[10px]">▸</span>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Row 3: Location (full width) */}
            <div className="dashboard-cell md:col-span-2">
              <div className="dashboard-cell-label">location</div>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={14} className="text-accent" />
                <div className="dashboard-cell-value text-base">Kalyan, Maharashtra, India</div>
              </div>
              <div className="dashboard-cell-sub font-mono tabular-nums">19.0840°N, 73.1317°E · IST (UTC+5:30)</div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap items-center gap-6 mt-4"
          >
            <a
              href="https://prakashsewaniresume.tiiny.site"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-accent-dim border border-accent text-accent text-xs uppercase font-bold tracking-widest font-mono transition-all hover:bg-accent hover:text-base"
            >
              view_resume ↓
            </a>
            <a
              href="#contact"
              className="text-xs uppercase font-bold tracking-widest border-b-2 border-ink pb-1 text-ink hover:text-accent hover:border-accent transition-colors font-mono"
            >
              get_in_touch
            </a>
            <a
              href="https://github.com/PrakashSewani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase font-bold tracking-widest border-b-2 border-ink pb-1 text-ink hover:text-accent hover:border-accent transition-colors font-mono"
            >
              github ↗
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden sm:flex"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold text-ink-dim font-mono flex items-center gap-2">
            <Activity size={12} />
            scroll_to_explore
          </span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-border-hover to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
