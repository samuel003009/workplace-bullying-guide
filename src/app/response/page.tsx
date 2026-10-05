import type { Metadata } from 'next';
import Link from 'next/link';
import { Req } from '@/components/ScaleContext';

export const metadata: Metadata = {
  title: '知悉後處置',
  description: '雇主知悉職場霸凌後應採取的立即有效措施：因申訴知悉與非因申訴知悉兩條路徑。',
};

export default function ResponsePage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">處理</p>
        <h1>知悉後處置</h1>
        <p className="lead">
          雇主一知悉勞工遭受職場霸凌，就要採取立即有效的適當措施。作法依「是否由被霸凌勞工申訴而知悉」分成兩條路徑，各有四項措施。
        </p>
        <p>
          <Req min={0} />
        </p>
      </div>

      <div className="grid2">
        <div className="block">
          <h2>路徑 A　因申訴而知悉</h2>
          <div className="panel">
            <h3>1　隔離保護</h3>
            <p>考量申訴人意願，採取適當之隔離等措施，避免職場霸凌再度發生，並不得對申訴人有不利對待。</p>
            <p className="tip">
              <b>建議作法</b>
              在兼顧申訴人意願及隱私的前提下，調整相關人員的工作內容、座位、工作地點、工作時段（班次），或變更為居家辦公。
            </p>
          </div>
          <div className="panel">
            <h3>2　提供協助</h3>
            <p>依申訴人需求，提供或轉介法律等諮詢服務、醫療或心理諮商、社會福利資源及其他必要之協助或保護措施。</p>
            <p className="tip">
              <b>建議作法</b>
              涉及人身安全或緊急醫療需求時，即時協助通報警察、消防或醫護單位。通知家屬或緊急聯絡人原則上應取得申訴人同意；申訴人意識不清、生命身體安全有急迫危險或法律另有規定者除外。出現嚴重焦慮或身心症狀者，主動協助就醫或尋求專業鑑定。
            </p>
            <p className="tip">
              <b>建議作法</b>協助申訴人即時保留證據，但不宜實質調查及過度訪談，以免影響後續調查或造成重複詢問。
            </p>
            <p className="tip">
              <b>建議作法</b>無法在組織內提供諮詢資源時，轉介政府、公會或民間社福資源。
              <Link href="/help">看協助資源</Link>
            </p>
          </div>
          <div className="panel">
            <h3>3　啟動調查</h3>
            <p>
              對申訴事件之相關人員進行訪談及調查。申訴人有意願者得進行協調；協調不成立，或已逾 1
              個月雙方未達成共識時，應續行調查。
            </p>
          </div>
          <div className="panel">
            <h3>4　懲戒或處理</h3>
            <p>依調查結果，視情節輕重對行為人為適當之懲戒或處理。</p>
            <p className="tip">
              <b>手冊說明</b>
              懲處不以認定職場霸凌成立為必要。行為人確有不當言行或不適任者，即可依工作規則或人事懲處規範處理。
            </p>
          </div>
          <p className="src">手冊 p.11–12・準則 §7 第 1 項第 1 款</p>
        </div>

        <div className="block">
          <h2>路徑 B　非因申訴而知悉</h2>
          <div className="panel">
            <h3>1　釐清查證</h3>
            <p>例如他人舉報或媒體報導揭露。雇主應訪談相關人員，就相關事實進行必要之釐清及查證。</p>
            <p className="tip">
              <b>建議作法</b>
              由申訴處理單位以問卷調查，或訪談當事人同部門、相關部門人員；以不公開為原則。忠實呈現被霸凌勞工與行為人之言行及證人之陳述，不加渲染或價值判斷。
            </p>
          </div>
          <div className="panel">
            <h3>2　告知權益</h3>
            <p>告知被霸凌勞工得主張之權益及救濟途徑，並依其意願協助協調或提起申訴。</p>
            <ul>
              <li>有意願申訴者：協助提起申訴，之後依路徑 A 處理。</li>
              <li>不願申訴但願意協調者：依協調機制辦理。</li>
            </ul>
          </div>
          <div className="panel">
            <h3>3　調整工作</h3>
            <p>對相關人員適度調整工作內容或工作場所。</p>
            <p className="tip">
              <b>建議作法</b>
              在尊重被霸凌勞工意願的前提下，調整相關人員的工作內容、座位、工作地點或工作時段。經釐清行為人確有不當言行者，可依工作規則進行適當之懲戒或處理。
            </p>
          </div>
          <div className="panel">
            <h3>4　提供協助</h3>
            <p>
              依被霸凌勞工意願，提供或轉介法律等諮詢服務、醫療或心理諮商處理、社會福利資源及其他必要之協助或保護措施。
            </p>
          </div>
          <p className="src">手冊 p.12–13・準則 §7 第 1 項第 2 款</p>
        </div>
      </div>

      <div className="block">
        <h2>兩條路徑都要注意</h2>
        <ul className="prose">
          <li>措施涉及工作調整等勞動條件事項時，應符合勞動基準法相關規定。</li>
          <li>
            被霸凌勞工向雇主陳述，但沒有協調或提起申訴的意願時，雇主仍應依路徑 B
            採取適當措施；必要時於釐清事實後糾正行為人，並要求其改善。
          </li>
        </ul>
        <p className="src">手冊 p.14</p>
      </div>
    </>
  );
}
