// 期限試算的純函式。日期一律以 UTC 毫秒表示，避免時區造成前後差一天。
//
// 三個假設（網站在試算區塊明示）：
// 1. 工作日以週一至週五計，另扣除使用者輸入的假日、加回補班日。
// 2. 條文寫「之日起」者當日算入，寫「翌日起」者次日算入（到期日較早的保守算法）。
// 3. 以月計算者，到期日為起算日在到期月份相當日的前一日；該月無相當日時為月底。末日遇假日不順延。

export const DAY = 864e5;
const WEEKDAY = '日一二三四五六';

export type Calendar = { holidays: Set<number>; makeupDays: Set<number> };
export const EMPTY_CALENDAR: Calendar = { holidays: new Set(), makeupDays: new Set() };

/** 'YYYY-MM-DD' → UTC 毫秒；格式不符回傳 null */
export function parseDate(s: string | null | undefined): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s ?? '');
  return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null;
}

/** 從自由文字抓出所有日期（YYYY-MM-DD、YYYY/M/D、YYYY.M.D） */
export function parseDateList(text: string): Set<number> {
  const set = new Set<number>();
  for (const s of text.match(/\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/g) ?? []) {
    const [y, m, d] = s.split(/[-/.]/).map(Number);
    const t = Date.UTC(y, m - 1, d);
    if (!Number.isNaN(t)) set.add(t);
  }
  return set;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function toInputValue(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function formatDate(t: number): string {
  const d = new Date(t);
  return `${d.getUTCFullYear()}/${pad(d.getUTCMonth() + 1)}/${pad(d.getUTCDate())}（${WEEKDAY[d.getUTCDay()]}）`;
}

export function formatRoc(t: number): string {
  const d = new Date(t);
  return `民國 ${d.getUTCFullYear() - 1911} 年 ${d.getUTCMonth() + 1} 月 ${d.getUTCDate()} 日`;
}

export function isWorkday(t: number, cal: Calendar = EMPTY_CALENDAR): boolean {
  if (cal.makeupDays.has(t)) return true;
  if (cal.holidays.has(t)) return false;
  const w = new Date(t).getUTCDay();
  return w >= 1 && w <= 5;
}

/** 第 n 個工作日。includeStart=true 表示「之日起」，false 表示「翌日起」 */
export function addWorkdays(t: number, n: number, includeStart: boolean, cal: Calendar = EMPTY_CALENDAR): number {
  let d = includeStart ? t : t + DAY;
  let count = 0;
  for (let guard = 0; guard < 4000; guard++) {
    if (isWorkday(d, cal)) {
      count++;
      if (count === n) return d;
    }
    d += DAY;
  }
  return d;
}

/** n 個月期間的末日 */
export function endOfMonths(t: number, n: number, includeStart: boolean): number {
  const s = new Date(includeStart ? t : t + DAY);
  const y = s.getUTCFullYear();
  const m = s.getUTCMonth() + n;
  const day = s.getUTCDate();
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return day <= last ? Date.UTC(y, m, day) - DAY : Date.UTC(y, m, last);
}

/** n 日期間的末日 */
export function endOfDays(t: number, n: number, includeStart: boolean): number {
  return (includeStart ? t : t + DAY) + (n - 1) * DAY;
}

export type DeadlineInput = {
  received: string; // 接獲申訴日
  accepted: string; // 受理決定日
  teamFormed: string; // 調查小組成立日（100 人以上）
  reportDone: string; // 調查報告完成日（100 人以上）
  mediationDays: number; // 調查期間內的協調日數（100 人以上）
  decided: string; // 作成決定日
  mediationStart: string; // 協調開始日
  mediationSigned: string; // 協調合意書簽章日
  noticeReceived: string; // 當事人收到決定書面通知日
  appealReceived: string; // 雇主接獲申復日
  meetingHeld: string; // 申復審議會議召開日
  appealDecided: string; // 申復決定日
  reinvestigate: boolean; // 是否再行調查
  conductEnded: string; // 霸凌行為終了日
  resigned: string; // 被霸凌勞工離職日
  redoRequested: string; // 主管機關要求重新調查日
  holidays: string;
  makeupDays: string;
};

export const EMPTY_INPUT: DeadlineInput = {
  received: '',
  accepted: '',
  teamFormed: '',
  reportDone: '',
  mediationDays: 0,
  decided: '',
  mediationStart: '',
  mediationSigned: '',
  noticeReceived: '',
  appealReceived: '',
  meetingHeld: '',
  appealDecided: '',
  reinvestigate: false,
  conductEnded: '',
  resigned: '',
  redoRequested: '',
  holidays: '',
  makeupDays: '',
};

export type DeadlineRow = {
  label: string;
  rule: string;
  date: number;
  law: string;
  /** true 法定、false 得參照、null 為當事人的期限（不是雇主義務） */
  must: boolean | null;
  /** 起算日未填，以前一步最晚日推算 */
  estimated?: boolean;
  ext?: { label: string; date: number };
};

export type DeadlineResult = { complaint: DeadlineRow[]; appeal: DeadlineRow[]; other: DeadlineRow[] };

/** scale：0 未達 10 人、1 10–29 人、2 30–99 人、3 100 人以上 */
export function computeDeadlines(input: DeadlineInput, scale: number): DeadlineResult {
  const cal: Calendar = { holidays: parseDateList(input.holidays), makeupDays: parseDateList(input.makeupDays) };
  const over30 = scale >= 2;
  const over100 = scale === 3;
  const complaint: DeadlineRow[] = [];
  const appeal: DeadlineRow[] = [];
  const other: DeadlineRow[] = [];

  const received = parseDate(input.received);
  let noticeBy: number | null = null;

  if (received != null) {
    const acceptBy = addWorkdays(received, 10, true, cal);
    complaint.push({
      label: '決定是否受理並書面通知申訴人',
      rule: '接獲申訴之日起 10 個工作日內',
      date: acceptBy,
      law: '§10',
      must: true,
    });

    const acceptedIn = parseDate(input.accepted);
    const accepted = acceptedIn ?? acceptBy;
    complaint.push({
      label: '登錄系統並通知申訴人',
      rule: '受理翌日起 7 個工作日內',
      date: addWorkdays(accepted, 7, false, cal),
      law: '§11',
      must: true,
      estimated: acceptedIn == null,
    });

    let decideBy: number;
    if (over100) {
      const teamBy = addWorkdays(accepted, 15, true, cal);
      complaint.push({
        label: '組成調查小組',
        rule: '受理申訴之日起 15 個工作日內',
        date: teamBy,
        law: '§14',
        must: true,
        estimated: acceptedIn == null,
      });

      const teamIn = parseDate(input.teamFormed);
      const team = teamIn ?? teamBy;
      const mediation = Math.max(0, Math.min(31, Math.floor(input.mediationDays) || 0)) * DAY;
      const reportBy = endOfMonths(team, 2, false) + mediation;
      complaint.push({
        label: '完成調查報告',
        rule: '調查小組成立後翌日起 2 個月內' + (mediation ? '，已加計協調日數' : ''),
        date: reportBy,
        law: '§17',
        must: true,
        estimated: teamIn == null,
        ext: { label: '必要時延長 1 個月', date: endOfMonths(team, 3, false) + mediation },
      });

      const reportIn = parseDate(input.reportDone);
      decideBy = endOfMonths(reportIn ?? reportBy, 1, true);
      complaint.push({
        label: '作成申訴成立與否之決定',
        rule: '調查報告完成之日起 1 個月內',
        date: decideBy,
        law: '§18',
        must: true,
        estimated: reportIn == null,
      });
    } else {
      const months = scale === 2 ? 4 : 3;
      decideBy = endOfMonths(received, months, false);
      complaint.push({
        label: '作成決定',
        rule: `接獲申訴翌日起 ${months} 個月內`,
        date: decideBy,
        law: scale === 2 ? '§21 Ⅱ' : '§21 Ⅰ',
        must: true,
        ext: { label: '必要時延長 1 個月', date: endOfMonths(received, months + 1, false) },
      });
    }

    const decidedIn = parseDate(input.decided);
    noticeBy = addWorkdays(decidedIn ?? decideBy, 10, true, cal);
    complaint.push({
      label: '書面通知當事人並登錄處理結果',
      rule: '作成決定之日起 10 個工作日內' + (over100 ? '' : '（手冊未對此規模另列日數，參照 100 人以上）'),
      date: noticeBy,
      law: '§18、§19',
      must: over100,
      estimated: decidedIn == null,
    });
  }

  const mediationStart = parseDate(input.mediationStart);
  if (mediationStart != null) {
    complaint.push({
      label: '協調最晚到這一天',
      rule: '自協調之日起逾 1 個月仍未達成共識，即應停止協調並續行調查',
      date: endOfMonths(mediationStart, 1, true),
      law: '§13',
      must: true,
    });
  }
  const mediationSigned = parseDate(input.mediationSigned);
  if (mediationSigned != null) {
    complaint.push({
      label: '協調成立後登錄處理結果',
      rule: '協調合意書簽章日起 10 個工作日內',
      date: addWorkdays(mediationSigned, 10, true, cal),
      law: '§13',
      must: true,
    });
  }

  const noticeIn = parseDate(input.noticeReceived);
  const notice = noticeIn ?? noticeBy;
  if (notice != null) {
    const appealBy = endOfDays(notice, 30, false);
    appeal.push({
      label: '當事人提起申復的最晚日',
      rule: '收到決定書面通知翌日起 30 日內，同一事件以 1 次為限',
      date: appealBy,
      law: '§22',
      must: null,
      estimated: noticeIn == null,
    });

    const appealIn = parseDate(input.appealReceived);
    const meetingBy = addWorkdays(appealIn ?? appealBy, 10, true, cal);
    appeal.push({
      label: '召開申復審議會議',
      rule: '接獲申復後 10 個工作日內',
      date: meetingBy,
      law: '§22',
      must: over30,
      estimated: appealIn == null,
    });

    const meetingIn = parseDate(input.meetingHeld);
    const decisionBy = endOfDays(meetingIn ?? meetingBy, input.reinvestigate ? 60 : 30, true);
    appeal.push({
      label: '作成附理由之申復決定',
      rule: input.reinvestigate ? '會議召開日起 30 日內，再行調查展延 30 日，合計 60 日' : '會議召開日起 30 日內',
      date: decisionBy,
      law: '§23',
      must: over30,
      estimated: meetingIn == null,
    });

    const decidedIn = parseDate(input.appealDecided);
    appeal.push({
      label: '書面通知申復人及相對人，並登錄申復結果',
      rule: '申復決定日起 10 個工作日內',
      date: addWorkdays(decidedIn ?? decisionBy, 10, true, cal),
      law: '§23',
      must: over30,
      estimated: decidedIn == null,
    });
  }

  const ended = parseDate(input.conductEnded);
  const resigned = parseDate(input.resigned);
  if (ended != null || resigned != null) {
    const a = ended != null ? endOfMonths(ended, 36, true) : null;
    const b = resigned != null ? endOfMonths(resigned, 12, true) : null;
    const parts: string[] = [];
    if (a != null) parts.push(`行為終了時起 3 年內（${formatDate(a)}）`);
    if (b != null) parts.push(`利用權勢情形，離職之日起 1 年內（${formatDate(b)}）`);
    if (a != null && b != null) parts.push('取較長者');
    other.push({
      label: '提起申訴的最晚日',
      rule: parts.join('；'),
      date: Math.max(a ?? -Infinity, b ?? -Infinity),
      law: '§10',
      must: null,
    });
  }
  const redo = parseDate(input.redoRequested);
  if (redo != null) {
    other.push({
      label: '重新調查作成決定',
      rule: '主管機關或勞動檢查機構要求重新調查之日起 2 個月內',
      date: endOfMonths(redo, 2, true),
      law: '§24',
      must: true,
    });
  }

  return { complaint, appeal, other };
}

export function resultToText(result: DeadlineResult, scaleLabel: string): string {
  const lines = [`職場霸凌申訴處理期限試算（${scaleLabel}）`];
  const groups: [string, DeadlineRow[]][] = [
    ['申訴處理', result.complaint],
    ['申復', result.appeal],
    ['申訴期限與重新調查', result.other],
  ];
  for (const [name, rows] of groups) {
    if (!rows.length) continue;
    lines.push('', `【${name}】`);
    for (const r of rows) {
      const duty = r.must == null ? '' : r.must ? '｜法定' : '｜得參照';
      lines.push(
        `${formatDate(r.date)}　${r.label}｜${r.rule}｜準則 ${r.law}${duty}${r.estimated ? '｜以前一步最晚日推算' : ''}`,
      );
      if (r.ext) lines.push(`　　${r.ext.label}：${formatDate(r.ext.date)}`);
    }
  }
  lines.push(
    '',
    '工作日以週一至週五計，並扣除自行輸入的假日；「之日起」當日算入，「翌日起」次日算入。實際起算以主管機關解釋為準。',
  );
  return lines.join('\n');
}
