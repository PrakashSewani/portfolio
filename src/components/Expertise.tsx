import { motion } from 'motion/react';
import { Terminal, Database, Globe, ShieldCheck, TrendingUp } from 'lucide-react';
import DecryptionText from './DecryptionText';
import CodeAssemblyTag from './CodeAssemblyTag';

const expertiseItems = [
  {
    title: 'Microfrontend Architecture',
    description: 'Specializing in Single-Spa and modular webshells for scalable, independent frontend lifecycles.',
    icon: <Terminal size={24} />,
    tech: ['Single-Spa', 'Micro-frontends', 'JavaScript', 'React'],
    span: 'lg',
  },
  {
    title: 'Full Stack',
    description: 'Building robust applications with .NET Core, Node.js, and Python.',
    icon: <Database size={24} />,
    tech: ['.NET Core', 'Node.js', 'Python'],
    span: 'normal',
  },
  {
    title: 'API & Data',
    description: 'Expertise in GraphQL and real-time data integration.',
    icon: <Globe size={24} />,
    tech: ['GraphQL', 'Apollo', 'REST', 'WebSockets'],
    span: 'normal',
  },
  {
    title: 'Security & Auth',
    description: 'Implementing enterprise-grade SSO and IAM standards.',
    icon: <ShieldCheck size={24} />,
    tech: ['SSO', 'IAM', 'OAuth'],
    span: 'normal',
  },
];

const skills = [
  { name: 'TypeScript', level: 95 },
  { name: 'React', level: 92 },
  { name: 'Node.js', level: 88 },
  { name: 'Python', level: 82 },
  { name: '.NET Core', level: 80 },
  { name: 'GraphQL', level: 78 },
];

export default function Expertise() {
  return (
    <section id="expertise" className="py-24 px-6 md:px-12 bg-base">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 relative">
          <h2 className="watermark text-[12vw] md:text-[15vw] absolute -top-8 md:-top-12 left-0">
            STACK
          </h2>
          <span className="section-number">01</span>
          <div className="flex flex-col gap-4 relative z-10">
            <DecryptionText
              text="Expertise"
              as="h2"
              trigger="inview"
              delay={0}
              speed={40}
              appendCursor
              className="text-5xl md:text-7xl font-mono tracking-[-0.03em] text-ink"
            />
          </div>
          <p className="text-lg text-ink-dim max-w-md leading-relaxed font-mono">
            A comprehensive approach to modern software engineering.
          </p>
        </div>

        {/* Grid with explicit borders matching other sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main expertise card - spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="group p-8 md:p-10 bg-surface border border-border hover:border-border-hover transition-colors md:col-span-2 flex flex-col gap-6"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 flex items-center justify-center bg-surface-hover text-accent transition-colors group-hover:bg-accent group-hover:text-base">
                {expertiseItems[0].icon}
              </div>
              <TrendingUp size={14} className="text-ink-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-bold tracking-tight text-ink font-mono">
                {expertiseItems[0].title}
              </h3>
              <p className="text-ink-dim leading-relaxed font-mono">
                {expertiseItems[0].description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {expertiseItems[0].tech.map((tech, i) => (
                <CodeAssemblyTag
                  key={tech}
                  text={tech}
                  delay={i * 80}
                  className="bg-surface border border-border px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-ink-dim font-mono"
                />
              ))}
            </div>
          </motion.div>

          {/* Row 2: Full Stack | API & Data */}
          {expertiseItems.slice(1, 3).map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 1) * 0.1 }}
              className="group p-8 bg-surface border border-border hover:border-border-hover transition-colors flex flex-col gap-6"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-hover text-accent transition-colors group-hover:bg-accent group-hover:text-base">
                  {item.icon}
                </div>
                <TrendingUp size={14} className="text-ink-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold tracking-tight text-ink font-mono">
                  {item.title}
                </h3>
                <p className="text-ink-dim leading-relaxed font-mono">
                  {item.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {item.tech.map((tech, i) => (
                  <CodeAssemblyTag
                    key={tech}
                    text={tech}
                    delay={i * 80}
                    className="bg-surface border border-border px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-ink-dim font-mono"
                  />
                ))}
              </div>
            </motion.div>
          ))}

          {/* Row 3: Security & Auth | Skill Bars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group p-8 bg-surface border border-border hover:border-border-hover transition-colors flex flex-col gap-6"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 flex items-center justify-center bg-surface-hover text-accent transition-colors group-hover:bg-accent group-hover:text-base">
                {expertiseItems[3].icon}
              </div>
              <TrendingUp size={14} className="text-ink-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-bold tracking-tight text-ink font-mono">
                {expertiseItems[3].title}
              </h3>
              <p className="text-ink-dim leading-relaxed font-mono">
                {expertiseItems[3].description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {expertiseItems[3].tech.map((tech, i) => (
                <CodeAssemblyTag
                  key={tech}
                  text={tech}
                  delay={i * 80}
                  className="bg-surface border border-border px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-ink-dim font-mono"
                />
              ))}
            </div>
          </motion.div>

          {/* Skill bars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-8 bg-surface border border-border flex flex-col gap-4"
          >
            <div className="text-[10px] uppercase tracking-widest font-bold text-ink-dim font-mono">
              proficiency
            </div>
            <div className="flex flex-col gap-3 mt-2">
              {skills.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">{skill.name}</span>
                    <span className="text-[10px] font-mono text-accent">{skill.level}%</span>
                  </div>
                  <div className="h-[2px] bg-border w-full">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Row 4: Metrics (full width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="p-8 bg-surface border border-border flex flex-col gap-4 md:col-span-2"
          >
            <div className="text-[10px] uppercase tracking-widest font-bold text-ink-dim font-mono">
              metrics
            </div>
            <div className="flex flex-wrap gap-8 mt-2">
              <div>
                <div className="text-3xl font-bold text-accent font-mono tabular-nums">4+</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">years experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent font-mono tabular-nums">12+</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">technologies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent font-mono tabular-nums">3</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink-dim">certifications</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
