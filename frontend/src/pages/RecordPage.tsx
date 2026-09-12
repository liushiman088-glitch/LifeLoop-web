import { useState, type FormEvent } from 'react';
import EmotionCard from '../components/EmotionCard';
import type { Memory } from '../types/api';
import type { Page } from '../App';

export default function RecordPage({ memories, onSave, onNavigate }: { memories: Memory[]; onSave: (memory: Memory) => void; onNavigate: (page: Page) => void }) {
  const [rawText, setRawText] = useState('');
  const [eventDate, setEventDate] = useState('2026-09-10');
  const [source, setSource] = useState<'manual' | 'paste'>('manual');
  const [sourceApp, setSourceApp] = useState('');
  const [draft, setDraft] = useState<Memory | null>(null);
  const [message, setMessage] = useState('');
  const [saved, setSaved] = useState<Memory | null>(null);
  const makeMemory = (status: Memory['extraction_status']): Memory => ({ memory_id: `demo-${Date.now()}`, raw_text: rawText.trim(), event: status === 'proposed' ? '一次值得记下的经历' : null, emotions: status === 'proposed' ? ['有些复杂'] : [], triggers: [], thoughts: [], behaviors: [], topics: [], people: [], event_date: eventDate || null, event_time_text: null, extraction_status: status, field_sources: [], source, source_app: source === 'paste' ? sourceApp.trim() || null : null, analysis_allowed: false, content_version: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
  function validate() { if (!rawText.trim()) { setMessage('先写下一点真实感受，再继续。'); return false; } setMessage(''); return true; }
  function saveOnly(e?: FormEvent) { e?.preventDefault(); if (!validate()) return; const memory=makeMemory('unprocessed'); onSave(memory); setSaved(memory); setRawText(''); setDraft(null); setMessage('保存成功。原文已进入“我的记录”。'); }
  function organize() { if (!validate()) return; setDraft(makeMemory('proposed')); setMessage('这是合成的理解卡草稿，当前没有调用真实 AI。'); }
  function confirmDraft() { if (!draft) return; const memory={ ...draft, extraction_status: draft.extraction_status === 'user_edited' ? 'user_edited' : 'confirmed' } as Memory; onSave(memory); setSaved(memory); setRawText(''); setDraft(null); setMessage('确认并保存成功。你可以在“我的记录”中核对。'); }
  return <div className="page record-page">
    <section className="page-intro"><div><span className="eyebrow">此刻记录</span><h1>此刻的感受，<br/>慢慢说。</h1><p>不必整理得很完整。你写下什么，就从什么开始。</p></div><div className="demo-note"><span/>合成数据 · 未连接后端或 AI</div></section>
    <div className="record-workspace"><form className="writing-panel" onSubmit={saveOnly}><div className="panel-title"><div><span className="number-chip">01</span><h2>写下此刻</h2></div><span>{rawText.length} / 2000</span></div><textarea maxLength={2000} value={rawText} onChange={e => { setRawText(e.target.value); setDraft(null); }} placeholder="发生了什么？你当时有什么感受？几句话也可以……" aria-label="记录正文"/><div className="record-meta-inputs"><label>事件日期<input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)}/></label><label>记录方式<select value={source} onChange={e => setSource(e.target.value as 'manual' | 'paste')}><option value="manual">手动记录</option><option value="paste">从其他应用复制粘贴</option></select></label>{source === 'paste' && <label>来源说明<input value={sourceApp} onChange={e => setSourceApp(e.target.value)} placeholder="例如：备忘录（可留空）"/></label>}</div><div className="privacy-line"><span className="lock-dot">⌁</span><p><strong>默认仅保存</strong><br/>点击 AI 整理会把这一条内容发送给当前模型服务商。</p></div><div className="writing-actions"><button className="ghost-button" type="submit">仅保存</button><button className="primary-button warm" type="button" onClick={organize}>AI 帮我整理本条</button></div><p className="form-message" role="status">{message}</p></form>
      <div className="understanding-area">{draft ? <EmotionCard memory={draft} editable onChange={setDraft} onConfirm={confirmDraft} onDiscard={() => { setDraft(null); setMessage('已放弃这份理解，原文仍留在输入框中。'); }}/> : <div className="quiet-placeholder"><span className="soft-orbit"><i/><i/></span><h2>理解会在你允许后出现</h2><p>你可以只保存原文。选择整理时，系统会把事件和感受做成一张可修改的草稿。</p></div>}</div></div>
    <section className="recent-strip"><div><span className="number-chip">最近</span><h2>刚刚留下的片段</h2><button className="text-link" onClick={() => onNavigate('memories')}>查看全部记忆 →</button></div>{memories.slice(0, 2).map(m => <article key={m.memory_id}><time>{m.event_date ?? '日期未指定'}</time><p>{m.raw_text}</p><span>{m.emotions.join(' · ') || '仅保存，尚未整理'}</span></article>)}</section>
    {saved && <section className="save-receipt"><div><span>已保存</span><strong>{saved.raw_text}</strong><small>{saved.event_date ?? '日期未指定'} · {saved.extraction_status === 'unprocessed' ? '仅保存原文' : '已确认理解'}</small></div><div><button className="ghost-button" onClick={() => setSaved(null)}>再写一条</button><button className="primary-button" onClick={() => onNavigate('memories')}>查看这条记录</button></div></section>}
  </div>;
}
