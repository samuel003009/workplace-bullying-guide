# 職場霸凌防治導覽（Next.js）

依勞動部《職場霸凌防治措施指導手冊》（115年6月）整理的非官方導覽網站。選擇僱用勞工人數後，各頁的「法定／得參照」標示、待辦清單與期限會跟著改變。

本站不是政府網站，不受理申訴，也不提供個案法律意見；內容以手冊與法規為準。

## 開始使用

需要 Node.js 20.9 以上。

```bash
npm install
npm run dev        # 開發模式，http://localhost:3000
npm run build      # 建置成純靜態檔案，輸出到 out/
npm start          # 在本機預覽 out/ 的內容
npm test           # 期限計算的單元測試（需 Node.js 22.18 以上）
npm run typecheck
```

## 部署

推送到 `main` 後，GitHub Actions（`.github/workflows/deploy.yml`）會依序執行型別檢查、單元測試、建置，並把 `out/` 部署到 GitHub Pages。Pull request 只跑檢查與建置，不部署。

第一次使用前，到儲存庫的 Settings → Pages，把 Source 設為「GitHub Actions」。

網站會放在 `https://<帳號>.github.io/<儲存庫>/`，不在網域根目錄，所以建置時由部署流程帶入 `NEXT_PUBLIC_BASE_PATH`。要部署到其他靜態主機的根目錄時，不設這個變數，直接上傳 `out/` 即可。

## 頁面

| 路由 | 頁面 | 內容 |
| --- | --- | --- |
| `/` | 首頁 | 規模提問、處理流程六站、關鍵期限、依角色進入 |
| `/definition` | 認識職場霸凌 | 法定定義六要件、認定原則、四類樣態 |
| `/obligations` | 規模義務檢核 | 義務矩陣、所選規模的待辦清單、人數算法 |
| `/prevention` | 事前防治 | 五項事前措施、分眾教育訓練 |
| `/response` | 知悉後處置 | 因申訴知悉、非因申訴知悉兩條路徑 |
| `/process` | 申訴與調查 | 紀錄、受理、登錄、協調、調查、決定 |
| `/appeal` | 申復與後續 | 申復流程、重新調查；懲處、保護、追蹤與紀錄（`#after`） |
| `/tools` | 期限試算與書表範本 | 期限試算；附錄 1–14 範本（`#forms`） |
| `/help` | 協助資源與常見問題 | 附錄 15–16 資源；常見問題（`#faq`）；內容對照（`#source`） |

## 專案結構

```
src/
  app/                 9 個頁面、layout、全域樣式、404
  components/
    Navbar.tsx           頂部導覽與手機選單，內含規模切換
    ScaleContext.tsx     規模狀態（Context + localStorage）、ScaleSwitcher、ScaleOnly、Req 徽章
    Timeline.tsx         流程時間軸（Timeline、TimelineItem）
    Accordion.tsx        手風琴（Accordion、AccordionItem、FaqAccordion）
    Tabs.tsx             分頁
    ScalePicker.tsx      首頁的規模提問
    DutyMatrix.tsx       義務矩陣
    TodoList.tsx         待辦清單
    DeadlineCalculator.tsx 期限試算
    FormsBrowser.tsx     書表範本卡與篩選
    ResourceCard.tsx     協助資源卡、電話
    AppealTeamTable.tsx  申復調查小組組成表
    SourceTables.tsx     內容對照表
    CopyButton.tsx、Pager.tsx、Footer.tsx
  lib/
    data.ts              全站資料：規模、義務、待辦、範本、資源、問答、頁面對照
    deadlines.ts         期限計算的純函式
tests/
  deadlines.test.ts
docs/
  PRD.md                 產品需求文件：網站規劃、UI/UX、頁面內容、技術規格、內容對照
.github/workflows/
  deploy.yml             測試、建置並部署到 GitHub Pages
```

## 修改內容時

- 義務門檻、範本、資源電話、問答都在 `src/lib/data.ts`，改這一個檔即可。
- 各頁的說明文字在 `src/app/*/page.tsx`。每個區塊結尾的「來源」標示手冊頁碼與準則條號，改內容時請一併更新。
- 手冊或準則改版時，依 `/help#source` 的對照表逐頁檢查。

## 期限試算的假設

- 工作日以週一至週五計，國定假日與補班日由使用者輸入，沒有內建行事曆。
- 條文寫「之日起」者當日算入，寫「翌日起」者次日算入。這是到期日較早的保守算法，實際起算以主管機關解釋為準。
- 以月計算者，到期日是起算日在到期月份相當日的前一日；末日遇假日不自動順延。

## 其他

- 字型以 `<link>` 從 Google Fonts 載入（Noto Serif TC、Noto Sans TC、IBM Plex Mono），載入失敗時退回系統字型。
- 沒有後端、不蒐集資料；所選規模存在瀏覽器的 localStorage。
- 準則條號依手冊內文的引註，尚未與法規資料庫的準則全文逐條核對。
