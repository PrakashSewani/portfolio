import { motion } from 'motion/react';
import { Github, ArrowUpRight, ExternalLink } from 'lucide-react';
import DecryptionText from './DecryptionText';
import CodeAssemblyTag from './CodeAssemblyTag';
import { TerminalHeader } from './OsControls';

interface AsciiProject {
  title: string;
  category: string;
  description: string;
  tech: string[];
  github: string;
  install?: string;
  ascii: string[];
  stats: { label: string; value: string }[];
}

const projects: AsciiProject[] = [
  {
    title: 'Habitual',
    category: 'Productivity',
    description: 'A modern habit tracking platform designed to help you build routines, stay consistent, and visualize progress across devices.',
    tech: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/PrakashSewani/Habitual',
    ascii: [
      '┌─── habitual ────────────────────────────┐',
      '│ $ habit-tracker --dashboard             │',
      '│                                         │',
      '│  ┌──────┐ ┌──────┐ ┌──────┐             │',
      '│  │▓▓▓▓▓▓│ │▓▓▓▓░░│ │▓▓▓▓▓▓│             │',
      '│  │▓▓▓▓▓▓│ │▓▓▓▓▓░│ │▓▓▓▓▓▓│             │',
      '│  │ Mon  │ │ Tue  │ │ Wed  │             │',
      '│  └──────┘ └──────┘ └──────┘             │',
      '│                                         │',
      '│  streak: 14 days                        │',
      '│  habits_tracked: 8                      │',
      '│  completion_rate: 87%                   │',
      '│                                         │',
      '│  [████████████████████░░░░] 87%         │',
      '└─────────────────────────────────────────┘',
    ],
    stats: [
      { label: 'streak', value: '14d' },
      { label: 'habits', value: '8' },
      { label: 'rate', value: '87%' },
    ],
  },
  {
    title: 'Class-Spy',
    category: 'Developer Tool',
    description: 'VS Code extension that reveals CSS definitions and decodes Tailwind utility classes on hover across HTML, React, Vue, Svelte, Astro, and Angular.',
    tech: ['TypeScript', 'VS Code API', 'Tailwind CSS', 'AST Parsing'],
    github: 'https://github.com/PrakashSewani/Class-Spy',
    install: 'https://marketplace.visualstudio.com/items?itemName=PrakashSewani.class-spy',
    ascii: [
      '┌─── class-spy ───────────────────────────┐',
      '│ $ class-spy --inspect                   │',
      '│                                         │',
      '│  <div class="flex items-center gap-4">  │',
      '│       ╰── display: flex                 │',
      '│       ╰── align-items: center           │',
      '│       ╰── gap: 1rem                     │',
      '│                                         │',
      '│  resolved:                              │',
      '│    display: flex                        │',
      '│    align-items: center                  │',
      '│    gap: 1rem                            │',
      '│                                         │',
      '│  frameworks: [html react vue svelte]    │',
      '│  status: active                         │',
      '└─────────────────────────────────────────┘',
    ],
    stats: [
      { label: 'frameworks', value: '6' },
      { label: 'parses', value: 'AST' },
      { label: 'status', value: 'live' },
    ],
  },
  {
    title: 'AdvAutomation',
    category: 'Automation',
    description: 'A schedule-driven meeting automation system that automatically joins and leaves sessions, reducing manual effort through background execution.',
    tech: ['Python', 'Selenium', 'Discord.py', 'Windows Task Scheduler'],
    github: 'https://github.com/PrakashSewani/AdvAutomation',
    ascii: [
      '┌─── advautomation ───────────────────────┐',
      '│ $ scheduler --status                    │',
      '│                                         │',
      '│  next_meeting: 14:30 IST                │',
      '│  status: waiting                        │',
      '│                                         │',
      '│  ┌─ schedule ──────────────────────┐    │',
      '│  │ 09:00  [joined]  standup        │    │',
      '│  │ 11:00  [joined]  sprint_planning│    │',
      '│  │ 14:30  [pending] design_review  │    │',
      '│  │ 16:00  [pending] retro          │    │',
      '│  └─────────────────────────────────┘    │',
      '│                                         │',
      '│  auto_join: enabled                     │',
      '│  notifications: discord                 │',
      '└─────────────────────────────────────────┘',
    ],
    stats: [
      { label: 'meetings', value: '4/d' },
      { label: 'platform', value: 'win' },
      { label: 'notify', value: 'discord' },
    ],
  },
  {
    title: 'SmartEducationBot',
    category: 'NLP / AI',
    description: 'A PDF-based question-answering system using keyword extraction and NLP models (BERT) to generate contextual responses with web-scraping fallback.',
    tech: ['Python', 'Flask', 'BERT', 'BeautifulSoup', 'Transformers'],
    github: 'https://github.com/PrakashSewani/SMART-EDUCATION-BOT',
    ascii: [
      '┌─── smart-education-bot ─────────────────┐',
      '│ $ edu-bot --query "transformers"        │',
      '│                                         │',
      '│  input:  what are transformers?         │',
      '│  source: /docs/nlp_chapter.pdf          │',
      '│  model:  bert-base-uncased              │',
      '│                                         │',
      '│  ┌─ response ──────────────────────┐    │',
      '│  │ Transformers are attention-based│    │',
      '│  │ neural networks that process    │    │',
      '│  │ input data in parallel...       │    │',
      '│  └─────────────────────────────────┘    │',
      '│                                         │',
      '│  confidence: 0.94                       │',
      '│  fallback: web_scrape                   │',
      '└─────────────────────────────────────────┘',
    ],
    stats: [
      { label: 'model', value: 'BERT' },
      { label: 'confidence', value: '94%' },
      { label: 'fallback', value: 'web' },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-base">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 relative">
          <h2 className="watermark text-[12vw] md:text-[15vw] absolute -top-8 md:-top-12 left-0">
            WORK
          </h2>
          <span className="section-number">02</span>
          <div className="flex flex-col gap-4 relative z-10">
            <DecryptionText
              text="Projects"
              as="h2"
              trigger="inview"
              delay={0}
              speed={40}
              appendCursor
              className="text-5xl md:text-7xl font-mono tracking-[-0.03em] text-ink"
            />
          </div>
          <p className="text-lg text-ink-dim max-w-md leading-relaxed font-mono">
            A collection of technical challenges solved through engineering excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="flex flex-col lg:flex-row gap-8 items-stretch"
            >
              {/* ASCII Terminal */}
              <div className="w-full lg:w-3/5 terminal-frame group">
                <TerminalHeader title={project.title} />
                <div className="p-4 md:p-6 overflow-x-auto flex justify-center">
                  <pre className="ascii-art text-[10px] md:text-[11px] text-center">
                    {project.ascii.join('\n')}
                  </pre>
                </div>
                {/* Stats bar */}
                <div className="flex border-t border-border">
                  {project.stats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`flex-1 px-4 py-2 border-r border-border last:border-r-0 flex items-center gap-2`}
                    >
                      <span className="text-[9px] uppercase tracking-widest text-ink-subtle">{stat.label}:</span>
                      <span className="text-[11px] font-bold text-accent font-mono">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="w-full lg:w-2/5 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-ink-dim">
                    {project.category}
                  </span>
                  <DecryptionText
                    text={project.title}
                    as="h3"
                    trigger="inview"
                    delay={200}
                    speed={35}
                    className="text-3xl md:text-4xl font-bold tracking-tighter text-ink font-mono"
                  />
                </div>

                <p className="text-base text-ink-dim leading-relaxed font-mono">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <CodeAssemblyTag
                      key={tech}
                      text={tech}
                      delay={i * 100}
                      className="bg-surface border border-border px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-ink-dim font-mono"
                    />
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest border-b-2 border-ink pb-1 text-ink hover:text-accent hover:border-accent transition-all font-mono"
                  >
                    source <ArrowUpRight size={14} />
                  </a>
                  {project.install && (
                    <a
                      href={project.install}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest border-b-2 border-accent pb-1 text-accent hover:text-ink hover:border-ink transition-all font-mono"
                    >
                      install <ExternalLink size={14} />
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-surface border border-border flex items-center justify-center text-ink-dim hover:text-accent hover:border-accent transition-all"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
