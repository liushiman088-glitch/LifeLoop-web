import { useMemo, useState } from 'react';
import type { Memory } from '../types/api';

interface Props { memory: Memory; editable?: boolean; onChange?: (memory: Memory) => void; onConfirm?: () => void; onDiscard?: () => void; }
const statusText = { unprocessed: '未整理', proposed: '待你确认', confirmed: '用户已确认', user_edited: '用户已修改' };

export default function EmotionCard({ memory, editable = false, onChange, onConfirm, onDiscard }: Props) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState('');
  const quote = useMemo(() => memory.field_sources.find(s => s.field === 'emotions' && s.value === highlight)?.quote ?? '', [highlight, memory.field_sources]);
  const list = (value: string) => value.split(/[，、,]/).map(v => v.trim()).filter(Boolean);
  const setField = (field: 'event' | 'emotions' | 'triggers' | 'thoughts' | 'behaviors', value: string) => onChange?.({ ...memory, [field]: field === 'event' ? value || null : list(value), extraction_status: memory.extraction_status === 'confirmed' ? 'user_edited' : memory.extraction_status });
  return <section className="emotion-card" aria-labelledby="emotion-card-title">
    <div className="emotion-card-header"><span className="number-chip">理解卡</span><span className={`status-badge ${memory.extraction_status}`}>{statusText[memory.extraction_status]}</span></div>
    <h2 id="emotion-card-title">情绪理解</h2>
    <div className="emotion-fields">
      <label><span>事件</span>{editable ? <input value={memory.event ?? ''} placeholder="未识别，可补充" onChange={e => setField('event', e.target.value)} /> : <strong>{memory.event || '未识别，可补充'}</strong>}</label>
      <label><span>情绪</span>{editable ? <input value={memory.emotions.join('、')} placeholder="可以有多种，也可以留空" onChange={e => setField('emotions', e.target.value)} /> : <div className="emotion-tags">{memory.emotions.length ? memory.emotions.map(e => <button key={e} type="button" className={highlight === e ? 'active' : ''} onClick={() => setHighlight(highlight === e ? '' : e)}>{e}</button>) : <em>未识别，可补充</em>}</div>}</label>
      {editable && <label><span>日期</span><input type="date" value={memory.event_date ?? ''} onChange={e => onChange?.({ ...memory, event_date: e.target.value || null, extraction_status: 'user_edited' })}/></label>}
      {highlight && <div className="source-quote"><span>原文依据</span><mark>{quote || memory.raw_text}</mark>{!quote && <small>未找到精确对应片段，已显示完整原文。</small>}</div>}
    </div>
    <button className="details-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? '收起其他理解' : '展开触发、想法与行为'} <span>{open ? '−' : '+'}</span></button>
    {open && <div className={`secondary-fields ${editable ? 'editable' : ''}`}>{editable ? <><label><span>触发</span><input value={memory.triggers.join('、')} placeholder="未识别，可补充" onChange={e => setField('triggers', e.target.value)}/></label><label><span>想法</span><input value={memory.thoughts.join('、')} placeholder="未识别，可补充" onChange={e => setField('thoughts', e.target.value)}/></label><label><span>行为</span><input value={memory.behaviors.join('、')} placeholder="未识别，可补充" onChange={e => setField('behaviors', e.target.value)}/></label></> : <><p><span>触发</span>{memory.triggers.join('、') || '未识别，可补充'}</p><p><span>想法</span>{memory.thoughts.join('、') || '未识别，可补充'}</p><p><span>行为</span>{memory.behaviors.join('、') || '未识别，可补充'}</p></>}</div>}
    {(onConfirm || onDiscard) && <div className="card-actions"><button className="ghost-button" type="button" onClick={onDiscard}>不采用</button><button className="primary-button" type="button" onClick={onConfirm}>确认这份理解</button></div>}
    <p className="card-footnote">AI 的理解只是草稿，你可以修改、清空或不采用。</p>
  </section>;
}
