import type { Metadata } from 'next';
import DutyMatrix from '@/components/DutyMatrix';
import TodoList from '@/components/TodoList';

export const metadata: Metadata = {
  title: '規模義務檢核',
  description: '依僱用勞工人數列出職場霸凌防治的法定與得參照事項。',
};

export default function ObligationsPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">認識</p>
        <h1>規模義務檢核</h1>
        <p className="lead">
          義務依僱用勞工人數分四級。所有雇主都要預防並在知悉後處置；10 人以上要設申訴管道；30
          人以上要訂規範、辦訓練、設申訴處理單位；100 人以上還要組調查小組。
        </p>
      </div>

      <div className="block">
        <h2>義務矩陣</h2>
        <DutyMatrix />
        <p className="hint">「教育訓練」一列出自手冊第伍章之四，不在手冊表 1 內；其餘六列與表 1 相同。</p>
        <p className="src">手冊 p.5–8 表 1・準則 §4–§7、§9、§14、§22</p>
      </div>

      <TodoList />

      <div className="block">
        <h2>人數怎麼算</h2>
        <ul className="prose">
          <li>計算對象是事業單位受僱從事工作獲致工資者。</li>
          <li>
            事業分散於不同地區者，以各地區該單位僱用勞工之人數<b>分別計算</b>。分公司、分廠、分行、營運處各自計算。
          </li>
          <li>這和性別平等工作法不同：性別平等工作法把各分支機構及附屬單位的人數併計。</li>
          <li>
            地區事業單位的認定，以負責人是否具一般經營管理權及擔負職安法預防職業災害義務為原則，並就是否具獨自之經營簿冊、獨立人事權、個別統一編號、營利（業）登記或工廠登記等事項，由勞動檢查機構綜合認定。
          </li>
        </ul>
        <p className="src">手冊 p.4 註 2・準則 §3</p>
      </div>
    </>
  );
}
