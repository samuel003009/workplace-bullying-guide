'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PAGES, normalizePath } from '@/lib/data';

/** 上一頁、下一頁。順序即處理順序。 */
export default function Pager() {
  const pathname = normalizePath(usePathname());
  const i = PAGES.findIndex((p) => p.href === pathname);
  if (i < 0) return null;
  const prev = PAGES[i - 1];
  const next = PAGES[i + 1];
  return (
    <nav className="pager" aria-label="上一頁與下一頁">
      {prev ? (
        <Link href={prev.href}>
          <small>上一頁</small>
          <b>{prev.title}</b>
        </Link>
      ) : null}
      {next ? (
        <Link className="next" href={next.href}>
          <small>下一頁</small>
          <b>{next.title}</b>
        </Link>
      ) : null}
    </nav>
  );
}
