import { ArrowUpRight } from 'lucide-react';
import { career, certifications } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="journey" className="section career-section">
      <div className="section-heading horizontal">
        <div><span className="section-index">03 / EXPERIENCE</span><h2>FROM DELIVERY<br />TO DIRECTION.</h2></div>
        <p>A progression from building production features to shaping the systems, boundaries, and delivery practices they run on.</p>
      </div>

      <div className="career-ledger">
        {career.map((item, index) => (
          <article key={`${item.period}-${item.title}`} className={item.kind === 'Education' ? 'career-education' : ''}>
            <span className="career-count">0{index + 1}</span>
            <time>{item.period}</time>
            <div><span className="career-kind">{item.kind || 'Professional experience'}</span><h3>{item.title}</h3><strong>{item.place}</strong></div>
            <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
          </article>
        ))}
      </div>

      <div className="learning-strip">
        <div><span>CONTINUED LEARNING</span><h3>Recent certifications</h3></div>
        {certifications.map((certification) => (
          <a key={certification.title} href={certification.href} target="_blank" rel="noreferrer">
            <span>{certification.date}</span><strong>{certification.title}</strong><ArrowUpRight />
          </a>
        ))}
      </div>
    </section>
  );
}
