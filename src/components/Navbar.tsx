'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PAGES, normalizePath } from '@/lib/data';
import { ScaleSwitcher } from './ScaleContext';

export default function Navbar() {
  const pathname = normalizePath(usePathname());
  const [open, setOpen] = useState(false);

  // 換頁後收起手機選單
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="nav-row">
        <Link className="brand" href="/">
          職場霸凌防治導覽
        </Link>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '關閉' : '選單'}
        </button>
        <nav id="site-nav" className={open ? 'nav-links open' : 'nav-links'} aria-label="主要導覽">
          {PAGES.slice(1).map((p) => (
            <Link key={p.href} href={p.href} aria-current={pathname === p.href ? 'page' : undefined}>
              {p.nav}
            </Link>
          ))}
        </nav>
      </div>
      <div className="scale-row">
        <div className="scale-inner">
          <span className="scale-label" id="scale-label">
            僱用勞工人數
          </span>
          <ScaleSwitcher labelledBy="scale-label" />
          <span className="scale-hint">切換後，各頁的「法定／得參照」會跟著改變</span>
        </div>
      </div>
    </header>
  );
}
