import { Crosshair, Gauge, Swords } from 'lucide-react';

const principles = [
  ['01', 'Make boundaries explicit', 'Good architecture makes ownership and change easier to reason about.'],
  ['02', 'Optimise for the next engineer', 'Maintainability is a product feature for the people extending the system.'],
  ['03', 'Earn complexity', 'Sophisticated tools are useful only when the problem genuinely needs them.'],
] as const;

export default function Interests() {
  return (
    <section id="interests" className="section about-section">
      <div className="about-lead">
        <span className="section-index">04 / APPROACH</span>
        <h2>PRAGMATIC.<br /><em>CURIOUS.</em><br />HARD TO RATTLE.</h2>
      </div>
      <div className="about-copy">
        <p className="about-large">I care about systems that are understandable under pressure: clear contracts, useful abstractions, and interfaces that help people make decisions quickly.</p>
        <p>My best work happens where product experience and system architecture meet. I enjoy untangling complex requirements, finding the right boundary, and leaving behind a platform other engineers can confidently build on.</p>
      </div>

      <div className="principles">
        {principles.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
      </div>

      <div className="offscreen-strip">
        <div><Crosshair /><span>WORKING STYLE</span><strong>Strategy under pressure</strong></div>
        <div><Swords /><span>ENGINEERING JUDGMENT</span><strong>Patience and mastery</strong></div>
        <div><Gauge /><span>RESET & REFLECT</span><strong>Space to reset</strong></div>
      </div>
    </section>
  );
}
