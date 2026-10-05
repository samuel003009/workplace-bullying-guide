import type { NextConfig } from 'next';

// 部署在 GitHub Pages 的專案網址（https://<帳號>.github.io/<儲存庫>/）時，
// 網站不在網域根目錄，需要 basePath。部署流程會以環境變數帶入；本機開發不必設定。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 9 個頁面都是靜態內容，直接輸出成純靜態檔案（out/），不需要 Node 伺服器。
  output: 'export',
  // 每頁輸出成 <路由>/index.html。GitHub Pages 對「同名資料夾與 .html 並存」的網址會轉到資料夾而回 404，
  // 統一用結尾斜線的網址可避開這個問題。
  trailingSlash: true,
  basePath,
};

export default nextConfig;
