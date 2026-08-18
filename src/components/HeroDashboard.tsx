import { motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Linkedin } from 'lucide-react';
import { profile } from '../data/portfolio';

function ArchitectureGraphic() {
  return (
    <motion.div
      className="architecture-graphic"
      initial={{ opacity: 0, rotate: 2, y: 30 }}
      animate={{ opacity: 1, rotate: -1.5, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      role="img"
      aria-label="Modular application architecture connecting frontend applications, shared authentication, and a GraphQL API"
    >
      <div className="architecture-title"><span>ARCHITECTURE PROOF</span><strong>MF / 04</strong></div>
      <div className="architecture-grid">
        <div className="architecture-node architecture-core"><small>ORCHESTRATION</small><strong>WEB<br />SHELL</strong></div>
        <div className="architecture-node node-a"><span>01</span>REACT APP</div>
        <div className="architecture-node node-b"><span>02</span>ANGULAR APP</div>
        <div className="architecture-node node-c"><span>03</span>SHARED AUTH</div>
        <div className="architecture-node node-d"><span>04</span>GRAPHQL API</div>
        <svg viewBox="0 0 600 420" aria-hidden="true">
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
        <span>Portfolio / Senior engineering</span>
        <span className="availability"><i /> {profile.availability}</span>
      </div>

      <div className="hero-layout">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="hero-label">{profile.role} / {profile.location}</p>
          <h1>ENGINEERING<br />FOR PRODUCTS<br /><em>UNDER PRESSURE.</em></h1>
          <p className="hero-intro">{profile.summary}</p>
          <div className="hero-focus-list">
            {profile.focus.map((focus) => <span key={focus}>{focus}</span>)}
          </div>
          <div className="hero-cta-row">
            <a className="primary-action" href={profile.resume} target="_blank" rel="noreferrer">View résumé <ArrowUpRight /></a>
            <a className="secondary-action" href="#projects">View selected work <ArrowDownRight /></a>
          </div>
          <div className="hero-social-links">
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} /></a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
          </div>
        </motion.div>
        <ArchitectureGraphic />
      </div>

      <div className="hero-facts">
        <div><span>Based in</span><strong>{profile.location}</strong></div>
        <div><span>Best fit</span><strong>Platform & product engineering</strong></div>
        <div><span>Core evidence</span><strong>Microfrontends, APIs & real-time systems</strong></div>
        <div><span>Experience</span><strong>{profile.experience}</strong></div>
      </div>
    </section>
  );
}
