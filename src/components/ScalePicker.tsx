'use client';

import Link from 'next/link';
import { DUTIES, SCALES, mustCount } from '@/lib/data';
import { useScale } from './ScaleContext';

/** 首頁的規模提問：選完直接看到該規模的法定項目數。 */
export default function ScalePicker() {
  const { scale, setScale } = useScale();
  return (
    <div className="pick">
      <h2 id="pick-title">事業單位僱用幾位勞工？</h2>
      <div className="pick-opts" role="group" aria-labelledby="pick-title">
        {SCALES.map((s, i) => (
          <button key={s.label} type="button" aria-pressed={i === scale} onClick={() => setScale(i)}>
            <b>{s.label}</b>
            <span>法定 {mustCount(i)} 項</span>
          </button>
        ))}
      </div>
      <div className="pick-out">
        <p>
          <b>{SCALES[scale].label}：</b>
          {DUTIES.length} 項防治措施中，<b className="num">{mustCount(scale)}</b> 項是法定義務，其餘得參照辦理。
        </p>
        <Link className="cta" href="/obligations">
          看這個規模的待辦清單
        </Link>
      </div>
      <p className="hint">人數以各地區事業單位分別計算，不是全公司合計。算法見「規模義務檢核」。</p>
    </div>
  );
}
