import { useState, useEffect } from 'react';
import { isMacOs } from 'react-device-detect';

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Kolkata',
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <>{time} IST</>;
}

export default function StatusBar() {
  return (
    <div className="status-bar" role="contentinfo" aria-label="System status bar">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success animate-pulse" />
          <span className="text-ink-dim">ready for hire</span>
        </div>
        <span className="hidden sm:inline text-ink-subtle">│</span>
        <span className="hidden sm:inline text-ink-dim">Senior SW Engineer @ Wonderbiz</span>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <span className="text-ink-subtle">Kalyan, IN</span>
        <span className="text-ink-subtle">│</span>
        <span className="text-accent"><LiveClock /></span>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden sm:inline text-ink-subtle">
          {isMacOs ? (
            <>
              <kbd className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 border border-border bg-surface text-ink-dim text-[9px]">⌘</kbd>
              <kbd className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 border border-border bg-surface text-ink-dim text-[9px]">K</kbd>
            </>
          ) : (
            <>
              <kbd className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 border border-border bg-surface text-ink-dim text-[9px]">Ctrl</kbd>
              <kbd className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 border border-border bg-surface text-ink-dim text-[9px]">K</kbd>
            </>
          )}
        </span>
        <span className="text-ink-subtle md:hidden text-[9px]">PSX_SYS</span>
      </div>
    </div>
  );
}
