export const WORKSPACES = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'projects', label: 'Work', href: '#projects' },
  { id: 'expertise', label: 'Strengths', href: '#expertise' },
  { id: 'journey', label: 'Experience', href: '#journey' },
  { id: 'interests', label: 'About', href: '#interests' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const;

export type WorkspaceId = (typeof WORKSPACES)[number]['id'];
