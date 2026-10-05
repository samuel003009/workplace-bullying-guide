import type { ReactNode } from 'react';

/** 直向流程時間軸：左側是期限，右側是該步驟的內容。 */
export function Timeline({ children }: { children: ReactNode }) {
  return <ol className="timeline">{children}</ol>;
}

export function TimelineItem({
  when,
  title,
  children,
}: {
  /** 期限與起算說明，例如 <><b>10 個工作日內</b><span>接獲申訴之日起</span></> */
  when: ReactNode;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <li>
      <div className="when">{when}</div>
      <div className="what">
        <h2>{title}</h2>
        {children}
      </div>
    </li>
  );
}
