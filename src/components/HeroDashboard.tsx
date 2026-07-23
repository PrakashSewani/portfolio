import { motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/portfolio';

function ArchitectureGraphic() {
  return (
    <motion.div
      className="architecture-graphic"
      initial={{ opacity: 0, rotate: 2, y: 30 }}
      animate={{ opacity: 1, rotate: -1.5, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      aria-label="Diagram of a modular application architecture"
    >
      <div className="architecture-title"><span>LIVE SYSTEM MAP</span><strong>MF / 04</strong></div>
      <div className="architecture-grid">
        <div className="architecture-node architecture-core"><small>ORCHESTRATION</small><strong>WEB<br />SHELL</strong></div>
        <div className="architecture-node node-a"><span>01</span>REACT APP</div>
        <div className="architecture-node node-b"><span>02</span>ANGULAR APP</div>
        <div className="architecture-node node-c"><span>03</span>SHARED AUTH</div>
        <div className="architecture-node node-d"><span>04</span>GRAPHQL API</div>
        <svg viewBox="0 0 600 420" role="presentation">
          <path d="M300 210 L118 91 M300 210 L483 91 M300 210 L118 330 M300 210 L483 330" />
          <circle cx="300" cy="210" r="8" />
        </svg>
      </div>
      <div className="architecture-footer"><span>Independent delivery</span><span>Shared experience</span></div>
    </motion.div>
  );
}

export default function HeroDashboard() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-eyebrow">
        <span>Portfolio / 2026</span>
        <span className="availability"><i /> Available for ambitious engineering teams</span>
      </div>

      <div className="hero-layout">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="hero-label">Senior software engineer</p>
          <h1>I BUILD SOFTWARE<br />THAT SURVIVES<br /><em>COMPLEXITY.</em></h1>
          <p className="hero-intro">
            I architect modular frontend platforms, dependable APIs, and real-time systems that stay maintainable as products and teams grow.
          </p>
          <div className="hero-cta-row">
            <a className="primary-action" href="#projects">Explore selected work <ArrowDownRight /></a>
            <a className="text-action" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a>
          </div>
        </motion.div>
        <ArchitectureGraphic />
      </div>

      <div className="hero-facts">
        <div><span>Based in</span><strong>{profile.location}</strong></div>
        <div><span>Working across</span><strong>Frontend / Backend / Systems</strong></div>
        <div><span>Current focus</span><strong>Microfrontends & observability</strong></div>
        <div><span>Experience</span><strong>4+ years shipping software</strong></div>
      </div>
    </section>
  );
}
