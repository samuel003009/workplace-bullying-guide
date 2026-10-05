'use client';

import { useState } from 'react';

type Props = {
  /** YouTube 影片 ID，例如 https://youtu.be/QbfefQjslX0 的 QbfefQjslX0 */
  videoId: string;
  title: string;
  /** 上傳者或頻道名稱 */
  credit?: string;
};

/**
 * YouTube 影片。先顯示封面與播放鈕，按下後才載入播放器。
 * 這樣在使用者決定觀看之前，瀏覽器不會載入 YouTube 的播放器與其 Cookie；
 * 播放器使用 youtube-nocookie.com 網域。
 */
export default function VideoEmbed({ videoId, title, credit }: Props) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <figure className="video">
      <div className="video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            className="video-poster"
            onClick={() => setPlaying(true)}
            aria-label={`播放影片：${title}`}
          >
            {/* 封面來自 YouTube 的縮圖主機；載入失敗時只顯示底色與播放鈕 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              onError={(e) => {
                e.currentTarget.hidden = true;
              }}
            />
            <span className="video-play" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
              </svg>
            </span>
            <span className="video-label">播放影片</span>
          </button>
        )}
      </div>
      <figcaption>
        <b>{title}</b>
        {credit ? <span>影片來源：{credit}（YouTube）</span> : null}
        <a href={watchUrl} target="_blank" rel="noopener noreferrer">
          在 YouTube 上觀看
        </a>
      </figcaption>
    </figure>
  );
}
