import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '認識職場霸凌',
  description: '職場霸凌的法定定義、認定原則與四類樣態。',
};

export default function DefinitionPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">認識</p>
        <h1>認識職場霸凌</h1>
        <p className="lead">
          法定定義在職業安全衛生法第 22 條之
          1，要同時符合六個要件。原則上要反覆或持續發生，情節重大的單一事件也可能成立。
        </p>
      </div>

      <div className="block">
        <h2>法定定義</h2>
        <blockquote>
          勞工於勞動場所執行職務，因其事業單位人員利用職務或權勢等關係，逾越業務上必要且合理範圍，持續以冒犯、威脅、冷落、孤立、侮辱或其他不當之言詞或行為，致其身心健康遭受危害。但情節重大者，不以持續發生為必要。
        </blockquote>
        <ul className="elems">
          <li>
            <i>對象</i>
            <span>勞工。實務上，受工作場所負責人指揮或監督的工作者比照適用</span>
          </li>
          <li>
            <i>情境</i>
            <span>於勞動場所執行職務</span>
          </li>
          <li>
            <i>行為人</i>
            <span>事業單位人員，利用職務或權勢等關係</span>
          </li>
          <li>
            <i>界線</i>
            <span>逾越業務上必要且合理範圍</span>
          </li>
          <li>
            <i>行為</i>
            <span>持續以冒犯、威脅、冷落、孤立、侮辱或其他不當之言詞或行為</span>
          </li>
          <li>
            <i>結果</i>
            <span>致身心健康遭受危害</span>
          </li>
        </ul>
        <p className="src">手冊 p.2・職安法 §22-1</p>
      </div>

      <div className="block">
        <h2>怎麼認定</h2>
        <div className="grid2">
          <div className="panel">
            <h3>原則：反覆或持續發生</h3>
            <p>不當言行是否屬職場霸凌，以反覆或持續發生為原則。</p>
            <p>認定時除了符合定義，還要綜合審酌事件的：</p>
            <div className="tag-row">
              <span className="tag">背景</span>
              <span className="tag">頻率</span>
              <span className="tag">場所</span>
              <span className="tag">行為人動機</span>
              <span className="tag">行為人目的</span>
            </div>
          </div>
          <div className="panel">
            <h3>例外：情節重大的單一事件</h3>
            <p>單一偶發事件是否屬情節重大，綜合考量五個因素：</p>
            <div className="tag-row">
              <span className="tag">侵害強度</span>
              <span className="tag">權力差距</span>
              <span className="tag">公開性</span>
              <span className="tag">羞辱性</span>
              <span className="tag">對受害者身心影響程度</span>
            </div>
          </div>
        </div>
        <p className="src">手冊 p.2</p>
      </div>

      <div className="block">
        <h2>四類樣態</h2>
        <p className="prose">手冊列出四類典型樣態，並說明「包含但不限於」這四類。</p>
        <div className="grid2">
          <div className="panel">
            <h3>社交排斥</h3>
            <p>對特定人刻意排擠、忽視、冷落，不讓參與必要之重要會議、事務或活動。</p>
            <p className="eg">
              <b>例</b>　主管故意不把特定勞工加入工作上必要的通訊群組，或所有工作會議都刻意排除特定勞工參加。
            </p>
          </div>
          <div className="panel">
            <h3>職務干預</h3>
            <p>對特定人破壞或刻意阻礙其工作、利用職務刁難、刻意隱瞞資訊或提供不實資訊。</p>
            <p className="eg">
              <b>例</b>　主管指派特定勞工做財務會計工作，卻同時封鎖該勞工登入公司會計系統的權限。
            </p>
          </div>
          <div className="panel">
            <h3>權力濫用</h3>
            <p>對特定人以權力欺壓，刻意分配不合理工作目標或與能力明顯不符之工作。最典型的是要求過高與要求過低。</p>
            <p className="eg">
              <b>時間上要求過高</b>　明知某件工作的合理工時是一週，卻在下班前要求隔日早上提交，否則記過或開除。
            </p>
            <p className="eg">
              <b>能力上要求過高</b>　要求沒學過外文的工程師用德文與德國客戶磋商業務合約。
            </p>
            <p className="eg">
              <b>要求過低</b>
              　基於逼退或羞辱的意圖「大材小用」，不讓高階工程師處理專業領域的工作，反而命其處理低階助理工作。
            </p>
          </div>
          <div className="panel">
            <h3>名譽侵害</h3>
            <p>對特定人刻意散布其謠言或揭露隱私。</p>
            <p className="eg">
              <b>例</b>　為破壞特定勞工的職場地位或升遷機會，在同事之間散布關於該勞工的不實負面訊息。
            </p>
          </div>
        </div>
        <p className="src">手冊 p.3–4</p>
      </div>

      <div className="block">
        <h2>適用對象與場所</h2>
        <ul className="prose">
          <li>手冊適用於各業；其他法律有特別規定者，從其規定。</li>
          <li>除受僱勞工外，受工作場所負責人指揮或監督從事勞動之人員（工作者），比照事業單位勞工一併適用。</li>
          <li>
            勞動場所指：勞動契約存續中由雇主所提示、使勞工履行契約提供勞務之場所；自營作業者實際從事勞動之場所；其他受工作場所負責人指揮或監督從事勞動之人員實際從事勞動之場所。
          </li>
        </ul>
        <p className="note">
          不符合定義的人際衝突或偶發不當言行，雇主仍應視事件內容適當處理；涉及職場不法侵害或工作場所性騷擾時，應移送權責單位。
        </p>
        <p className="src">手冊 p.2、p.17・職安法 §1、§2、§51</p>
      </div>
    </>
  );
}
