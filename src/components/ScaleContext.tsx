'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_SCALE, SCALES, isMust } from '@/lib/data';

const STORAGE_KEY = 'wbp-scale';

type ScaleState = { scale: number; setScale: (n: number) => void };
const ScaleCtx = createContext<ScaleState>({ scale: DEFAULT_SCALE, setScale: () => {} });

/** 全站共用的「僱用勞工人數」狀態。選擇存在 localStorage，讀寫失敗時照常運作。 */
export function ScaleProvider({ children }: { children: ReactNode }) {
  const [scale, set] = useState(DEFAULT_SCALE);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const v = raw == null ? NaN : Number(raw);
      if (Number.isInteger(v) && v >= 0 && v < SCALES.length) set(v);
    } catch {
      /* 無法讀取時使用預設值 */
    }
  }, []);

  const setScale = useCallback((n: number) => {
    set(n);
    try {
      localStorage.setItem(STORAGE_KEY, String(n));
    } catch {
      /* 無法寫入時僅本次有效 */
    }
  }, []);

  const value = useMemo(() => ({ scale, setScale }), [scale, setScale]);
  return <ScaleCtx.Provider value={value}>{children}</ScaleCtx.Provider>;
}

export const useScale = () => useContext(ScaleCtx);

export function IconMust() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      <path
        d="M5.6 10.4l2.9 2.9 5.9-6.2"
        fill="none"
        stroke="var(--surface)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMay() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

/** 「法定／得參照」徽章。形狀、顏色、文字三者並用，不只靠顏色。 */
export function DutyBadge({ must }: { must: boolean }) {
  return (
    <span className={`req ${must ? 'must' : 'may'}`}>
      {must ? <IconMust /> : <IconMay />}
      {must ? '法定' : '得參照'}
    </span>
  );
}

/** 依目前規模與該項門檻人數顯示徽章；fixed 用於不隨規模變動的列。 */
export function Req({ min = 0, fixed }: { min?: number; fixed?: 'must' | 'may' }) {
  const { scale } = useScale();
  return <DutyBadge must={fixed ? fixed === 'must' : isMust(scale, min)} />;
}

/** 只在指定規模顯示內容。scales：0 未達 10 人、1 10–29 人、2 30–99 人、3 100 人以上 */
export function ScaleOnly({ scales, children }: { scales: number[]; children: ReactNode }) {
  const { scale } = useScale();
  return scales.includes(scale) ? <>{children}</> : null;
}

export function ScaleSwitcher({ labelledBy }: { labelledBy?: string }) {
  const { scale, setScale } = useScale();
  return (
    <div className="seg" role="group" aria-labelledby={labelledBy} aria-label={labelledBy ? undefined : '僱用勞工人數'}>
      {SCALES.map((s, i) => (
        <button key={s.label} type="button" aria-pressed={i === scale} onClick={() => setScale(i)}>
          {s.label}
        </button>
      ))}
    </div>
  );
}
