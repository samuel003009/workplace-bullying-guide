'use client';

import { useState } from 'react';

/** 複製文字；瀏覽器拒絕時改為選取旁邊的文字，讓使用者手動複製。 */
export default function CopyButton({ text, selectId }: { text: string; selectId?: string }) {
  const [label, setLabel] = useState('複製');
  const flash = (s: string) => {
    setLabel(s);
    setTimeout(() => setLabel('複製'), 1500);
  };
  const fallback = () => {
    const el = selectId ? document.getElementById(selectId) : null;
    if (el) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
    flash('已選取');
  };
  const onClick = () => {
    try {
      navigator.clipboard.writeText(text).then(() => flash('已複製'), fallback);
    } catch {
      fallback();
    }
  };
  return (
    <button type="button" className="copy" onClick={onClick} aria-label={`複製 ${text}`}>
      {label}
    </button>
  );
}
