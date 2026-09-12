import type { Memory } from '../types/api';
import { useState } from 'react';
import AuthorizationDialog from './AuthorizationDialog';

interface Props { purpose: 'diary' | 'reflection'; candidates: Memory[]; selected: string[]; onToggle: (id: string) => void; onApprove: () => void; onDeny?: () => void; }

export default function AccessRequestCard({ purpose, candidates, selected, onToggle, onApprove, onDeny }: Props) {
  const [confirming,setConfirming]=useState(false); const chosen=candidates.filter(memory=>selected.includes(memory.memory_id));
  return <><section className="access-request-card" aria-labelledby={`${purpose}-access-title`}>
    <div className="access-card-title"><div><span className="number-chip">一次授权</span><h2 id={`${purpose}-access-title`}>选择这次可以使用的记录</h2></div><strong>{selected.length} / {candidates.length}</strong></div>
    <p>你的选择只用于这一次{purpose === 'diary' ? '日记' : '回响'}，下次仍会重新询问。</p>
    <div className="access-options">{candidates.length ? candidates.map(memory => <button type="button" key={memory.memory_id} className={selected.includes(memory.memory_id) ? 'selected' : ''} aria-pressed={selected.includes(memory.memory_id)} onClick={() => onToggle(memory.memory_id)}><i>{selected.includes(memory.memory_id) ? '✓' : '+'}</i><span><strong>{memory.event ?? '未命名记录'}</strong><small>{memory.event_date ?? '日期未指定'} · {memory.emotions.join('、') || '情绪未填写'}</small></span></button>) : <div className="access-empty"><strong>暂时没有可选记录</strong><span>请先在“数据与访问”中允许记录进入候选范围。</span></div>}</div>
    <div className="access-card-actions">{onDeny && <button className="ghost-button" type="button" onClick={onDeny}>暂不授权</button>}<button className="primary-button" type="button" disabled={!selected.length} onClick={()=>setConfirming(true)}>批准并继续</button></div>
    <small className="access-boundary">合成流程演示：当前不会发送记录，也不会调用 AI。</small>
  </section>{confirming&&<AuthorizationDialog purpose={purpose} memories={chosen} onClose={()=>setConfirming(false)} onApprove={()=>{setConfirming(false);onApprove();}}/>}</>;
}
