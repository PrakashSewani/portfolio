import { motion } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';
import { capabilities, impactStories } from '../data/portfolio';

export default function Expertise() {
  return (
    <section id="expertise" className="section expertise-section">
      <div className="section-heading compact">
        <span className="section-index">02 / ENGINEERING RANGE</span>
        <h2>ARCHITECTURE<br />WITH A REASON.</h2>
        <p>I choose tools around boundaries, delivery pressure, team ownership, and the behavior the system needs in production.</p>
      </div>

      <div className="capability-grid">
        {capabilities.map((capability, index) => (
          <motion.article
            key={capability.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="capability-number">{capability.number}</div>
            <h3>{capability.title}</h3>
            <p>{capability.body}</p>
            <div>{capability.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </motion.article>
        ))}
      </div>

      <div className="impact-block">
        <div className="impact-intro">
          <span>COMMERCIAL WORK / ANONYMIZED</span>
          <h3>Systems built inside real constraints.</h3>
          <p>Professional work is described at an architecture level to respect client confidentiality without reducing it to a list of technologies.</p>
          <ArrowDownRight size={42} />
        </div>
        <div className="impact-list">
          {impactStories.map((story, index) => (
            <article key={story.title}>
              <span>0{index + 1} / {story.label}</span>
              <h4>{story.title}</h4>
              <p>{story.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
