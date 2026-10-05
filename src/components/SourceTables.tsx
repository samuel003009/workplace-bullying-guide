import Link from 'next/link';
import { APPENDIX_MAP, PAGES } from '@/lib/data';

/** 內容對照：本站頁面與附錄各自對應的手冊章節、頁碼與條文。 */
export default function SourceTables() {
  return (
    <>
      <div className="block">
        <h3>頁面對照</h3>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">本站頁面</th>
                <th scope="col">手冊章節</th>
                <th scope="col">頁碼</th>
                <th scope="col">法規條文</th>
              </tr>
            </thead>
            <tbody>
              {PAGES.map((p) => (
                <tr key={p.href}>
                  <th scope="row">
                    <Link href={p.href}>{p.title}</Link>
                  </th>
                  <td>{p.chapter}</td>
                  <td className="mono">{p.pages}</td>
                  <td className="mono wrap">{p.law}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="block">
        <h3>附錄對照</h3>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">附錄</th>
                <th scope="col">名稱</th>
                <th scope="col">頁碼</th>
                <th scope="col">流程階段</th>
                <th scope="col">本站位置</th>
              </tr>
            </thead>
            <tbody>
              {APPENDIX_MAP.map((a) => (
                <tr key={a.no}>
                  <td className="mono">{a.no}</td>
                  <th scope="row">{a.name}</th>
                  <td className="mono">{a.pg}</td>
                  <td>{a.stage}</td>
                  <td>
                    <Link href={a.href}>{a.page}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
