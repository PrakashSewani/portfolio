import { useEffect, useCallback } from 'react';
import { isMacOs } from 'react-device-detect';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const ASCII_ART = `
██████╗ ██████╗  █████╗ ██╗██╗
██╔══██╗██╔══██╗██╔══██╗██║██║
██████╔╝██████╔╝███████║██║██║
██╔═══╝ ██╔══██╗██╔══██║██║╚═╝
██║     ██║  ██║██║  ██║██║██╗
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝
`;

const showToast = (message: string) => {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
};

export default function EasterEggs() {
  const handleKonami = useCallback(() => {
    let sequence: string[] = [];
    let timeout: NodeJS.Timeout;

    const handler = (e: KeyboardEvent) => {
      sequence.push(e.key);
      sequence = sequence.slice(-KONAMI_CODE.length);

      if (sequence.join(',') === KONAMI_CODE.join(',')) {
        showToast('konami_code_activated // +30 lives');
        console.log(ASCII_ART);
        sequence = [];
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        sequence = [];
      }, 2000);
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      clearTimeout(timeout);
    };
  }, []);

  const handleHelp = useCallback(() => {
    let buffer = '';

    const handler = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      buffer += e.key.toLowerCase();
      buffer = buffer.slice(-4);

      if (buffer === 'help') {
        const mod = isMacOs ? '⌘' : 'Ctrl';
        showToast(`${mod}K: commands | ↑↓: scroll | esc: top`);
        buffer = '';
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleDoubleClick = useCallback(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('h2, h3, h4')) {
        const section = target.closest('section');
        if (section?.id) {
          const url = `${window.location.origin}#${section.id}`;
          navigator.clipboard.writeText(url).then(() => {
            showToast(`copied: #${section.id}`);
          }).catch(() => {
            showToast('copy failed');
          });
        }
      }
    };

    window.addEventListener('dblclick', handler);
    return () => window.removeEventListener('dblclick', handler);
  }, []);

  const handleConsoleArt = useCallback(() => {
    console.log(
      '%c PSX_SYS ',
      'background: #00f0ff; color: #0a0a0a; font-weight: bold; padding: 4px 8px; font-family: monospace;'
    );
    console.log(
      '%cprakash sewani // senior software engineer',
      'color: #888; font-family: monospace; font-size: 11px;'
    );
    console.log(
      '%c"the interface is the proof"',
      'color: #00f0ff; font-family: monospace; font-style: italic; font-size: 11px;'
    );
    console.log(ASCII_ART);
  }, []);

  useEffect(() => {
    const cleanups = [
      handleKonami(),
      handleHelp(),
      handleDoubleClick(),
    ];
    handleConsoleArt();

    return () => cleanups.forEach((fn) => fn());
  }, [handleKonami, handleHelp, handleDoubleClick, handleConsoleArt]);

  return null;
}
