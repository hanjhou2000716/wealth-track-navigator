"use client";

import { useEffect, useState } from "react";
import { demoProfile } from "./demo-data";

const paths = [
  { label: "市場身價", value: "78", tone: "cyan" },
  { label: "職級準備度", value: "64", tone: "violet" },
  { label: "轉職機動性", value: "72", tone: "lime" },
  { label: "薪酬上行空間", value: "+41%", tone: "amber" },
];

export default function Home() {
  const [active, setActive] = useState("Overview");
  const [analysis, setAnalysis] = useState<{ score: number; leveling: { level: string; confidence: number }; trust?: { breakdown: { sourceReliability: number; freshness: number; evidenceCoverage: number; crossSourceAgreement: number; score: number }; source: string; sourceTier: string; freshness: string } | null } | null>(null);
  const navItems = [{ key: "Overview", label: "總覽" }, { key: "Profile", label: "履歷" }, { key: "Market value", label: "市場身價" }, { key: "Next move", label: "下一步" }, { key: "Path", label: "路徑" }, { key: "Network", label: "人脈" }, { key: "Comp", label: "薪酬" }, { key: "Plan", label: "計畫" }];

  useEffect(() => { fetch("/api/analysis").then((response) => response.json()).then(setAnalysis).catch(() => setAnalysis(null)); }, []);

  if (active !== "Overview") {
    return <ModuleView active={active} onBack={() => setActive("Overview")} />;
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">W</span><span>WEALTH<br /><b>TRACK</b></span></div>
        <div className="workspace"><span className="avatar">JH</span><span><small>工作區</small><strong>Jordan Huang</strong></span><span className="chevron">⌄</span></div>
        <nav aria-label="主要導覽">
          {navItems.map((item, i) => (
            <button key={item.key} className={`nav-item ${active === item.key ? 'active' : ''}`} onClick={() => setActive(item.key)}>
              <span className="nav-icon">{['⌂', '◎', '↗', '⊹', '⌁', '♧', '＄', '◷'][i]}</span>{item.label}
              {i === 3 && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom"><div className="demo-pill"><span /> 示範資料</div><button className="settings">⚙ 設定</button></div>
      </aside>

      <section className="content">
        <header className="topbar"><div><p className="eyebrow">2026 年 8 月 15 日・星期四 <span className="live-dot" /> 分析編號 #024</p><h1>讓你的下一步，<em>持續複利。</em></h1></div><div className="top-actions"><button className="icon-button" aria-label="通知">♢</button><button className="profile-button">JH <span>⌄</span></button></div></header>

        <div className="hero-grid">
          <article className="score-card panel"><div className="card-kicker"><span>WEALTH TRACK 分數</span><button aria-label="分數說明">ⓘ</button></div><div className="score-row"><div className="score">{analysis?.score ?? 74}<span>/100</span></div><div className="score-trend">↗ 8 分 <small>較上次分析</small></div></div><div className="meter"><span style={{ width: `${analysis?.score ?? 74}%` }} /></div><div className="score-footer"><span>基礎穩健</span><span>12 天後重新檢視 →</span></div></article>
          <article className="position-card panel"><div className="card-kicker"><span>目前定位</span><span className="evidence-label">● 有證據支持</span></div><div className="role-line"><div className="company-logo">G</div><div><h2>機械工程師</h2><p>Garmin・桃園，台灣</p></div></div><div className="level-display"><div><small>標準化職級</small><strong>{analysis?.leveling.level ?? "WT-IC2"} <span>↗</span></strong></div><div className="confidence"><div className="confidence-ring">{analysis?.leveling.confidence ?? 86}%</div><small>可信度</small></div></div><div className="position-meta"><span>4.2 年經驗</span><span>•</span><span>機械／硬體</span></div></article>
        </div>

        <div className="section-heading"><div><p className="eyebrow">人力資本快照</p><h2>下一步可以持續複利的資產</h2></div><button className="text-button">查看完整分析 <span>→</span></button></div>
        <div className="metric-grid">{paths.map((item) => <article className="metric panel" key={item.label}><div className={`metric-icon ${item.tone}`}>{item.label === '薪酬上行空間' ? '$' : item.label === '轉職機動性' ? '↗' : item.label === '市場身價' ? '◒' : '◇'}</div><p>{item.label}</p><strong>{item.value}</strong><div className="mini-bars"><i /><i /><i /><i /><i /><i /></div><small>{item.label === '薪酬上行空間' ? '相較目前方案' : '滿分 100'} <span>↗</span></small></article>)}</div>

        <div className="section-heading path-heading"><div><p className="eyebrow">建議路徑</p><h2>一次升級，解鎖接下來三步</h2></div><span className="source-note">◎ 根據 12 個證據點</span></div>
        <article className="path-card panel"><div className="path-step current"><span className="step-dot">1</span><div><small>現在・0—90 天</small><h3>升級你的職責範圍訊號</h3><p>把供應商協作轉化為明確的子系統所有權。</p></div><span className="step-tag">進行中</span></div><div className="path-line" /><div className="path-step"><span className="step-dot">2</span><div><small>下一步・6—18 個月</small><h3>資深產品設計職位</h3><p>鎖定能讓硬體深度延伸的 Apple 周邊產品設計職位。</p></div><span className="step-tag muted">目標職位</span></div><div className="path-line" /><div className="path-step"><span className="step-dot">3</span><div><small>跳板・18—36 個月</small><h3>Staff 級所有權</h3><p>建立商業影響證據，朝 WT-IC4 前進。</p></div><span className="step-arrow">→</span></div><button className="path-cta">開啟策略規劃器 <span>↗</span></button></article>

        <section className="trust-panel panel" id="evidence"><div><p className="eyebrow">WHY THIS RESULT? / 證據信任</p><h2>先看來源，再相信分數。</h2><p>信任分數由來源可靠度、資料新鮮度、證據覆蓋與跨來源一致性計算；不是模型自行填寫的信心百分比。</p><div className="trust-source">來源：{analysis?.trust?.source ?? "user-demo-profile"}・{analysis?.trust?.sourceTier ?? "TIER_A_PRIMARY"}・{analysis?.trust?.freshness ?? "FRESH"}</div></div><div className="trust-factors">{[["來源可靠度", analysis?.trust?.breakdown.sourceReliability ?? 100], ["Freshness", analysis?.trust?.breakdown.freshness ?? 100], ["證據覆蓋", analysis?.trust?.breakdown.evidenceCoverage ?? 88], ["跨來源一致性", analysis?.trust?.breakdown.crossSourceAgreement ?? 85]].map(([label, value]) => <div className="trust-factor" key={label as string}><span>{label}</span><strong>{value}%</strong><i><b style={{ width: `${value}%` }} /></i></div>)}</div></section>

        <footer className="page-footer"><span>Wealth Track Navigator</span><span>事實有來源，建議有標示。<a href="#evidence">為什麼是這個結果？</a></span></footer>
      </section>
    </main>
  );
}

function ModuleView({ active, onBack }: { active: string; onBack: () => void }) {
  const [strategy, setStrategy] = useState<{ horizons: { horizon: string; actions: string[] }[]; gaps: { dimension: string; delta: number; nextAction: string }[]; compensation: { fourYearTotal: string; realIndex: number | null; evidence: string } | null } | null>(null);
  const [marketValue, setMarketValue] = useState<{ technicalCapital: number; impactEvidence: number; transferableCapital: number; scarcitySignal: number; score: number } | null>(null);
  const [radar, setRadar] = useState<{ track: "FIT" | "STRETCH"; match: number; gaps: string[] }[] | null>(null);
  const [trajectory, setTrajectory] = useState<{ transitions: { to: string; springboardScore: number; sampleSize: number; quality: string }[]; sampleSize: number } | null>(null);
  const [compensation, setCompensation] = useState<{ years: { year: number; equity: number; bonus: number; signOn: number }[]; fourYearTotalFormatted: string; realIndex: number | null; evidence: string } | null>(null);
  const [providerSummary, setProviderSummary] = useState("尚未連接外部 Provider");
  useEffect(() => {
    if (active === "Plan") fetch("/api/strategy").then((response) => response.json()).then(setStrategy).catch(() => setStrategy(null));
    if (active === "Comp") fetch("/api/compensation").then((response) => response.json()).then((body) => setCompensation(body.compensation)).catch(() => setCompensation(null));
    if (active === "Market value") fetch("/api/market-value").then((response) => response.json()).then((body) => setMarketValue(body.marketValue)).catch(() => setMarketValue(null));
    if (active === "Next move") fetch("/api/radar").then((response) => response.json()).then((body) => setRadar(body.items ?? [])).catch(() => setRadar(null));
    if (active === "Path") fetch("/api/trajectory").then((response) => response.json()).then(setTrajectory).catch(() => setTrajectory(null));
    fetch("/api/providers").then((response) => response.json()).then((body) => setProviderSummary(body.states?.some((state: { available: boolean }) => state.available) ? "示範 Provider 可用" : "外部 Provider 尚未驗證")).catch(() => setProviderSummary("Provider 狀態未知"));
  }, [active]);
  const content: Record<string, { kicker: string; title: string; intro: string; cards: { label: string; value: string; detail: string; tone: string }[] }> = {
    Profile: {
      kicker: "履歷 / 結構化資料",
      title: "讓市場看懂你的經驗。",
      intro: "結構化履歷保留你真正做過的事，再讓重要訊號更容易被評估。",
      cards: [
        { label: "履歷完整度", value: "82%", detail: "3 個證據欄位需要補充", tone: "cyan" },
        { label: "職責範圍訊號", value: "14", detail: "其中 6 個有量化影響", tone: "violet" },
        { label: "可轉移資本", value: "68", detail: "供應商協作＋跨部門深度", tone: "lime" },
      ],
    },
    "Market value": {
      kicker: "市場身價 / 訊號地圖",
      title: "你最強的訊號，不是職稱。",
      intro: "我們拆開技術深度、範圍、影響力與稀缺性，讓分數可解釋，而不是黑箱。",
      cards: [
        { label: "技術資本", value: "81", detail: "機構設計＋產品驗證", tone: "cyan" },
        { label: "影響力證據", value: "57", detail: "補上成本／良率責任", tone: "amber" },
        { label: "稀缺性溢價", value: "+18%", detail: "硬體與供應商的橋接能力", tone: "lime" },
      ],
    },
    "Next move": {
      kicker: "下一步 / 雙軌雷達",
      title: "兩條路徑，一次有意識的升級。",
      intro: "比較務實適配與挑戰職位，再找出真正能改變職涯軌跡的差距。",
      cards: [
        { label: "目前適配職位", value: "12", detail: "證據匹配度高", tone: "cyan" },
        { label: "下一級職位", value: "5", detail: "領導力差距是主要限制", tone: "violet" },
        { label: "最高槓桿差距", value: "範圍", detail: "端到端負責一個子系統", tone: "amber" },
      ],
    },
    Path: {
      kicker: "路徑 / 跳板軌跡",
      title: "從目的地倒推你的路。",
      intro: "軌跡訊號會顯示樣本數與可信度，不會假裝一定取得 500 人資料。",
      cards: [
        { label: "目標樣本", value: "500", detail: "要求分析的 Profile 數", tone: "violet" },
        { label: "可用履歷歷史", value: "—", detail: "示範模式未連接 Provider", tone: "amber" },
        { label: "證據狀態", value: "示範", detail: "未使用外部真人資料", tone: "cyan" },
      ],
    },
    Network: {
      kicker: "人脈 / 證據閘門內推",
      title: "一個有效引薦，始於真實訊號。",
      intro: "不虛構校友、不抓取 Profile。連接合法 Provider 前，示範模式會誠實顯示空狀態。",
      cards: [
        { label: "已驗證 Profile", value: "0", detail: "沒有可靠 Provider 證據", tone: "cyan" },
        { label: "關係狀態", value: "未驗證", detail: "聯絡前先確認關係", tone: "amber" },
        { label: "下一步", value: "加入來源", detail: "連接已授權 Provider", tone: "violet" },
      ],
    },
    Comp: {
      kicker: "薪酬 / 跨區套利",
      title: "比較你真正能留下的總包。",
      intro: "拆開 vesting、sign-on 與購買力，因為名目薪資從來不是完整故事。",
      cards: [
        { label: "目前方案", value: "NT$1.08M", detail: "示範輸入・台灣", tone: "cyan" },
        { label: "四年名目總額", value: "NT$4.52M", detail: "底薪＋獎金＋vesting", tone: "violet" },
        { label: "實質指數", value: "100", detail: "需要 Provider 證據", tone: "lime" },
      ],
    },
    Plan: {
      kicker: "計畫 / 職涯策略",
      title: "把一個洞察變成行事曆。",
      intro: "策略只有在未來 90 天清楚、且需要的證據明確時，才真正有用。",
      cards: [
        { label: "90 天", value: "3", detail: "建立職責範圍的行動", tone: "cyan" },
        { label: "6 個月", value: "2", detail: "作品集證明點", tone: "violet" },
        { label: "12 個月", value: "1", detail: "職位轉換檢查點", tone: "lime" },
      ],
    },
  };
  const view = content[active];
  if (active === "Profile") return <ProfileWorkspace onBack={onBack} />;
  const cards = active === "Market value" && marketValue ? [
    { label: "技術資本", value: String(marketValue.technicalCapital), detail: "技能與證照的可驗證訊號", tone: "cyan" },
    { label: "影響力證據", value: String(marketValue.impactEvidence), detail: "scope／impact 欄位覆蓋度", tone: "amber" },
    { label: "可轉移資本", value: String(marketValue.transferableCapital), detail: "專案、語言與跨職涯訊號", tone: "lime" },
  ] : active === "Path" && trajectory ? [
    { label: "可用轉職樣本", value: String(trajectory.sampleSize), detail: "示範 seed；不足以做市場推論", tone: "violet" },
    { label: "最佳跳板分數", value: String(trajectory.transitions[0]?.springboardScore ?? "—"), detail: trajectory.transitions[0]?.to ?? "尚無可用跳板", tone: "cyan" },
    { label: "資料品質", value: trajectory.transitions[0]?.quality ?? "UNKNOWN", detail: "需要合法 career-history Provider 才能升級", tone: "amber" },
  ] : active === "Next move" && radar ? [
    { label: "務實適配 FIT", value: `${radar.find((item) => item.track === "FIT")?.match ?? "—"}`, detail: radar.find((item) => item.track === "FIT")?.gaps.join("、") || "主要證據已覆蓋", tone: "cyan" },
    { label: "挑戰路徑 STRETCH", value: `${radar.find((item) => item.track === "STRETCH")?.match ?? "—"}`, detail: radar.find((item) => item.track === "STRETCH")?.gaps.join("、") || "需要更多職責證據", tone: "violet" },
    { label: "最高槓桿差距", value: radar.find((item) => item.track === "STRETCH")?.gaps[0] || "—", detail: "先補證據，再比較職位", tone: "amber" },
  ] : active === "Plan" && strategy ? [
    { label: "90 天", value: String(strategy.horizons[0]?.actions.length ?? 0), detail: strategy.gaps[0]?.nextAction ?? "等待策略資料", tone: "cyan" },
    { label: "6 個月", value: String(strategy.horizons[1]?.actions.length ?? 0), detail: strategy.horizons[1]?.actions[0] ?? "等待策略資料", tone: "violet" },
    { label: "12 個月", value: String(strategy.horizons[2]?.actions.length ?? 0), detail: strategy.horizons[2]?.actions[0] ?? "等待策略資料", tone: "lime" },
  ] : active === "Comp" && compensation ? [
    { label: "四年名目總額", value: compensation.fourYearTotalFormatted, detail: compensation.evidence, tone: "violet" },
    { label: "實質指數", value: String(compensation.realIndex ?? "—"), detail: compensation.evidence, tone: "lime" },
    { label: "第四年 equity", value: compensation.years[3] ? String(Math.round(compensation.years[3].equity)) : "—", detail: "依 vesting schedule 計算", tone: "amber" },
  ] : view.cards;
  return <main className="module-shell"><header className="module-top"><button className="back-button" onClick={onBack}>← 返回總覽</button><div className="module-mode"><span className="demo-dot" /> 示範資料・證據模式</div></header><section className="module-hero"><p className="eyebrow">{view.kicker}</p><h1>{view.title}</h1><p>{view.intro}</p></section><section className="module-cards">{cards.map((card) => <article className="module-card panel" key={card.label}><div className={`metric-icon ${card.tone}`}>◎</div><small>{card.label}</small><strong>{card.value}</strong><p>{card.detail}</p></article>)}</section><section className="module-detail panel"><div><p className="eyebrow">為什麼是這個結果？</p><h2>先看證據，再做推論。</h2><p>這個畫面上的數字不是使用者看不懂的黑箱：它們來自使用者資料、可重現的規則，或明確標示為目前不可取得。建議與事實保持分離。</p></div><div className="evidence-list"><span>✓ 使用者提供的履歷</span><span>✓ 標準化職級 ontology</span><span>○ {providerSummary}</span></div></section></main>;
}

function ProfileWorkspace({ onBack }: { onBack: () => void }) {
  const [profile, setProfile] = useState(demoProfile);
  const [saved, setSaved] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [parsed, setParsed] = useState(false);
  const update = (key: "name" | "location" | "summary", value: string) => setProfile((current) => ({ ...current, [key]: value }));
  const parseResume = async () => { if (!resumeText.trim()) return; const response = await fetch("/api/profile/parse", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: resumeText }) }); if (!response.ok) return; const body = await response.json(); setProfile(body.profile); setParsed(true); };
  return <main className="module-shell"><header className="module-top"><button className="back-button" onClick={onBack}>← 返回總覽</button><div className="module-mode"><span className="demo-dot" /> 示範資料・可編輯履歷</div></header><section className="profile-editor"><div className="profile-editor-heading"><div><p className="eyebrow">履歷 / 結構化資料</p><h1>讓市場看懂你的經驗。</h1><p>先修正結構化履歷，再計算任何分數或建議。</p></div><button className="save-button" onClick={() => setSaved(true)}>{saved ? "已儲存 ✓" : "儲存修正"}</button></div><section className="paste-box panel"><div><p className="eyebrow">快速導入</p><h2>貼上履歷文字</h2><p>支援中英文混合文字；解析後仍可人工修正，系統不會自行補造經歷。</p></div><textarea value={resumeText} onChange={(event) => setResumeText(event.target.value)} placeholder="請貼上履歷文字，例如：姓名、職稱、專案與技能…" /><div className="paste-actions"><button className="parse-button" onClick={parseResume}>解析並建立結構化 Profile</button>{parsed && <span>✓ 已解析，請檢查下方欄位</span>}</div></section><div className="editor-grid"><label>姓名<input value={profile.name} onChange={(event) => update("name", event.target.value)} /></label><label>所在地<input value={profile.location} onChange={(event) => update("location", event.target.value)} /></label><label className="wide">個人摘要<textarea value={profile.summary} onChange={(event) => update("summary", event.target.value)} /></label></div><div className="profile-columns"><div><p className="eyebrow">工作經歷</p><article className="employment-card panel"><strong>{profile.employment[0].role}</strong><span>{profile.employment[0].company}・{profile.employment[0].startedAt}</span><p>{profile.employment[0].scope}</p><small>影響力證據：{profile.employment[0].impact}</small></article></div><div><p className="eyebrow">技能與證據</p><div className="chip-list">{profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><div className="editor-note">ⓘ 使用者提供的欄位屬於 Tier A 證據；我們不會自行捏造缺少的數字。</div></div></div></section></main>;
}
