import type { Metadata } from 'next';
import Link from 'next/link';
import { ScaleOnly } from '@/components/ScaleContext';
import ScalePicker from '@/components/ScalePicker';

export const metadata: Metadata = {
  description: '選擇僱用人數，查看職場霸凌防治的法定義務、處理步驟與每一個期限。',
};

export default function HomePage() {
  return (
    <>
      <div className="hero">
        <p className="eyebrow">勞動部指導手冊 115年6月版・非官方導覽</p>
        <h1>職場霸凌防治，你的公司該做哪些事</h1>
        <p className="lead">
          依勞動部《職場霸凌防治措施指導手冊》整理。選擇僱用人數，就能看到法定義務、處理步驟與每一個期限。
        </p>
      </div>

      <ScalePicker />

      <div className="block">
        <h2>處理流程</h2>
        <ol className="flow">
          <li>
            <Link href="/definition">
              <i>01</i>
              <b>認識</b>
              <span>定義與四類樣態</span>
            </Link>
          </li>
          <li>
            <Link href="/prevention">
              <i>02</i>
              <b>預防</b>
              <span>管道、規範、訓練</span>
            </Link>
          </li>
          <li>
            <Link href="/response">
              <i>03</i>
              <b>知悉</b>
              <span>立即有效的措施</span>
            </Link>
          </li>
          <li>
            <Link href="/process">
              <i>04</i>
              <b>申訴調查</b>
              <span>受理、協調、調查</span>
            </Link>
          </li>
          <li>
            <Link href="/appeal">
              <i>05</i>
              <b>申復</b>
              <span>不服決定的救濟</span>
            </Link>
          </li>
          <li>
            <Link href="/appeal#after">
              <i>06</i>
              <b>追蹤</b>
              <span>懲處、保護、紀錄</span>
            </Link>
          </li>
        </ol>
      </div>

      <div className="block">
        <h2>關鍵期限</h2>
        <div className="dl">
          <div className="dl-row">
            <span className="big">10 個工作日內</span>
            <span>接獲申訴後，決定是否受理並書面通知申訴人</span>
            <span className="art">準則 §10</span>
          </div>
          <div className="dl-row">
            <span className="big">7 個工作日內</span>
            <span>受理翌日起，登錄系統並通知申訴人</span>
            <span className="art">準則 §11</span>
          </div>
          <ScaleOnly scales={[0, 1]}>
            <div className="dl-row">
              <span className="big">3 個月內</span>
              <span>接獲申訴翌日起作成決定，必要時得延長 1 個月</span>
              <span className="art">準則 §21</span>
            </div>
          </ScaleOnly>
          <ScaleOnly scales={[2]}>
            <div className="dl-row">
              <span className="big">4 個月內</span>
              <span>接獲申訴翌日起作成決定，必要時得延長 1 個月</span>
              <span className="art">準則 §21</span>
            </div>
          </ScaleOnly>
          <ScaleOnly scales={[3]}>
            <div className="dl-row">
              <span className="big">15 個工作日內</span>
              <span>受理之日起組成調查小組；小組成立後翌日起 2 個月內完成報告；報告完成之日起 1 個月內作成決定</span>
              <span className="art">準則 §14、§17、§18</span>
            </div>
          </ScaleOnly>
          <div className="dl-row">
            <span className="big">30 日內</span>
            <span>當事人收到決定書面通知翌日起，可提起申復，同一事件以 1 次為限</span>
            <span className="art">準則 §22</span>
          </div>
          <div className="dl-row">
            <span className="big">3 年</span>
            <span>預防、受理、協調、調查與申復的執行紀錄留存年限</span>
            <span className="art">準則 §26</span>
          </div>
        </div>
        <p>
          <Link href="/tools">輸入日期，試算自己案件的期限</Link>
        </p>
      </div>

      <div className="block">
        <h2>依角色進入</h2>
        <div className="grid2 roles">
          <Link href="/obligations">
            <b>雇主、人資與法遵</b>
            <span>確認義務、訂規範、設申訴管道、辦教育訓練。</span>
            <em>規模義務檢核</em>
          </Link>
          <Link href="/process">
            <b>申訴處理與調查人員</b>
            <span>在期限內完成受理、協調、調查、決定與申復。</span>
            <em>申訴與調查</em>
          </Link>
          <Link href="/response">
            <b>各級主管</b>
            <span>接獲反映或聽聞事件後，第一時間該做的四件事。</span>
            <em>知悉後處置</em>
          </Link>
          <Link href="/help">
            <b>勞工與其他工作者</b>
            <span>法律、心理與通報資源，以及各機關的聯絡方式。</span>
            <em>協助資源</em>
          </Link>
        </div>
      </div>

      <p className="note">
        <b>新制施行日：</b>職業安全衛生法職場霸凌防治專章（第二章之一）與職場霸凌防治措施準則，自
        115年7月1日施行。本站不是政府網站，不受理申訴。
      </p>
    </>
  );
}
