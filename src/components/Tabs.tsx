'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

export type TabDef = { label: string; content: ReactNode };

export default function Tabs({ label, tabs }: { label: string; tabs: TabDef[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <>
      <div className="tabs" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
        {tabs.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-t${i}`}
            aria-controls={`${base}-p${i}`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.label}
          className="panel"
          role="tabpanel"
          id={`${base}-p${i}`}
          aria-labelledby={`${base}-t${i}`}
          hidden={i !== active}
        >
          {t.content}
        </div>
      ))}
    </>
  );
}
