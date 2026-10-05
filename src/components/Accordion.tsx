'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';
import { DEFAULT_SCALE, type FaqEntry } from '@/lib/data';
import { useScale } from './ScaleContext';

/** 手風琴外框：只負責間距，項目各自管理開合。 */
export function Accordion({ children }: { children: ReactNode }) {
  return <div className="acc-list">{children}</div>;
}

type ItemProps = {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  /** 受控模式：由外層決定開合（FAQ 一次只開一題） */
  open?: boolean;
  onToggle?: () => void;
  /** 指定規模：目前規模符合時自動展開並標示「你的規模」 */
  scales?: number[];
};

export function AccordionItem({ title, children, defaultOpen, open, onToggle, scales }: ItemProps) {
  const id = useId();
  const { scale } = useScale();
  const mine = scales ? scales.includes(scale) : false;
  const [inner, setInner] = useState(defaultOpen ?? (scales ? scales.includes(DEFAULT_SCALE) : false));

  useEffect(() => {
    if (scales) setInner(scales.includes(scale));
    // 只在規模改變時同步
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale]);

  const isOpen = open ?? inner;
  const toggle = onToggle ?? (() => setInner((v) => !v));

  return (
    <div className={isOpen ? 'acc open' : 'acc'}>
      <h3 className="acc-head">
        <button type="button" aria-expanded={isOpen} aria-controls={id} onClick={toggle}>
          <span className="acc-icon" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
          <span className="acc-title">{title}</span>
          {mine && <span className="mine">你的規模</span>}
        </button>
      </h3>
      <div id={id} className="acc-body" hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
}

/** FAQ 手風琴：一次展開一題，預設開第一題。 */
export function FaqAccordion({ items }: { items: FaqEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <Accordion>
      {items.map((item, i) => (
        <AccordionItem
          key={item.q}
          title={item.q}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        >
          <p>{item.a}</p>
          <p className="src">手冊 {item.src}</p>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
