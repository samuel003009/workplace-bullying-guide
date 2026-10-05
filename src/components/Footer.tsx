export const OSHA_ZONE_URL = 'https://www.osha.gov.tw/48110/48207/206868/nodelist';

export default function Footer() {
  return (
    <footer className="foot">
      <p>
        本站為依勞動部《職場霸凌防治措施指導手冊》（115年6月）整理的非官方導覽，不受理申訴，也不提供個案法律意見。內容以手冊與法規為準。
        手冊與書表原始檔：
        <a href={OSHA_ZONE_URL} target="_blank" rel="noopener noreferrer">
          職安署職場霸凌防治專區
        </a>
        。
      </p>
    </footer>
  );
}
