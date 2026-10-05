import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addWorkdays,
  endOfMonths,
  endOfDays,
  computeDeadlines,
  EMPTY_INPUT,
  parseDateList,
} from '../src/lib/deadlines.ts';

const U = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d);
const iso = (t: number) => new Date(t).toISOString().slice(0, 10);

test('工作日：之日起當日算入，週末略過', () => {
  assert.equal(iso(addWorkdays(U(2026, 10, 5), 10, true)), '2026-10-16');
  assert.equal(iso(addWorkdays(U(2026, 10, 3), 10, true)), '2026-10-16');
});

test('工作日：翌日起次日算入', () => {
  assert.equal(iso(addWorkdays(U(2026, 10, 16), 7, false)), '2026-10-27');
});

test('工作日：扣除假日、加回補班日', () => {
  const cal = { holidays: parseDateList('2026-10-09'), makeupDays: new Set<number>() };
  assert.equal(iso(addWorkdays(U(2026, 10, 5), 10, true, cal)), '2026-10-19');
  const cal2 = { holidays: new Set<number>(), makeupDays: parseDateList('2026/10/10') };
  assert.equal(iso(addWorkdays(U(2026, 10, 5), 10, true, cal2)), '2026-10-15');
});

test('以月計算：相當日的前一日，無相當日取月底', () => {
  assert.equal(iso(endOfMonths(U(2026, 10, 5), 4, false)), '2027-02-05');
  assert.equal(iso(endOfMonths(U(2026, 11, 29), 3, false)), '2027-02-28');
  assert.equal(iso(endOfMonths(U(2027, 2, 28), 1, false)), '2027-03-31');
  assert.equal(iso(endOfMonths(U(2026, 10, 5), 1, true)), '2026-11-04');
  assert.equal(iso(endOfMonths(U(2026, 10, 5), 36, true)), '2029-10-04');
});

test('以日計算', () => {
  assert.equal(iso(endOfDays(U(2026, 10, 5), 30, false)), '2026-11-04');
  assert.equal(iso(endOfDays(U(2026, 10, 5), 30, true)), '2026-11-03');
});

test('30–99 人：4 個月決定期限，通知期限標為得參照', () => {
  const r = computeDeadlines({ ...EMPTY_INPUT, received: '2026-10-06' }, 2);
  assert.deepEqual(
    r.complaint.map((x) => iso(x.date)),
    ['2026-10-19', '2026-10-28', '2027-02-06', '2027-02-19'],
  );
  assert.equal(r.complaint[3].must, false);
  assert.equal(iso(r.complaint[2].ext!.date), '2027-03-06');
  assert.equal(r.appeal.length, 4);
  assert.equal(r.appeal[0].must, null);
});

test('100 人以上：調查小組、報告、決定三段期限', () => {
  const r = computeDeadlines({ ...EMPTY_INPUT, received: '2026-10-06' }, 3);
  assert.deepEqual(
    r.complaint.map((x) => x.law),
    ['§10', '§11', '§14', '§17', '§18', '§18、§19'],
  );
  // 受理 10/19 → 小組 15 個工作日（含當日）11/06 → 報告翌日起 2 個月 2027/01/06 → 決定 1 個月 2027/02/05
  assert.deepEqual(
    r.complaint.slice(2, 5).map((x) => iso(x.date)),
    ['2026-11-06', '2027-01-06', '2027-02-05'],
  );
  assert.ok(r.complaint.every((x) => x.must === true));
});

test('未達 30 人：3 個月決定期限，申復流程為得參照', () => {
  const r = computeDeadlines({ ...EMPTY_INPUT, received: '2026-10-06' }, 0);
  assert.equal(iso(r.complaint[2].date), '2027-01-06');
  assert.equal(r.appeal[1].must, false);
});

test('申訴期限：3 年與離職後 1 年取較長者', () => {
  const r = computeDeadlines({ ...EMPTY_INPUT, conductEnded: '2026-10-05', resigned: '2029-06-30' }, 2);
  assert.equal(iso(r.other[0].date), '2030-06-29');
});
