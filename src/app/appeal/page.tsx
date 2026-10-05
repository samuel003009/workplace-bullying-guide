import type { Metadata } from 'next';
import { Req, ScaleOnly } from '@/components/ScaleContext';
import { Timeline, TimelineItem } from '@/components/Timeline';
import AppealTeamTable from '@/components/AppealTeamTable';

export const metadata: Metadata = {
  title: '申復與後續',
  description: '申復期限、審議與再行調查，以及懲處、申訴者保護、追蹤改善與紀錄保存。',
};

export default function AppealPage() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">處理</p>
        <h1>申復與後續</h1>
        <p className="lead">
          當事人不服成立與否的決定，可在收到書面通知翌日起 30 日內以書面申復，同一事件以 1
          次為限。申訴處理單位會再檢視調查程序是否完備，必要時再行調查。
        </p>
      </div>

      <Timeline>
        <TimelineItem
          when={
            <>
              <b>30 日內</b>
              <span>收到決定書面通知翌日起</span>
            </>
          }
          title={<>1　提起申復</>}
        >
          <p>當事人（申訴人或被申訴人）以書面具明理由，向雇主提出申復（附錄 13）。同一事件以 1 次為限。</p>
          <ScaleOnly scales={[0, 1]}>
            <p className="hint">手冊圖 2 註明：僱用未達 30 人之雇主，申復處理流程得參照辦理。</p>
          </ScaleOnly>
          <p className="src">手冊 p.28、p.31・準則 §22 第 1 項</p>
        </TimelineItem>
        <TimelineItem
          when={
            <>
              <b>10 個工作日內</b>
              <span>接獲申復後</span>
            </>
          }
          title={
            <>
              2　召開申復審議會議 <Req min={30} />
            </>
          }
        >
          <p>
            由申訴處理單位成員推舉召集人召開。會議進行時應給予申復人陳述意見之機會，並得邀原調查小組成員或相關人員列席說明。
          </p>
          <p className="src">手冊 p.28・準則 §22 第 2、3 項</p>
        </TimelineItem>
        <TimelineItem
          when={
            <>
              <b>會議中判斷</b>
              <span>是否再行調查</span>
            </>
          }
          title={<>3　必要時組成申復調查小組再行調查</>}
        >
          <p>會議發現調查處理程序有重大瑕疵，或有足以影響原調查認定之新事證時，應組成申復調查小組再行調查。</p>
          <p className="sub">調查程序有重大瑕疵，指下列情形之一</p>
          <ol>
            <li>
              申訴處理單位未符合準則第 9 條第 1 項規定，或調查小組之組成及資格未符合第 14 條第 2 項至第 4 項之規定。
            </li>
            <li>未給予當事人任一方陳述意見之機會。</li>
            <li>違反準則第 15 條規定，有應迴避而未迴避之情形。</li>
            <li>有足以影響調查結果而未採納之重要事證或其他重大瑕疵。</li>
          </ol>
          <p className="sub">申復調查小組的組成</p>
          <AppealTeamTable />
          <p>
            部分成員得為原調查小組之成員。外部專業人士應具勞動權益或相關事務處理經驗，得自勞動部建立之職場霸凌調查專業人才資料庫遴選。
          </p>
          <p>
            再行調查比照一般調查流程，針對申復之爭議事項或新事證進一步釐清及蒐證。調查報告得作為原報告之補充，或重新撰寫完整報告；辦理期限應讓申訴處理單位可於法定時限內作成決定。
          </p>
          <p className="src">手冊 p.28–29・準則 §22、§23</p>
        </TimelineItem>
        <TimelineItem
          when={
            <>
              <b>30 日內</b>
              <span>會議召開日起；再行調查得展延 30 日</span>
            </>
          }
          title={<>4　作成附理由之申復決定</>}
        >
          <p>申訴處理單位自申復審議會議召開日起 30 日內作成附理由之決定。屬應再行調查者，決定期限得展延 30 日。</p>
          <p className="src">手冊 p.29–30・準則 §23</p>
        </TimelineItem>
        <TimelineItem
          when={
            <>
              <b>10 個工作日內</b>
              <span>申復決定日起</span>
            </>
          }
          title={<>5　通知與登錄</>}
        >
          <ul>
            <li>以書面載明事實及理由，通知申復人及申復事件相對人（附錄 14）。</li>
            <li>僱用 30 人以上之雇主，另應將申復結果依勞動部公告之內容及方式登錄系統。</li>
          </ul>
          <p className="note">
            申復審議結果及再行調查結果，當事人不得再提起申復。如有不服，得逕向法院或依其他法令所定之途徑尋求救濟。
          </p>
          <p className="src">手冊 p.30・準則 §23</p>
        </TimelineItem>
      </Timeline>

      <div className="block">
        <h2>主管機關要求重新調查</h2>
        <div className="prose">
          <p>
            當事人不服雇主的調查結果，向主管機關或勞動檢查機構申訴，經認定違反防治準則規定，且調查程序有上述重大瑕疵情形之一者，主管機關或勞動檢查機構得要求雇主重新調查，雇主不得拒絕。
          </p>
          <ul>
            <li>準用申復程序及申復調查小組組成之規定。</li>
            <li>
              自主管機關或勞動檢查機構要求重新調查之日起 <b>2 個月內</b>作成決定。
            </li>
            <li>調查過程不得對申訴人有不當對待及不利之處分。</li>
            <li>並應檢討依準則第 6 條所定之規範事項及其執行情形。</li>
          </ul>
        </div>
        <p className="src">手冊 p.30・準則 §24</p>
      </div>

      <section className="part" id="after">
        <div className="part-head">
          <h2>懲處、保護與紀錄</h2>
          <p className="lead">
            調查屬實要懲處，提出申訴或協助申訴的人不得受到不利處分，事件結束後要追蹤改善，所有執行紀錄留存 3
            年。四項都不分規模。
          </p>
          <p>
            <Req min={0} />
          </p>
        </div>

        <div className="block">
          <h3>對行為人之懲處</h3>
          <p className="prose">
            職場霸凌行為經調查屬實者，雇主應視情節輕重對行為人為適當之懲戒或處理；行為人已離職者不在此限。
          </p>
          <div className="grid2">
            <div className="panel">
              <h4>情節輕重的 4 個審酌因素</h4>
              <ol>
                <li>對申訴人造成身心侵害之程度。</li>
                <li>
                  侵害行為之次數、頻率、手段、重複違反、持續期間，是否曾經勸導、調處、處理或懲戒後仍再為相同或類似不當行為，及其他相關因素。
                </li>
                <li>與申訴人之關係、違反後態度及過往有無類似行為。</li>
                <li>對事業單位所生之危害，其影響程度及範圍。</li>
              </ol>
            </div>
            <div className="panel">
              <h4>手冊列舉的懲處方式</h4>
              <ul>
                <li>
                  <b>較輕微者：</b>口頭警告、書面警告、口頭申誡、書面申誡、記過、參加講習，或其他程度相當之懲戒或處理。
                </li>
                <li>
                  <b>涉犯有期徒刑以上之罪者：</b>除上述懲處外，應檢視是否符合勞動基準法第 12 條有關終止契約之規定。
                </li>
                <li>
                  <b>再犯或報復相關人士，經查證屬實者：</b>應加重懲處。
                </li>
              </ul>
            </div>
          </div>
          <p className="prose">懲處事由、懲處種類及救濟管道等事項，雇主應事先於工作規則或人事懲處規章中明訂。</p>
          <p className="src">手冊 p.26・準則 §19</p>
        </div>

        <div className="block">
          <h3>申訴者權益保護</h3>
          <div className="prose">
            <p>
              雇主不得對提起申訴或協助他人申訴之工作者，予以解僱、降調、減薪、損害其依法令、契約或習慣上所應享有之權益，或其他不利之處分。
            </p>
            <p>
              為隔離而調整申訴人的工作內容或工作場所（例如調職）時，應尊重申訴人的意願，以免形成對申訴人不利之處分。
            </p>
            <p className="note">
              <b>例外：惡意虛構事實。</b>
              申訴人或協助他人申訴之工作者經證實有惡意虛構事實者，不受上述保護，雇主應為適當之懲戒或處理。惡意虛構事實，指主觀上明知所指控之職場霸凌言行不存在，或非由被申訴人所為，卻仍故意捏造、誣陷被申訴人。
            </p>
          </div>
          <p className="src">手冊 p.32・準則 §20</p>
        </div>

        <div className="block">
          <h3>事後追蹤及改善</h3>
          <ul className="prose">
            <li>對申訴與申復事件採取追蹤、考核及監督，確保懲處措施有效執行，避免相同事件或報復情事發生。</li>
            <li>
              職場霸凌的發生與組織文化或管理模式有關，應整體評估及檢討防治措施、申訴及懲處規範，據以修訂並採取必要之改善措施。
            </li>
          </ul>
          <p className="src">手冊 p.32・準則 §25</p>
        </div>

        <div className="block">
          <h3>紀錄保存</h3>
          <p className="prose">
            雇主所採行之預防措施、受理申訴、協調、調查與申復等之處理過程及結果，應作成執行紀錄並留存{' '}
            <b className="num">3</b> 年。
          </p>
          <p className="src">手冊 p.32・準則 §26</p>
        </div>
      </section>
    </>
  );
}
