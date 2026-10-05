'use client';

import { useState } from 'react';
import { FORMS } from '@/lib/data';

const STAGES = ['全部', ...Array.from(new Set(FORMS.map((f) => f.stage)))];

/** 附錄 1–14 的範本卡，可依流程階段篩選。 */
export default function FormsBrowser() {
  const [stage, setStage] = useState('全部');
  const list = FORMS.filter((f) => stage === '全部' || f.stage === stage);
  return (
    <>
      <div className="chips" role="group" aria-label="依流程階段篩選">
        {STAGES.map((s) => (
          <button key={s} type="button" aria-pressed={s === stage} onClick={() => setStage(s)}>
            {s}
          </button>
        ))}
      </div>
      <div className="cards">
        {list.map((f) => (
          <article className="card" key={f.no}>
            <div className="card-top">
              <span className="card-no">
                附錄 {f.no}・{f.stage}
              </span>
              <span className="card-pg">手冊 {f.pg}</span>
            </div>
            <h3>{f.name}</h3>
            <p>{f.use}</p>
            <dl className="kv">
              <dt>填寫人</dt>
              <dd>{f.who}</dd>
              <dt>主要內容</dt>
              <dd>{f.fields}</dd>
            </dl>
          </article>
        ))}
      </div>
    </>
  );
}
