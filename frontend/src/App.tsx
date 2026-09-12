import { useEffect, useRef, useState } from 'react';
import { DEMO_MEMORIES } from './demoData';
import type { Memory } from './types/api';
import RecordPage from './pages/RecordPage';
import MemoriesPage from './pages/MemoriesPage';
import DiaryPage from './pages/DiaryPage';
import ReflectionPage from './pages/ReflectionPage';
import PrivacyPanel from './components/PrivacyPanel';
import IntroCover from './components/IntroCover';
import HealingNote from './components/HealingNote';

export type Page = 'record' | 'memories' | 'diary' | 'reflection';
const labels: Record<Page, string> = { record: '写记录', memories: '我的记录', diary: '日记', reflection: '回响' };
export default function App() {
  const [page, setPage] = useState<Page>('record'); const [memories, setMemories] = useState<Memory[]>(DEMO_MEMORIES); const [drawer, setDrawer] = useState(false); const [privacy, setPrivacy] = useState(false); const [cover, setCover] = useState(true); const [reflectionSeed, setReflectionSeed] = useState<string>(); const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (!drawer && !privacy) return; const close = (e: KeyboardEvent) => { if (e.key === 'Escape') { setDrawer(false); setPrivacy(false); menuRef.current?.focus(); } }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, [drawer, privacy]);
  const navigate = (next: Page) => { setPage(next); setDrawer(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const updateMemory = (next: Memory) => setMemories(items => items.map(item => item.memory_id === next.memory_id ? next : item));
  const togglePermission = (id: string) => setMemories(items => items.map(item => item.memory_id === id ? { ...item, analysis_allowed: !item.analysis_allowed, updated_at: new Date().toISOString() } : item));
  const beginReflection = (id: string) => { setReflectionSeed(id); navigate('reflection'); };
  return <div className="app-shell">{cover && <IntroCover onEnter={() => setCover(false)}/>}<div className="ambient ambient-a"/><div className="ambient ambient-b"/><header className="topbar"><div className="topbar-left"><button ref={menuRef} className="menu-button" onClick={() => setDrawer(true)} aria-label="打开导航">☰</button><span className="brand">回响</span><span className="divider"/><span className="current-page">{labels[page]}</span></div><button className="profile" onClick={() => setDrawer(true)}><span className="avatar"><i/></span><span>小响</span></button></header>
    <main className={`page-stage page-stage-${page}`}>
      <HealingNote/>
      <div hidden={page !== 'record'}><RecordPage memories={memories} onSave={memory => setMemories(items => [memory, ...items])} onNavigate={navigate}/></div>
      <div hidden={page !== 'memories'}><MemoriesPage memories={memories} onUpdate={updateMemory} onDelete={id => setMemories(items => items.filter(item => item.memory_id !== id))} onTogglePermission={togglePermission} onStartReflection={beginReflection}/></div>
      <div hidden={page !== 'diary'}><DiaryPage memories={memories}/></div>
      <div hidden={page !== 'reflection'}><ReflectionPage memories={memories} initialMemoryId={reflectionSeed}/></div>
    </main>
    {drawer && <div className="drawer-layer" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) { setDrawer(false); setTimeout(() => menuRef.current?.focus(), 0); } }}><aside className="drawer" role="dialog" aria-modal="true" aria-label="个人空间"><button className="drawer-close" onClick={() => setDrawer(false)} aria-label="关闭导航">×</button><div className="drawer-user"><span className="avatar large"><i/></span><div><h2>小响</h2><p>演示账号</p></div></div><nav>{(Object.keys(labels) as Page[]).map(key => <button key={key} className={page === key ? 'active' : ''} onClick={() => navigate(key)}><span>{key === 'record' ? '✎' : key === 'memories' ? '◷' : key === 'diary' ? '▤' : '◌'}</span>{labels[key]}<i>›</i></button>)}<button onClick={() => { setDrawer(false); setPrivacy(true); }}><span>⌾</span>数据与访问<i>›</i></button></nav><div className="drawer-boundary"><strong>你的记录，由你决定如何使用</strong><p>演示内容刷新后重置，当前不连接账号、数据库或 AI。</p></div><button className="logout" onClick={() => alert('当前为演示账号，不执行真实退出。')}>退出登录</button></aside></div>}
    {privacy && <PrivacyPanel memories={memories} onToggle={togglePermission} onClose={() => { setPrivacy(false); menuRef.current?.focus(); }}/>} 
  </div>;
}
