'use client';

import { useEffect, useMemo, useState } from 'react';
import { SCALES } from '@/lib/data';
import {
  EMPTY_INPUT,
  computeDeadlines,
  formatDate,
  formatRoc,
  resultToText,
  toInputValue,
  type DeadlineInput,
  type DeadlineRow,
} from '@/lib/deadlines';
import { DutyBadge, useScale } from './ScaleContext';

type DateKey = {
  [K in keyof DeadlineInput]: DeadlineInput[K] extends string ? K : never;
}[keyof DeadlineInput];

function Rows({ rows, empty }: { rows: DeadlineRow[]; empty: string }) {
  if (!rows.length) return <p className="out-empty">{empty}</p>;
  return (
    <>
      {rows.map((r) => (
        <div className="out-row" key={r.label}>
          <div className="out-date">
            {formatDate(r.date)}
            <small>{formatRoc(r.date)}</small>
          </div>
          <div className="out-what">
            <b>{r.label}</b>
            {r.estimated ? <em className="est">以前一步最晚日推算</em> : null}
            <span>{r.rule}</span>
            {r.ext ? (
              <span className="ext">
                {r.ext.label}：{formatDate(r.ext.date)}
              </span>
            ) : null}
          </div>
          <div className="out-meta">
            {r.must == null ? null : <DutyBadge must={r.must} />}
            <span className="art">準則 {r.law}</span>
          </div>
        </div>
      ))}
    </>
  );
}

/** 期限試算：輸入日期，算出申訴處理、申復與重新調查各階段的最晚日期。 */
export default function DeadlineCalculator() {
  const { scale } = useScale();
  const [input, setInput] = useState<DeadlineInput>(EMPTY_INPUT);
  const [message, setMessage] = useState('');
  const [manualCopy, setManualCopy] = useState('');

  // 接獲申訴日預設為今天。放在 effect 內，避免伺服器與瀏覽器的日期不同。
  useEffect(() => {
    setInput((v) => (v.received ? v : { ...v, received: toInputValue(new Date()) }));
  }, []);

  const result = useMemo(() => computeDeadlines(input, scale), [input, scale]);
  const set = <K extends keyof DeadlineInput>(key: K, value: DeadlineInput[K]) =>
    setInput((v) => ({ ...v, [key]: value }));

  const dateField = (key: DateKey, label: string, hint?: string) => (
    <div className="field">
      <label htmlFor={`dl-${key}`}>{label}</label>
      <input type="date" id={`dl-${key}`} value={input[key]} onChange={(e) => set(key, e.target.value)} />
      {hint ? <small>{hint}</small> : null}
    </div>
  );

  const copy = () => {
    const text = resultToText(result, SCALES[scale].label);
    const fail = () => {
      setManualCopy(text);
      setMessage('無法自動複製，請選取下方文字手動複製。');
    };
    try {
      navigator.clipboard.writeText(text).then(() => {
        setManualCopy('');
        setMessage('已複製到剪貼簿。');
      }, fail);
    } catch {
      fail();
    }
  };

  const reset = () => {
    setInput(EMPTY_INPUT);
    setMessage('');
    setManualCopy('');
  };

  return (
    <div className="calc">
      <div className="note">
        <b>計算方式有三個假設，請先看過：</b>
        <ul>
          <li>工作日以週一至週五計。國定假日與補班日請自行填在下方，本站沒有內建行事曆。</li>
          <li>
            條文寫「之日起」者當日算入，寫「翌日起」者次日算入。這是到期日較早的保守算法，實際起算以主管機關解釋為準。
          </li>
          <li>以月計算者，到期日是起算日在到期月份相當日的前一日；末日遇假日不自動順延。</li>
        </ul>
      </div>

      <fieldset>
        <legend>申訴處理</legend>
        <div className="fields">
          {dateField('received', '接獲申訴日', '預設為今天，請改成實際日期')}
          {dateField('accepted', '受理決定日（選填）')}
          {scale === 3 ? (
            <>
              {dateField('teamFormed', '調查小組成立日（選填）')}
              {dateField('reportDone', '調查報告完成日（選填）')}
              <div className="field">
                <label htmlFor="dl-mediationDays">調查期間內的協調日數</label>
                <input
                  type="number"
                  id="dl-mediationDays"
                  min={0}
                  max={31}
                  value={input.mediationDays}
                  onChange={(e) => set('mediationDays', Number(e.target.value) || 0)}
                />
                <small>協調期間不計入調查報告期限</small>
              </div>
            </>
          ) : null}
          {dateField('decided', '作成決定日（選填）')}
          {dateField('mediationStart', '協調開始日（選填）')}
          {dateField('mediationSigned', '協調合意書簽章日（選填）')}
        </div>
        <div className="out" aria-live="polite" data-testid="out-complaint">
          <Rows rows={result.complaint} empty="輸入接獲申訴日後顯示。" />
        </div>
      </fieldset>

      <fieldset>
        <legend>申復</legend>
        <div className="fields">
          {dateField('noticeReceived', '當事人收到決定書面通知日（選填）', '未填時以上方通知期限推算')}
          {dateField('appealReceived', '雇主接獲申復日（選填）')}
          {dateField('meetingHeld', '申復審議會議召開日（選填）')}
          {dateField('appealDecided', '申復決定日（選填）')}
        </div>
        <label className="check" htmlFor="dl-reinvestigate">
          <input
            type="checkbox"
            id="dl-reinvestigate"
            checked={input.reinvestigate}
            onChange={(e) => set('reinvestigate', e.target.checked)}
          />
          組成申復調查小組再行調查（決定期限得展延 30 日）
        </label>
        <div className="out" aria-live="polite" data-testid="out-appeal">
          <Rows rows={result.appeal} empty="輸入收到決定書面通知日，或先在上方輸入接獲申訴日。" />
        </div>
      </fieldset>

      <fieldset>
        <legend>申訴期限與重新調查</legend>
        <div className="fields">
          {dateField('conductEnded', '霸凌行為終了日')}
          {dateField('resigned', '被霸凌勞工離職日', '被申訴人利用權勢（主管層級）時適用')}
          {dateField('redoRequested', '主管機關或勞檢機構要求重新調查日')}
        </div>
        <div className="out" aria-live="polite" data-testid="out-other">
          <Rows rows={result.other} empty="輸入日期後顯示。" />
        </div>
      </fieldset>

      <fieldset>
        <legend>工作日設定</legend>
        <div className="fields">
          <div className="field span2">
            <label htmlFor="dl-holidays">期間內的國定假日或公司非工作日</label>
            <textarea
              id="dl-holidays"
              placeholder="例：2026-10-09, 2026-10-26"
              value={input.holidays}
              onChange={(e) => set('holidays', e.target.value)}
            />
            <small>格式 YYYY-MM-DD，以逗號、空白或換行分隔</small>
          </div>
          <div className="field">
            <label htmlFor="dl-makeupDays">補班日</label>
            <textarea
              id="dl-makeupDays"
              placeholder="例：2026-02-07"
              value={input.makeupDays}
              onChange={(e) => set('makeupDays', e.target.value)}
            />
            <small>週末但要上班的日期</small>
          </div>
        </div>
      </fieldset>

      <div className="actions">
        <button className="btn" type="button" onClick={copy}>
          複製試算結果
        </button>
        <button className="btn ghost" type="button" onClick={reset}>
          清除日期
        </button>
        <span className="hint" role="status">
          {message}
        </span>
      </div>
      {manualCopy ? (
        <textarea
          className="copy-box"
          rows={8}
          readOnly
          aria-label="試算結果文字"
          value={manualCopy}
          onFocus={(e) => e.target.select()}
        />
      ) : null}
    </div>
  );
}
