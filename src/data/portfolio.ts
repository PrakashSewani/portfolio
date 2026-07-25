export const profile = {
  name: 'Prakash Sewani',
  role: 'Senior Software Engineer',
  location: 'Kalyan, Maharashtra, India',
  timezone: 'IST / UTC+5:30',
  email: 'contact@prakashsewani.com',
  phone: '+91 88502 60072',
  company: 'Wonderbiz Technologies',
  resume: 'https://prakashsewaniresume.tiiny.site',
  github: 'https://github.com/PrakashSewani',
  linkedin: 'https://www.linkedin.com/in/prakash-s-2a389721a/',
};

export const projects = [
  {
    index: '01',
    title: 'Class-Spy',
    kicker: 'Developer tooling / VS Code extension',
    summary:
      'Turns utility classes into readable CSS at the point of use, helping developers inspect unfamiliar interfaces without breaking their flow.',
    challenge:
      'Resolve CSS and Tailwind utilities consistently across HTML, React, Vue, Svelte, Astro, and Angular while keeping hover feedback immediate.',
    decisions: ['Framework-aware parsing', 'AST-assisted inspection', 'Low-latency editor feedback'],
    tech: ['TypeScript', 'VS Code API', 'Tailwind CSS', 'AST parsing'],
    github: 'https://github.com/PrakashSewani/Class-Spy',
    live: 'https://class-spy.prakashsewani.com/',
    liveLabel: 'Visit website',
    visual: 'inspector',
  },
  {
    index: '02',
    title: 'Habitual',
    kicker: 'Full-stack product / Habit platform',
    summary:
      'A cross-device habit system designed around clear routines, visible momentum, and a focused daily workflow.',
    challenge:
      'Model recurring behavior and progress in a way that remains simple for users while supporting a modern full-stack application architecture.',
    decisions: ['Reusable React UI', 'API-first data flow', 'Progress-focused product model'],
    tech: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/PrakashSewani/Habitual',
    visual: 'habit',
  },
  {
    index: '03',
    title: 'Smart Education Bot',
    kicker: 'Applied NLP / Knowledge retrieval',
    summary:
      'A PDF question-answering system that combines document extraction, contextual NLP responses, and a web fallback path.',
    challenge:
      'Find useful answers from unstructured educational material while preserving a fallback when the local source cannot resolve a query.',
    decisions: ['Document-first retrieval', 'BERT-based context', 'Graceful web fallback'],
    tech: ['Python', 'Flask', 'BERT', 'Transformers', 'BeautifulSoup'],
    github: 'https://github.com/PrakashSewani/SMART-EDUCATION-BOT',
    visual: 'knowledge',
  },
  {
    index: '04',
    title: 'Episode Roulette',
    kicker: 'Browser extension / Netflix UX',
    summary:
      'A Chrome and Safari WebExtension that injects a Random Episode button into Netflix series pages, discovering every episode across all seasons and picking one with equal probability.',
    challenge:
      'Discover every episode across all seasons on a SPA whose DOM is fully controlled by Netflix, without external APIs, then start playback as if the user clicked it themselves.',
    decisions: ['MutationObserver-driven detection', 'Equal-probability randomizer', 'Native Netflix UI integration'],
    tech: ['TypeScript', 'Manifest V3', 'Safari Web Extensions', 'Vite', 'MutationObserver'],
    github: 'https://github.com/PrakashSewani/episode-roulette',
    live: 'https://episode-roulette.prakashsewani.com/',
    liveLabel: 'Visit website',
    visual: 'roulette',
  },
] as const;

export const capabilities = [
  {
    number: 'A',
    title: 'Frontend platforms',
    body: 'Designing modular webshells and microfrontend boundaries that let teams ship independently without fragmenting the product.',
    tools: ['Single-Spa', 'React', 'Angular', 'TypeScript'],
  },
  {
    number: 'B',
    title: 'Backend & APIs',
    body: 'Building dependable application services and integration layers around clear contracts, maintainability, and operational needs.',
    tools: ['Node.js', '.NET Core', 'Python', 'GraphQL', 'REST'],
  },
  {
    number: 'C',
    title: 'Real-time systems',
    body: 'Working with event-driven interfaces, WebSockets, device data, and observability flows where feedback must remain current.',
    tools: ['WebSockets', 'GraphQL', 'Modbus', 'Observability'],
  },
  {
    number: 'D',
    title: 'Enterprise integration',
    body: 'Connecting authentication, identity, and platform concerns so product teams can work inside safe and predictable boundaries.',
    tools: ['SSO', 'IAM', 'OAuth', 'API integration'],
  },
] as const;

export const impactStories = [
  {
    label: 'Platform architecture',
    title: 'Modular frontend ecosystems',
    body: 'Architecting webshell and microfrontend foundations that separate deployment lifecycles while preserving a coherent application experience.',
  },
  {
    label: 'Operational visibility',
    title: 'Real-time observability',
    body: 'Developing interfaces and services that turn live system and device signals into information engineering teams can act on.',
  },
  {
    label: 'Applied automation',
    title: 'NLP-assisted workflows',
    body: 'Exploring pragmatic ways to use language models, document processing, and automation to reduce repetitive operational work.',
  },
] as const;

export const career = [
  {
    period: '2025 — PRESENT',
    title: 'Senior Software Engineer',
    place: 'Wonderbiz Technologies',
    body: 'Architecting scalable microfrontend ecosystems and high-performance systems. Leading development across modular webshells, real-time observability, and NLP-driven automation.',
  },
  {
    period: '2022 — 2025',
    title: 'Software Engineer',
    place: 'Wonderbiz Technologies',
    body: 'Built enterprise product features across frontend and backend systems, worked closely with cross-functional teams, and developed a strong foundation in production software delivery.',
  },
  {
    period: '2018 — 2022',
    title: 'B.E. Computer Science',
    place: 'University of Mumbai',
    body: 'Studied software engineering, data structures, databases, cloud computing, and systems architecture.',
  },
] as const;

export const certifications = [
  {
    title: 'Azure Kubernetes Service with Azure DevOps and Terraform',
    date: '2026',
    href: 'https://ude.my/UC-9257a19e-e08f-4630-9646-289d15e7580d',
  },
  {
    title: '.NET 8 Web API — Clean Architecture',
    date: '2024',
    href: 'https://ude.my/UC-3a89ea1f-7703-4a75-bd67-dd982a91586e',
  },
] as const;
