import { useEffect, useState } from 'react';

export default function IntroCover({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const enter = () => { setLeaving(true); window.setTimeout(onEnter, 620); };
  useEffect(() => { const key = (event: KeyboardEvent) => { if (event.key === 'Enter' || event.key === 'Escape') enter(); }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key); }, []);
  return <section className={`intro-cover ${leaving ? 'leaving' : ''}`} aria-label="欢迎来到回响">
    <div className="cover-grain"/>
    <div className="cover-orbit" aria-hidden="true"><i/><i/><i/><span/></div>
    <div className="cover-copy"><span className="cover-kicker">LIFELOOP · 回响</span><h1>让感受留下，<br/>也让自己被听见。</h1><p>记录此刻，核对理解，再决定哪些经历可以参与一次回看。</p><button autoFocus className="cover-enter" onClick={enter}><span>进入我的空间</span><i>↗</i></button><button className="cover-skip" onClick={enter}>跳过动画</button></div>
    <div className="cover-index"><span>01</span><i/><span>04</span></div>
  </section>;
}
