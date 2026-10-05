import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page-head">
      <p className="eyebrow">404</p>
      <h1>找不到這個頁面</h1>
      <p className="lead">網址可能有誤，或頁面已經移動。</p>
      <p>
        <Link className="cta" href="/">
          回首頁
        </Link>
      </p>
    </div>
  );
}
