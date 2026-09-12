import { useEffect, useRef } from 'react';
import type { Memory } from '../types/api';

interface Props { purpose: 'diary' | 'reflection'; memories: Memory[]; onApprove: () => void; onClose: () => void; }
export default function AuthorizationDialog({ purpose, memories, onApprove, onClose }: Props) {
  const approveRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { approveRef.current?.focus(); const close = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, [onClose]);
  return <div className="authorization-layer" role="presentation" onMouseDown={e => e.target === e.currentTarget && onClose()}><section className="authorization-dialog" role="dialog" aria-modal="true" aria-labelledby="authorization-title"><header><span className="number-chip">本次授权</span><button onClick={onClose} aria-label="关闭授权确认">×</button></header><h2 id="authorization-title">确认这一次的使用范围</h2><p>以下记录只用于生成这一篇{purpose === 'diary' ? '日记' : '回响'}。下次使用仍会重新询问。</p><div className="authorization-purpose"><span>用途</span><strong>{purpose === 'diary' ? '生成当日日记草稿' : '回答这一次的回看问题'}</strong></div><div className="authorization-records">{memories.map((memory, index) => <article key={memory.memory_id}><i>{String(index + 1).padStart(2, '0')}</i><div><strong>{memory.event ?? '未命名记录'}</strong><span>{memory.event_date ?? '日期未指定'} · 版本 {memory.content_version}</span></div></article>)}</div><footer><button className="ghost-button" onClick={onClose}>返回调整</button><button ref={approveRef} className="primary-button" onClick={onApprove}>确认授权并继续</button></footer><small>合成演示：当前不会发送记录或调用 AI。</small></section></div>;
}
