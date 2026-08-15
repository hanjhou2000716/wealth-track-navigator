"use client";

import { useState } from "react";
import { demoProfile } from "./demo-data";

const paths = [
  { label: "Market Value", value: "78", tone: "cyan" },
  { label: "Level Readiness", value: "64", tone: "violet" },
  { label: "Mobility", value: "72", tone: "lime" },
  { label: "Comp Upside", value: "+41%", tone: "amber" },
];

export default function Home() {
  const [active, setActive] = useState("Overview");

  if (active !== "Overview") {
    return <ModuleView active={active} onBack={() => setActive("Overview")} />;
  }

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

function ModuleView({ active, onBack }: { active: string; onBack: () => void }) {
  const content: Record<string, { kicker: string; title: string; intro: string; cards: { label: string; value: string; detail: string; tone: string }[] }> = {
    Profile: {
      kicker: "PROFILE / STRUCTURED INPUT",
      title: "Make your experience legible to the market.",
      intro: "A structured profile preserves what you actually did, then makes the signal easier to evaluate.",
      cards: [
        { label: "Profile completeness", value: "82%", detail: "3 evidence fields need clarification", tone: "cyan" },
        { label: "Scope signals", value: "14", detail: "6 have quantified impact", tone: "violet" },
        { label: "Transferable capital", value: "68", detail: "Supplier + cross-functional depth", tone: "lime" },
      ],
    },
    "Market value": {
      kicker: "MARKET VALUE / SIGNAL MAP",
      title: "Your strongest signal is not your title.",
      intro: "We separate technical depth, scope, impact and scarcity so the score is explainable—not a black box.",
      cards: [
        { label: "Technical capital", value: "81", detail: "Mechanism + product validation", tone: "cyan" },
        { label: "Impact evidence", value: "57", detail: "Add cost / yield ownership", tone: "amber" },
        { label: "Scarcity premium", value: "+18%", detail: "Hardware / supplier bridge", tone: "lime" },
      ],
    },
    "Next move": {
      kicker: "NEXT MOVE / DUAL-TRACK RADAR",
      title: "Two tracks. One deliberate upgrade.",
      intro: "Compare a realistic fit with a stretch role, then see the gap that actually changes your trajectory.",
      cards: [
        { label: "Current-fit roles", value: "12", detail: "Strong evidence match", tone: "cyan" },
        { label: "Next-level roles", value: "5", detail: "Leadership gap is the limiter", tone: "violet" },
        { label: "Highest-leverage gap", value: "Scope", detail: "Own a subsystem end-to-end", tone: "amber" },
      ],
    },
    Path: {
      kicker: "PATH / SPRINGBOARD TRAJECTORY",
      title: "Work backward from the destination.",
      intro: "Trajectory signals are shown with sample counts and confidence, never as a made-up 500-person certainty.",
      cards: [
        { label: "Target sample", value: "500", detail: "Profiles requested", tone: "violet" },
        { label: "Usable histories", value: "—", detail: "Provider unavailable in demo", tone: "amber" },
        { label: "Evidence state", value: "DEMO", detail: "No external people data used", tone: "cyan" },
      ],
    },
    Network: {
      kicker: "NETWORK / EVIDENCE-GATED REFERRALS",
      title: "A warm introduction starts with a real signal.",
      intro: "No invented alumni, no scraped profiles. Demo mode keeps the empty state honest until a licensed provider is connected.",
      cards: [
        { label: "Verified profiles", value: "0", detail: "No reliable provider evidence", tone: "cyan" },
        { label: "Relationship status", value: "Unverified", detail: "Verify before outreach", tone: "amber" },
        { label: "Next action", value: "Add source", detail: "Connect an authorized provider", tone: "violet" },
      ],
    },
    Comp: {
      kicker: "COMP / REGIONAL ARBITRAGE",
      title: "Compare the package you can actually keep.",
      intro: "Vesting, sign-on and purchasing power are separated so nominal salary never tells the whole story.",
      cards: [
        { label: "Current package", value: "NT$1.08M", detail: "Demo input · Taiwan", tone: "cyan" },
        { label: "4-year nominal", value: "NT$4.52M", detail: "Base + bonus + vesting", tone: "violet" },
        { label: "Real index", value: "100", detail: "Provider evidence required", tone: "lime" },
      ],
    },
    Plan: {
      kicker: "PLAN / CAREER STRATEGY",
      title: "Turn one insight into a calendar.",
      intro: "A strategy is useful only when the next 90 days are clear and the evidence you need is explicit.",
      cards: [
        { label: "90 days", value: "3", detail: "Scope-building actions", tone: "cyan" },
        { label: "6 months", value: "2", detail: "Portfolio proof points", tone: "violet" },
        { label: "12 months", value: "1", detail: "Role transition checkpoint", tone: "lime" },
      ],
    },
  };
  const view = content[active];
  if (active === "Profile") return <ProfileWorkspace onBack={onBack} />;
  return <main className="module-shell"><header className="module-top"><button className="back-button" onClick={onBack}>← Overview</button><div className="module-mode"><span className="demo-dot" /> DEMO DATA · EVIDENCE MODE</div></header><section className="module-hero"><p className="eyebrow">{view.kicker}</p><h1>{view.title}</h1><p>{view.intro}</p></section><section className="module-cards">{view.cards.map((card) => <article className="module-card panel" key={card.label}><div className={`metric-icon ${card.tone}`}>◎</div><small>{card.label}</small><strong>{card.value}</strong><p>{card.detail}</p></article>)}</section><section className="module-detail panel"><div><p className="eyebrow">WHY THIS RESULT?</p><h2>Evidence before inference.</h2><p>Every number on this screen is either user-provided, calculated by a deterministic rule, or explicitly marked as unavailable. Recommendations stay separate from facts.</p></div><div className="evidence-list"><span>✓ User supplied profile</span><span>✓ Normalized role ontology</span><span>○ External provider not connected</span></div></section></main>;
}

function ProfileWorkspace({ onBack }: { onBack: () => void }) {
  const [profile, setProfile] = useState(demoProfile);
  const [saved, setSaved] = useState(false);
  const update = (key: "name" | "location" | "summary", value: string) => setProfile((current) => ({ ...current, [key]: value }));
  return <main className="module-shell"><header className="module-top"><button className="back-button" onClick={onBack}>← Overview</button><div className="module-mode"><span className="demo-dot" /> DEMO DATA · EDITABLE PROFILE</div></header><section className="profile-editor"><div className="profile-editor-heading"><div><p className="eyebrow">PROFILE / STRUCTURED INPUT</p><h1>Make your experience legible.</h1><p>Correct the structured profile before any score or recommendation is calculated.</p></div><button className="save-button" onClick={() => setSaved(true)}>{saved ? "Saved ✓" : "Save corrections"}</button></div><div className="editor-grid"><label>Full name<input value={profile.name} onChange={(event) => update("name", event.target.value)} /></label><label>Location<input value={profile.location} onChange={(event) => update("location", event.target.value)} /></label><label className="wide">Summary<textarea value={profile.summary} onChange={(event) => update("summary", event.target.value)} /></label></div><div className="profile-columns"><div><p className="eyebrow">EMPLOYMENT</p><article className="employment-card panel"><strong>{profile.employment[0].role}</strong><span>{profile.employment[0].company} · {profile.employment[0].startedAt}</span><p>{profile.employment[0].scope}</p><small>Impact evidence: {profile.employment[0].impact}</small></article></div><div><p className="eyebrow">SKILLS & EVIDENCE</p><div className="chip-list">{profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><div className="editor-note">ⓘ User-supplied fields are Tier A evidence. We never invent missing metrics.</div></div></div></section></main>;
}
