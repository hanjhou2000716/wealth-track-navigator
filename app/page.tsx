"use client";

import { useState } from "react";

const paths = [
  { label: "Market Value", value: "78", tone: "cyan" },
  { label: "Level Readiness", value: "64", tone: "violet" },
  { label: "Mobility", value: "72", tone: "lime" },
  { label: "Comp Upside", value: "+41%", tone: "amber" },
];

export default function Home() {
  const [active, setActive] = useState("Overview");

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">W</span><span>WEALTH<br /><b>TRACK</b></span></div>
        <div className="workspace"><span className="avatar">JH</span><span><small>Workspace</small><strong>Jordan Huang</strong></span><span className="chevron">⌄</span></div>
        <nav aria-label="Primary navigation">
          {['Overview', 'Profile', 'Market value', 'Next move', 'Path', 'Network', 'Comp', 'Plan'].map((item, i) => (
            <button key={item} className={`nav-item ${active === item ? 'active' : ''}`} onClick={() => setActive(item)}>
              <span className="nav-icon">{['⌂', '◎', '↗', '⊹', '⌁', '♧', '＄', '◷'][i]}</span>{item}
              {i === 3 && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom"><div className="demo-pill"><span /> DEMO DATA</div><button className="settings">⚙ Settings</button></div>
      </aside>

      <section className="content">
        <header className="topbar"><div><p className="eyebrow">THURSDAY, 15 AUG 2026 <span className="live-dot" /> ANALYSIS RUN #024</p><h1>Your next move, <em>compounded.</em></h1></div><div className="top-actions"><button className="icon-button" aria-label="Notifications">♢</button><button className="profile-button">JH <span>⌄</span></button></div></header>

        <div className="hero-grid">
          <article className="score-card panel"><div className="card-kicker"><span>WEALTH TRACK SCORE</span><button aria-label="Score information">ⓘ</button></div><div className="score-row"><div className="score">74<span>/100</span></div><div className="score-trend">↗ 8 pts <small>since last analysis</small></div></div><div className="meter"><span /></div><div className="score-footer"><span>Strong foundation</span><span>Next review in 12 days →</span></div></article>
          <article className="position-card panel"><div className="card-kicker"><span>CURRENT POSITION</span><span className="evidence-label">● Evidence-backed</span></div><div className="role-line"><div className="company-logo">G</div><div><h2>Mechanical Engineer</h2><p>Garmin · Taoyuan, Taiwan</p></div></div><div className="level-display"><div><small>NORMALIZED LEVEL</small><strong>WT-IC2 <span>↗</span></strong></div><div className="confidence"><div className="confidence-ring">86%</div><small>confidence</small></div></div><div className="position-meta"><span>4.2 years experience</span><span>•</span><span>Mechanical / Hardware</span></div></article>
        </div>

        <div className="section-heading"><div><p className="eyebrow">CAPITAL SNAPSHOT</p><h2>The assets you can compound next</h2></div><button className="text-button">View full analysis <span>→</span></button></div>
        <div className="metric-grid">{paths.map((item) => <article className="metric panel" key={item.label}><div className={`metric-icon ${item.tone}`}>{item.label === 'Comp Upside' ? '$' : item.label === 'Mobility' ? '↗' : item.label === 'Market Value' ? '◒' : '◇'}</div><p>{item.label}</p><strong>{item.value}</strong><div className="mini-bars"><i /><i /><i /><i /><i /><i /></div><small>{item.label === 'Comp Upside' ? 'vs. current package' : 'out of 100'} <span>↗</span></small></article>)}</div>

        <div className="section-heading path-heading"><div><p className="eyebrow">RECOMMENDED PATH</p><h2>One move can unlock the next three</h2></div><span className="source-note">◎ Based on 12 evidence points</span></div>
        <article className="path-card panel"><div className="path-step current"><span className="step-dot">1</span><div><small>NOW · 0—90 DAYS</small><h3>Upgrade your scope signal</h3><p>Turn your supplier coordination into explicit subsystem ownership.</p></div><span className="step-tag">IN PROGRESS</span></div><div className="path-line" /><div className="path-step"><span className="step-dot">2</span><div><small>NEXT · 6—18 MONTHS</small><h3>Senior Product Design</h3><p>Target Apple-adjacent product design roles where your hardware depth travels.</p></div><span className="step-tag muted">TARGET ROLE</span></div><div className="path-line" /><div className="path-step"><span className="step-dot">3</span><div><small>SPRINGBOARD · 18—36 MONTHS</small><h3>Staff-level ownership</h3><p>Build the business impact evidence that moves you toward WT-IC4.</p></div><span className="step-arrow">→</span></div><button className="path-cta">Open strategy planner <span>↗</span></button></article>

        <footer className="page-footer"><span>Wealth Track Navigator</span><span>Facts are sourced. Recommendations are labeled. <a href="#evidence">Why this result?</a></span></footer>
      </section>
    </main>
  );
}
