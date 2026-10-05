import type { Metadata } from 'next';
import { FaqAccordion } from '@/components/Accordion';
import ResourceCard, { PhoneNumber } from '@/components/ResourceCard';
import SourceTables from '@/components/SourceTables';
import { FAQ, RES15, RES16 } from '@/lib/data';

export const metadata: Metadata = {
  title: '協助資源與常見問題',
  description: '手冊附錄 15、16 所列的機關與專線、12 個常見問題，以及本站內容與手冊章節的對照。',
};

export default function HelpPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">工具</p>
        <h1>協助資源與常見問題</h1>
        <p className="lead">
          手冊附錄 15、16
          列出的機關與專線。雇主無法在組織內提供法律、醫療或心理資源時，可轉介給申訴人；勞工也可以直接使用。
        </p>
      </div>

      <div className="urgent">
        <div className="panel">
          <h3>人身安全受威脅</h3>
          <PhoneNumber number="110" />
          <p className="tip">涉及公然侮辱、傷害、妨害名譽、恐嚇、跟蹤騷擾等。不便出聲時可用「110 視訊報案」APP。</p>
        </div>
        <div className="panel">
          <h3>情緒困擾、壓力很大</h3>
          <PhoneNumber number="1925" />
          <p className="tip">衛生福利部安心專線，24 小時服務。</p>
        </div>
      </div>

      <section className="block" aria-labelledby="res15-title">
        <h2 id="res15-title">事件處理與通報</h2>
        <div className="cards">
          {RES15.map((r) => (
            <ResourceCard key={r.org} resource={r} />
          ))}
        </div>
        <p className="src">手冊 p.57 附錄 15</p>
      </section>

      <section className="block" aria-labelledby="res16-title">
        <h2 id="res16-title">身心健康諮詢及輔導</h2>
        <div className="cards">
          {RES16.map((r) => (
            <ResourceCard key={r.org} resource={r} />
          ))}
        </div>
        <p className="src">手冊 p.58 附錄 16</p>
        <p className="hint">電話與網址依手冊 115年6月版所載，使用前請再確認是否有異動。</p>
      </section>

      <section className="part" id="faq" aria-labelledby="faq-title">
        <div className="part-head">
          <h2 id="faq-title">常見問題</h2>
          <p className="lead">12 個問題的答案都出自手冊內容，每題附手冊頁碼。</p>
        </div>
        <FaqAccordion items={FAQ} />
      </section>

      <section className="part" id="source" aria-labelledby="source-title">
        <div className="part-head">
          <h2 id="source-title">內容對照</h2>
          <p className="lead">本站每一頁對應的手冊章節、頁碼與法規條文。頁碼是手冊印刷頁碼；條號依手冊內文的引註。</p>
        </div>
        <SourceTables />
        <div className="block">
          <h3>資料版本與限制</h3>
          <ul className="prose">
            <li>資料來源：勞動部《職場霸凌防治措施指導手冊》，115年6月。</li>
            <li>手冊自述其內容並非唯一方法，事業單位可選擇適合其規模與特性的方法規劃及執行。</li>
            <li>本站是非官方整理，不受理申訴，不提供個案法律意見。內容與手冊或法規不一致時，以手冊與法規為準。</li>
          </ul>
        </div>
      </section>
    </>
  );
}
