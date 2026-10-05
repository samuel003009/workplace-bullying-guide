import { useId } from 'react';
import type { Resource } from '@/lib/data';
import CopyButton from './CopyButton';

export function PhoneNumber({ number, note }: { number: string; note?: string }) {
  const id = useId();
  return (
    <div className="tel">
      <a className="tel-num" id={id} href={`tel:${number.replace(/[^\d+]/g, '')}`}>
        {number}
      </a>
      <CopyButton text={number} selectId={id} />
      {note ? <span className="hint">{note}</span> : null}
    </div>
  );
}

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="card">
      <h3>{resource.org}</h3>
      <p>{resource.what}</p>
      {resource.tels?.map(([number, note]) => (
        <PhoneNumber key={number} number={number} note={note} />
      ))}
      {resource.links?.length ? (
        <p className="links">
          {resource.links.map(([text, url]) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer">
              {text}
            </a>
          ))}
        </p>
      ) : null}
      {resource.note ? <p className="hint">{resource.note}</p> : null}
    </article>
  );
}
