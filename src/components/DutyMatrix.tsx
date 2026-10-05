'use client';

import { DUTIES, SCALES } from '@/lib/data';
import { IconMay, IconMust, useScale } from './ScaleContext';

/** 義務矩陣：7 項義務 × 4 級規模，所選規模的欄位反白。 */
export default function DutyMatrix() {
  const { scale } = useScale();
  return (
    <>
      <div className="tbl-wrap">
        <table className="matrix">
          <thead>
            <tr>
              <th scope="col">應辦事項</th>
              {SCALES.map((s, i) => (
                <th key={s.label} scope="col" className={i === scale ? 'c cur' : 'c'}>
                  {s.label}
                </th>
              ))}
              <th scope="col">準則</th>
            </tr>
          </thead>
          <tbody>
            {DUTIES.map((d) => (
              <tr key={d.name}>
                <th scope="row">{d.name}</th>
                {SCALES.map((s, i) => {
                  const must = s.min >= d.min;
                  return (
                    <td key={s.label} className={i === scale ? 'c cur' : 'c'}>
                      <span
                        className={`mark ${must ? 'must' : 'may'}`}
                        role="img"
                        aria-label={must ? '法定' : '得參照'}
                      >
                        {must ? <IconMust /> : <IconMay />}
                      </span>
                    </td>
                  );
                })}
                <td className="mono">{d.law}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="legend">
        <span>
          <span className="mark must">
            <IconMust />
          </span>
          法定應辦事項
        </span>
        <span>
          <span className="mark may">
            <IconMay />
          </span>
          得參照辦理
        </span>
        <span>反白欄位是你選的規模</span>
      </div>
    </>
  );
}
