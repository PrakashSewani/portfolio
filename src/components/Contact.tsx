import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function Contact() {
  return (
    <footer id="contact" className="contact-section">
      <div className="contact-topline"><span>05 / CONTACT</span><span>{profile.timezone}</span></div>
      <div className="contact-main">
        <p>{profile.availability}</p>
        <h2>LET'S TALK<br />ABOUT THE<br /><em>HARD PART.</em></h2>
        <p className="contact-detail">For recruiters, hiring managers, and engineering leaders looking for someone to bring clarity to complex product and platform work.</p>
        <a className="email-link" href={`mailto:${profile.email}`}><Mail /> {profile.email} <ArrowUpRight /></a>
      </div>
      <div className="contact-footer">
        <div><strong>{profile.name}</strong><span>{profile.role}</span><span>{profile.location}</span></div>
        <div className="social-links">
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer"><Github /> GitHub</a>
          <a href={profile.resume} target="_blank" rel="noreferrer"><ArrowUpRight /> Résumé</a>
        </div>
        <span className="copyright">© 2026 / BUILT WITH REACT</span>
      </div>
    </footer>
  );
}
