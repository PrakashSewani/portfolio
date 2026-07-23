import { ArrowUpRight } from 'lucide-react';
import { career, certifications } from '../data/portfolio';

export default function Experience() {
  return (
    <section id="journey" className="section career-section">
      <div className="section-heading horizontal">
        <div><span className="section-index">03 / CAREER</span><h2>FROM DELIVERY<br />TO DIRECTION.</h2></div>
        <p>A continuous progression from building production features to shaping the architecture they run on.</p>
      </div>

      <div className="career-ledger">
        {career.map((item, index) => (
          <article key={`${item.period}-${item.title}`}>
            <span className="career-count">0{index + 1}</span>
            <time>{item.period}</time>
            <div><h3>{item.title}</h3><strong>{item.place}</strong></div>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <div className="learning-strip">
        <div><span>CONTINUOUS LEARNING</span><h3>Recent certifications</h3></div>
        {certifications.map((certification) => (
          <a key={certification.title} href={certification.href} target="_blank" rel="noreferrer">
            <span>{certification.date}</span><strong>{certification.title}</strong><ArrowUpRight />
          </a>
        ))}
      </div>
    </section>
  );
}
