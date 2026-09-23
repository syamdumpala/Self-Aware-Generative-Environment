'use client';

import { useState } from 'react';

type SensorKey = 'camera' | 'microphone' | 'screen' | 'retention';
type Toast = string | null;

const signals = [
  { icon: '◉', label: 'Presence', detail: 'Camera posture cue', value: '78% stable', tone: 'orange', width: '78%' },
  { icon: ')))', label: 'Audio scene', detail: 'Quiet workspace', value: '14 dB ambient', tone: 'violet', width: '14%' },
  { icon: '▦', label: 'Screen focus', detail: 'Research workspace', value: '86% continuity', tone: 'green', width: '86%' },
  { icon: '▤', label: 'Activity', detail: '3 related windows', value: '64% relevance', tone: 'gold', width: '64%' },
];

const evidence = [
  ['▣', 'Research workspace active for 18 min', '+42'],
  ['◌', "Unresolved marker from yesterday", '+31'],
  ['⌁', 'Battery trace on current display', '+19'],
];

const defaultConsent: Record<SensorKey, boolean> = { camera: true, microphone: true, screen: true, retention: true };

export default function Home() {
  const [shielded, setShielded] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [consent, setConsent] = useState(defaultConsent);
  const [toast, setToast] = useState<Toast>(null);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  }

  function resolveIntent() {
    if (shielded) {
      notify('Focus shield is active. SAGE is staying quiet.');
      return;
    }
    setResolved(true);
    notify('Intent staged from local evidence.');
  }

  function exportCapsule() {
    const capsule = {
      format: 'sage-context-capsule/v1',
      createdAt: new Date().toISOString(),
      retention: 'user-controlled',
      signals: ['research workspace active', 'unresolved marker', 'battery trace on display'],
      predictedIntent: 'review battery benchmark notes',
      confidence: 0.92,
    };
    const href = URL.createObjectURL(new Blob([JSON.stringify(capsule, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = href;
    link.download = 'sage-context-capsule.json';
    link.click();
    URL.revokeObjectURL(href);
    notify('Context capsule exported locally.');
  }

  function saveConsent() {
    localStorage.setItem('sage-consent', JSON.stringify(consent));
    setPrivacyOpen(false);
    notify('Privacy controls saved locally.');
  }

  return (
    <div className="shell">
      <aside className="rail" aria-label="Primary navigation">
        <div className="brand" aria-label="SAGE">S<span>/</span></div>
        <nav className="rail-nav">
          <button className="rail-item active" type="button" aria-label="Context"><span>◒</span><small>context</small></button>
          <button className="rail-item" type="button" aria-label="Signals" onClick={() => document.getElementById('signals')?.scrollIntoView({ behavior: 'smooth' })}><span>⌁</span><small>signals</small></button>
          <button className="rail-item" type="button" aria-label="Memory" onClick={() => document.getElementById('memory')?.scrollIntoView({ behavior: 'smooth' })}><span>◫</span><small>memory</small></button>
        </nav>
        <button className="rail-item settings" type="button" aria-label="Settings" onClick={() => setPrivacyOpen(true)}><span>⚙</span><small>settings</small></button>
      </aside>

      <main className="content">
        <header className="topbar">
          <div><p className="eyebrow">SNAPDRAGON AI PC / LOCAL RUNTIME</p><h1>Good morning, Maya<span>.</span></h1></div>
          <div className="runtime"><i /> private mode <strong>08:42</strong></div>
        </header>

        <section className="hero" id="context">
          <div className="hero-copy">
            <p className="eyebrow accent">INTENT HORIZON / 01</p>
            <h2>Continue the work<br /><em>already in motion.</em></h2>
            <p className="lede">SAGE assembled a low-resolution picture of your morning and found one high-confidence next step. No prompt required.</p>
            <div className="hero-actions">
              <button className="primary" type="button" onClick={resolveIntent}><b>{resolved ? '✓' : '↗'}</b> {resolved ? 'Intent resolved' : 'Simulate next intent'}</button>
              <button className="quiet" type="button" onClick={() => { setDismissed(true); notify('Suggestion dismissed for this session.'); }}>Dismiss suggestion</button>
              <button className={`quiet shield ${shielded ? 'on' : ''}`} type="button" aria-pressed={shielded} onClick={() => { setShielded(!shielded); notify(shielded ? 'Focus shield off. SAGE can observe intent again.' : 'Focus shield active. Suggestions are paused.'); }}>◈ Focus shield</button>
            </div>
          </div>

          <article className={`intent-card ${dismissed ? 'muted' : ''}`} aria-live="polite">
            <div className="card-meta"><span className="status"><i /> predicted next</span><span className="confidence">92% confidence</span></div>
            <div className="intent-mark">↳</div>
            <p className="eyebrow">WORKFLOW CONTINUATION</p>
            <h3>{resolved ? 'Open the variance notebook' : 'Review the battery benchmark notes'}</h3>
            <p className="card-copy">{resolved ? 'The current trace is the strongest unresolved signal. SAGE can stage the notebook beside your benchmark notes, locally.' : "Your research workspace is open, the same paper is in focus, and yesterday's unresolved marker is still waiting in the notes."}</p>
            <div className="evidence">{evidence.map(([icon, text, score]) => <div key={text}><span>{icon}</span><label>{text}</label><b>{score}</b></div>)}</div>
            <button className="stage" type="button" onClick={() => notify('Workspace staged. Nothing was opened without approval.')}>Stage workspace <span>→</span></button>
          </article>
        </section>

        <section className="lower-grid">
          <div className="panel" id="signals">
            <div className="panel-heading"><div><p className="eyebrow">LOCAL CONTEXT</p><h3>What SAGE knows right now</h3></div><span className="live">LIVE</span></div>
            <div className="signal-grid">{signals.map((signal) => <div className="signal" key={signal.label}><div className="signal-top"><span className={`signal-icon ${signal.tone}`}>{signal.icon}</span><small>local</small></div><strong>{signal.label}</strong><p>{signal.detail}</p><div className="meter"><i className={signal.tone} style={{ width: signal.width }} /></div><small>{signal.value}</small></div>)}</div>
          </div>
          <div className="panel" id="memory">
            <div className="panel-heading"><div><p className="eyebrow">EPISODIC THREAD</p><h3>Work remembered, lightly</h3></div><button className="more" type="button" aria-label="More timeline options">•••</button></div>
            <div className="timeline"><div><time>08:24</time><span /><article><strong>Research workspace reopened</strong><p>Project SAGE / benchmark-notes.md</p></article></div><div><time>08:31</time><span /><article><strong>Battery trace compared</strong><p>Two runs, one unresolved variance</p></article></div><div className="current"><time>08:42</time><span /><article><strong>Intent boundary reached</strong><p>SAGE is ready to suggest a next step</p></article></div></div>
            <div className="memory-footer"><span>Memory expires in 7 days</span><span className="memory-actions"><button type="button" onClick={exportCapsule}>Export capsule</button><button type="button" onClick={() => notify('This episodic thread was cleared from local memory.')}>Clear thread</button></span></div>
          </div>
        </section>

        <footer className="footer"><span><b>Q</b> Snapdragon NPU / ready</span><span>Raw signals stay on this PC · <button type="button" onClick={() => setPrivacyOpen(true)}>Privacy controls</button></span></footer>
      </main>

      {privacyOpen && <div className="modal-backdrop" role="presentation"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="privacy-title"><div className="modal-heading"><div><p className="eyebrow">LOCAL POLICY</p><h2 id="privacy-title">Privacy controls</h2></div><button className="close" type="button" aria-label="Close privacy controls" onClick={() => setPrivacyOpen(false)}>×</button></div><p className="modal-copy">SAGE only uses the signals you permit. Raw sensor data is processed in memory and is never sent to a server by this build.</p>{(Object.keys(consent) as SensorKey[]).map((key) => <label className="toggle" key={key}><span><strong>{key === 'camera' ? 'Camera presence' : key === 'microphone' ? 'Microphone scene' : key === 'screen' ? 'Screen understanding' : 'Episode retention'}</strong><small>{key === 'camera' ? 'Coarse presence only, no identity inference' : key === 'microphone' ? 'Ambient scene classification, no transcript' : key === 'screen' ? 'Redact private and password surfaces' : 'Automatically expire local memory after 7 days'}</small></span><input type="checkbox" checked={consent[key]} onChange={() => setConsent({ ...consent, [key]: !consent[key] })} /><i /></label>)}<div className="modal-footer"><span>⌾ local-only policy</span><button className="primary" type="button" onClick={saveConsent}>Save controls</button></div></section></div>}
      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </div>
  );
}
