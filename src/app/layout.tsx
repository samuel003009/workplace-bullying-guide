import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Pager from '@/components/Pager';
import { ScaleProvider } from '@/components/ScaleContext';

export const metadata: Metadata = {
  title: { default: '職場霸凌防治導覽', template: '%s｜職場霸凌防治導覽' },
  description:
    '依勞動部《職場霸凌防治措施指導手冊》（115年6月）整理的非官方導覽：依僱用人數查法定義務、處理流程、期限試算、書表範本與協助資源。',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#EEF2F0' },
    { media: '(prefers-color-scheme: dark)', color: '#0F1715' },
  ],
};

const FONTS =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@600;700&display=swap';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      <head>
        {/* 字型以 <link> 載入而不用 next/font，建置時不需連外；載入失敗時退回系統字型。 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>
        <ScaleProvider>
          <a className="skip" href="#main">
            跳到主要內容
          </a>
          <Navbar />
          <main id="main" className="content">
            {children}
            <Pager />
          </main>
          <Footer />
        </ScaleProvider>
      </body>
    </html>
  );
}
