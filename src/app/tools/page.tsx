import type { Metadata } from 'next';
import DeadlineCalculator from '@/components/DeadlineCalculator';
import { OSHA_ZONE_URL } from '@/components/Footer';
import FormsBrowser from '@/components/FormsBrowser';

export const metadata: Metadata = {
  title: '期限試算與書表範本',
  description: '輸入日期試算申訴處理、申復與重新調查的期限，並查看手冊附錄 1 至 14 各份書表的用途與欄位。',
};

export default function ToolsPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">工具</p>
        <h1>期限試算與書表範本</h1>
        <p className="lead">
          兩個處理案件時會反覆用到的工具：用實際日期算出每一步的最晚日期，以及手冊 14 份書表範本的用途與欄位。
        </p>
      </div>

      <section className="block" id="deadline" aria-labelledby="deadline-title">
        <h2 id="deadline-title">期限試算</h2>
        <p className="prose">
          輸入日期，算出申訴處理、申復與重新調查各階段的最晚日期。沒填的日期會用前一步的最晚日往下推。結果依上方所選規模變動。
        </p>
        <DeadlineCalculator />
        <p className="src">手冊 p.16–19、p.22–31・準則 §10、§11、§13、§14、§17、§18、§19、§21–§24</p>
      </section>

      <section className="part" id="forms" aria-labelledby="forms-title">
        <div className="part-head">
          <h2 id="forms-title">書表範本</h2>
          <p className="lead">
            手冊附錄 1 至 14
            是處理規範與各階段書表的範本。這裡列出每一份的用途、使用時點與主要欄位；原始檔請到職安署專區下載。
          </p>
          <p>
            <a href={OSHA_ZONE_URL} target="_blank" rel="noopener noreferrer">
              勞動部職業安全衛生署「職場霸凌防治專區」
            </a>
          </p>
        </div>
        <FormsBrowser />
        <p className="hint">範本為參考用，請依實際組織名稱、申訴處理單位、申訴管道及權責層級調整後使用。</p>
        <p className="src">手冊 p.33–56 附錄 1–14</p>
      </section>
    </>
  );
}
