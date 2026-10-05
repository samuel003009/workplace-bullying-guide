'use client';

import { SCALES, TODO_ALL, TODO_DECIDE, TODO_STEP, isMust, type Todo } from '@/lib/data';
import { DutyBadge, useScale } from './ScaleContext';

function Item({ todo, must }: { todo: Todo; must: boolean }) {
  return (
    <li>
      <DutyBadge must={must} />
      <span>{todo[0]}</span>
      <span className="art">準則 {todo[1]}</span>
    </li>
  );
}

/** 所選規模的待辦清單：法定應辦與得參照辦理分開列。 */
export default function TodoList() {
  const { scale } = useScale();
  const must: Todo[] = TODO_ALL.map((t) => t ?? TODO_DECIDE[scale]);
  const may: Todo[] = [];
  for (const group of TODO_STEP) {
    const required = isMust(scale, group.min);
    for (const t of group.items) {
      if (t[2] && !required) continue;
      (required ? must : may).push(t);
    }
  }
  return (
    <div className="block">
      <h2>{SCALES[scale].label}要做的事</h2>
      <div className="panel">
        <h3>法定應辦</h3>
        <ul className="todo">
          {must.map((t) => (
            <Item key={t[0]} todo={t} must />
          ))}
        </ul>
      </div>
      {may.length > 0 && (
        <div className="panel">
          <h3>得參照辦理</h3>
          <ul className="todo">
            {may.map((t) => (
              <Item key={t[0]} todo={t} must={false} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
