'use client';

import { DutyBadge, useScale } from './ScaleContext';

const ROWS = [
  {
    scales: [3],
    name: '100 人以上',
    size: '至少 3 人',
    external: '不得少於三分之二',
    gender: '不得少於三分之一',
    must: true,
  },
  {
    scales: [2],
    name: '30 人以上未達 100 人',
    size: '至少 3 人',
    external: '至少 1 人',
    gender: '不得少於三分之一',
    must: true,
  },
  { scales: [0, 1], name: '未達 30 人', size: null, external: null, gender: null, must: false },
];

/** 申復調查小組的組成，依規模列出並反白目前規模。 */
export default function AppealTeamTable() {
  const { scale } = useScale();
  return (
    <div className="tbl-wrap">
      <table className="scale-table">
        <thead>
          <tr>
            <th scope="col">規模</th>
            <th scope="col">成員人數</th>
            <th scope="col">外部專業人士</th>
            <th scope="col">任一性別比例</th>
            <th scope="col">義務</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.name} className={r.scales.includes(scale) ? 'cur' : undefined}>
              <th scope="row">{r.name}</th>
              {r.size ? (
                <>
                  <td>{r.size}</td>
                  <td>{r.external}</td>
                  <td>{r.gender}</td>
                </>
              ) : (
                <td colSpan={3}>得參照辦理</td>
              )}
              <td>
                <DutyBadge must={r.must} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
