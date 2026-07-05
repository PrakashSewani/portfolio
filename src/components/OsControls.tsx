import { isMobile, isMacOs, isWindows } from 'react-device-detect';

type Platform = 'mac' | 'windows' | 'linux' | 'mobile';

function getPlatform(): Platform {
  if (isMobile) return 'mobile';
  if (isMacOs) return 'mac';
  if (isWindows) return 'windows';
  return 'linux';
}

function MacControls() {
  return (
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
      <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#dea123]" />
      <span className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
    </div>
  );
}

function WindowsControls() {
  return (
    <div className="flex items-center">
      <svg width="12" height="12" viewBox="0 0 12 12" className="text-ink-dim">
        <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg width="12" height="12" viewBox="0 0 12 12" className="text-ink-dim ml-3">
        <rect x="2" y="2" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg width="12" height="12" viewBox="0 0 12 12" className="text-ink-dim ml-3">
        <line x1="3" y1="3" x2="9" y2="9" stroke="currentColor" strokeWidth="1" />
        <line x1="9" y1="3" x2="3" y2="9" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

function LinuxControls() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 bg-ink-subtle" />
      <span className="w-2.5 h-2.5 bg-ink-subtle" />
      <span className="w-2.5 h-2.5 bg-ink-subtle" />
    </div>
  );
}

function MobileControls() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-ink-dim">
      <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5" />
      <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" />
      <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function OsControls({ className = '', side = 'left' }: { className?: string; side?: 'left' | 'right' }) {
  const platform = getPlatform();

  const controls = (() => {
    switch (platform) {
      case 'mac': return <MacControls />;
      case 'windows': return <WindowsControls />;
      case 'linux': return <LinuxControls />;
      case 'mobile': return <MobileControls />;
    }
  })();

  return (
    <div className={`flex items-center ${side === 'right' ? 'ml-auto' : ''} ${className}`}>
      {controls}
    </div>
  );
}

export function TerminalHeader({ title }: { title: string }) {
  const platform = getPlatform();

  // Mac: controls LEFT, title next to them
  // Windows/Linux: title LEFT, controls RIGHT
  if (platform === 'mac' || platform === 'mobile') {
    return (
      <div className="terminal-frame-header">
        <OsControls />
        <span className="text-ink-dim">{title}</span>
      </div>
    );
  }

  return (
    <div className="terminal-frame-header justify-between">
      <span className="text-ink-dim">{title}</span>
      <OsControls side="right" />
    </div>
  );
}
