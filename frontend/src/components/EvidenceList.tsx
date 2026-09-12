import { useState } from 'react';
import type { Memory } from '../types/api';

export default function EvidenceList({ memories, label = '查看原文依据' }: { memories: Memory[]; label?: string }) {
  const [open, setOpen] = useState(false);
  return <div className="evidence-list"><button type="button" className="evidence-toggle" onClick={() => setOpen(true)} aria-expanded={open}>{label}<span>↗</span></button>{open && <div className="evidence-drawer-layer" onMouseDown={e => e.target === e.currentTarget && setOpen(false)}><aside className="evidence-drawer" role="dialog" aria-modal="true" aria-label="原文依据"><header><div><span className="eyebrow">原文对照</span><h2>这些内容来自你的记录</h2></div><button onClick={() => setOpen(false)} aria-label="关闭原文依据">×</button></header><div className="evidence-content">{memories.map(memory => <article key={memory.memory_id}><time>{memory.event_date ?? '日期未指定'}</time><p>{memory.raw_text}</p><small>版本 {memory.content_version} · {memory.source === 'paste' ? `复制粘贴${memory.source_app ? ` / ${memory.source_app}` : ''}` : '手动记录'}</small></article>)}</div><p className="evidence-note">结果中的观察应能回到这里核对；当前展示的是合成记录。</p></aside></div>}</div>;
}
