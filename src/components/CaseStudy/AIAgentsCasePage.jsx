import { useState, useEffect, useRef } from 'react'
import { asset } from '../../utils/asset'
import { AGENTS } from './agentsData'
import PlayButton from './Presentation/PlayButton'

const PALETTE = ['#F4A58A', '#B8D4F8', '#B8F4D4', '#F8E4A0', '#D4B8F8', '#c8f4f0', '#f4c8d4', '#e4d4f8']

const T = {
  kicker: {
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#999',
    marginBottom: '10px',
    display: 'block',
    fontFamily: "'Nunito', sans-serif",
  },
  h1: {
    fontSize: 'clamp(32px, 5vw, 56px)',
    fontWeight: 800,
    letterSpacing: '-0.035em',
    lineHeight: 1.08,
    color: '#111',
    marginBottom: '18px',
    fontFamily: "'Fredoka', sans-serif",
  },
  h2: {
    fontSize: 'clamp(22px, 3vw, 34px)',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: 1.15,
    color: '#111',
    marginBottom: '20px',
    marginTop: '48px',
    fontFamily: "'Fredoka', sans-serif",
  },
  h3: {
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '-0.015em',
    color: '#111',
    marginBottom: '12px',
    marginTop: '32px',
    fontFamily: "'Nunito', sans-serif",
  },
  h4: {
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#999',
    marginBottom: '10px',
    marginTop: '28px',
    fontFamily: "'Nunito', sans-serif",
  },
  body: {
    fontSize: '14.5px',
    lineHeight: 1.7,
    color: '#777',
    marginBottom: '16px',
    fontFamily: "'Nunito', sans-serif",
  },
}


const SUMMARY_KPIS = [
  { value: '30–81%', label: 'Reduction in Time-to-Hire across deployments', color: '#F4A58A' },
  { value: '1M+', label: 'Candidates engaged per year across all agents', color: '#B8D4F8' },
  { value: '50K+', label: 'Hours of recruiter time saved (HCA Healthcare alone)', color: '#B8F4D4' },
]

/* ── Shared helpers ─────────────────────────────────────────── */

function AccentH2({ children, color = PALETTE[0] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
      <div style={{ width: '3px', minHeight: '36px', background: color, borderRadius: '2px', flexShrink: 0, marginTop: '6px' }} />
      <h2 style={{ ...T.h2, marginTop: 0 }}>{children}</h2>
    </div>
  )
}

function MetricCard({ value, label, color }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      padding: '20px 22px',
      textAlign: 'center',
      border: '1px solid rgba(0,0,0,0.05)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Nunito', sans-serif",
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: color, borderRadius: '16px 16px 0 0' }} />
      <div style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#111', lineHeight: 1, marginBottom: '6px' }}>
        {value}
      </div>
      <div style={{ fontSize: '12px', color: '#888', fontWeight: 500, lineHeight: 1.4 }}>{label}</div>
    </div>
  )
}

function InfoCard({ title, children, accent = PALETTE[0] }) {
  return (
    <div
      className="cs-info-card"
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(8px)',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Nunito', sans-serif",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: accent }} />
      <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '8px', letterSpacing: '-0.01em' }}>{title}</h3>
      <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: '#777', margin: 0 }}>{children}</p>
    </div>
  )
}

function GuardrailItem({ children, color }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '14px 16px',
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 1px 6px rgba(0,0,0,0.03)',
      fontFamily: "'Nunito', sans-serif",
    }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0, marginTop: '6px' }} />
      <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#666', margin: 0 }}>{children}</p>
    </div>
  )
}

function ImagePlaceholder({ label = 'Hero Screenshot', height = '340px', color = '#F4A58A' }) {
  return (
    <div style={{
      width: '100%',
      height,
      borderRadius: '20px',
      border: `2px dashed ${color}66`,
      background: `${color}0D`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      marginTop: '8px',
      marginBottom: '8px',
    }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="4" width="16" height="12" rx="2" stroke={color} strokeWidth="1.5"/>
          <circle cx="7" cy="9" r="2" stroke={color} strokeWidth="1.5"/>
          <path d="M2 14L6 10L9 13L13 8L18 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p style={{ fontSize: '13px', fontWeight: 600, color: `${color}CC`, margin: 0, letterSpacing: '0.02em' }}>{label}</p>
      <p style={{ fontSize: '11px', color: '#aaa', margin: 0 }}>Screenshot to be added</p>
    </div>
  )
}

function Section({ children }) {
  return <div style={{ marginBottom: '52px' }}>{children}</div>
}

/* ── Agent Tab Content ──────────────────────────────────────── */
function AgentContent({ agent }) {
  const c = agent.color
  return (
    <div style={{ animation: 'aaCsFadeIn 0.4s cubic-bezier(0.33, 1, 0.68, 1) both' }}>

      {/* Hero image placeholder */}
      <Section>
        <ImagePlaceholder label={`${agent.label} — UI Screenshot`} height="380px" color={c} />
      </Section>

      {/* Context */}
      <Section>
        <AccentH2 color={c}>Context</AccentH2>
        <p style={T.body}>{agent.context}</p>
      </Section>

      {/* Why */}
      <Section>
        <AccentH2 color={c}>Why do we need {agent.label}?</AccentH2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {agent.why.map((point, i) => (
            <div key={i} style={{
              display: 'flex', gap: '14px', padding: '16px 20px',
              background: '#fff', borderRadius: '14px',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              alignItems: 'flex-start',
              fontFamily: "'Nunito', sans-serif",
            }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: c, flexShrink: 0, marginTop: '1px', minWidth: '20px' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#666', margin: 0 }}>{point}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Research and Ideation */}
      <Section>
        <AccentH2 color={c}>Research & Ideation</AccentH2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {agent.research.map((r, i) => (
            <InfoCard key={i} title={r.title} accent={c}>{r.body}</InfoCard>
          ))}
        </div>
        <ImagePlaceholder label="Research Artifacts / Wireframes" height="260px" color={c} />
      </Section>

      {/* Constraints and Limitations */}
      <Section>
        <AccentH2 color={c}>Constraints & Limitations</AccentH2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {agent.constraints.map((con, i) => (
            <div key={i} style={{
              padding: '20px 24px',
              background: '#fff',
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.06)',
              borderLeft: `3px solid ${c}`,
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              fontFamily: "'Nunito', sans-serif",
            }}>
              <h3 style={{ ...T.h3, marginTop: 0, marginBottom: '8px' }}>{con.title}</h3>
              <p style={{ ...T.body, marginBottom: 0 }}>{con.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Guardrails and Principles */}
      <Section>
        <AccentH2 color={c}>Guardrails & Principles</AccentH2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {agent.guardrails.map((g, i) => (
            <GuardrailItem key={i} color={c}>{g}</GuardrailItem>
          ))}
        </div>
      </Section>

      {/* Design Variations */}
      <Section>
        <AccentH2 color={c}>Design Variations</AccentH2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {agent.variations.map((v, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              fontFamily: "'Nunito', sans-serif",
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: `${c}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: c }}>
                  {String.fromCharCode(65 + i)}
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#111', margin: 0, letterSpacing: '-0.01em' }}>{v.title}</h3>
              </div>
              <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: '#777', margin: 0 }}>{v.body}</p>
            </div>
          ))}
        </div>
        <ImagePlaceholder label="Design Variations — UI Explorations" height="300px" color={c} />
      </Section>

      {/* Impact and Outcomes */}
      <Section>
        <AccentH2 color={c}>Impact & Outcomes</AccentH2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {agent.impact.map((m, i) => (
            <MetricCard key={i} value={m.value} label={m.label} color={c} />
          ))}
        </div>
      </Section>
    </div>
  )
}

/* ── Agent Tab Bar ──────────────────────────────────────────── */
function AgentTabs({ activeId, onChange }) {
  return (
    <div style={{
      position: 'sticky',
      top: '57px',
      zIndex: 90,
      background: 'rgba(234,232,225,0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      padding: '10px 24px',
    }}>
      <div style={{
        maxWidth: '960px',
        margin: '0 auto',
        display: 'flex',
        gap: '4px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        background: 'rgba(0,0,0,0.04)',
        borderRadius: '20px',
        padding: '4px',
      }}>
        {AGENTS.map((agent) => {
          const isActive = activeId === agent.id
          return (
            <button
              key={agent.id}
              onClick={() => onChange(agent.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '16px',
                background: isActive ? '#111' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: isActive ? '#fff' : '#888',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.25s ease',
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              {isActive && (
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: agent.color, flexShrink: 0 }} />
              )}
              {agent.label}
              {isActive && (
                <span style={{ fontSize: '9px', fontWeight: 600, color: `${agent.color}CC`, background: `${agent.color}22`, borderRadius: '4px', padding: '1px 5px', marginLeft: '2px' }}>
                  {agent.sublabel}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Main Page ──────────────────────────────────────────────── */
export default function AIAgentsCasePage({ onBack, onPlay }) {
  const [activeAgent, setActiveAgent] = useState(AGENTS[0].id)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const agent = AGENTS.find((a) => a.id === activeAgent) || AGENTS[0]

  const handleTabChange = (id) => {
    setActiveAgent(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgb(234,232,225)',
      overflowY: 'auto',
      fontFamily: "'Nunito', sans-serif",
    }}>

      {/* ── Top Bar ── */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        background: 'rgba(234,232,225,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        height: '57px',
        boxSizing: 'border-box',
      }}>
        <button
          onClick={onBack}
          className="cs-back-btn"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '999px',
            padding: '8px 18px',
            fontSize: '13px', fontWeight: 600, color: '#333',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            fontFamily: "'Nunito', sans-serif",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#111' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#333'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Portfolio
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Nunito', sans-serif" }}>Case Study</span>
          <span style={{ width: '1px', height: '12px', background: '#ddd' }} />
          <span className="cs-topbar-step" style={{ fontSize: '12px', fontWeight: 600, color: '#555', fontFamily: "'Nunito', sans-serif" }}>AI Agents for Recruitment</span>
          {onPlay && (
            <>
              <span style={{ width: '1px', height: '12px', background: '#ddd' }} />
              <PlayButton onClick={() => onPlay(activeAgent)} />
            </>
          )}
        </div>
      </div>

      {/* ── Page content below fixed top bar ── */}
      <div style={{ paddingTop: '57px' }}>

        {/* ── Hero Section ── */}
        <div style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 70%, #1a1a1a 100%)',
          padding: 'clamp(48px, 6vw, 88px) clamp(24px, 5vw, 64px)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            zIndex: 0,
          }} />
          {/* Orbs */}
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(248,228,160,0.10) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-40px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,212,248,0.08) 0%, transparent 70%)', filter: 'blur(30px)' }} />
          <div style={{ position: 'absolute', top: '40%', right: '25%', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,244,212,0.07) 0%, transparent 70%)', filter: 'blur(20px)' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '960px', margin: '0 auto' }}>
            <span style={{ ...T.kicker, color: 'rgba(255,255,255,0.4)' }}>Case Study</span>
            <h1 style={{ ...T.h1, color: '#fff', marginBottom: '16px' }}>AI Agents for Recruitment</h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '560px', fontFamily: "'Nunito', sans-serif" }}>
              A deep dive into the six specialized AI agents that power autonomous talent acquisition — from intelligent matching to voice screening and orchestrated hiring.
            </p>

            {/* Meta chips */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
              {[
                { label: 'Role', value: 'Staff Product Designer', color: '#F8E4A0' },
                { label: 'Timeline', value: '2022 – Present', color: '#B8D4F8' },
                { label: 'Company', value: 'SenseHQ', color: '#B8F4D4' },
              ].map((m, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '999px',
                  padding: '10px 20px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  fontFamily: "'Nunito', sans-serif",
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.35)' }}>{m.label}</span>
                  <span style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.12)' }} />
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{m.value}</span>
                </div>
              ))}
            </div>

            {/* Hero image placeholder */}
            <div style={{
              width: '100%',
              height: 'clamp(200px, 30vw, 360px)',
              borderRadius: '20px',
              border: '1.5px dashed rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.04)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="4" width="16" height="12" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                  <circle cx="7" cy="9" r="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                  <path d="M2 14L6 10L9 13L13 8L18 14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', margin: 0 }}>Hero Image — AI Agents Overview</p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: 0 }}>Screenshot to be added</p>
            </div>
          </div>
        </div>

        {/* ── Summary Section ── */}
        <div style={{ background: 'rgb(234,232,225)', padding: 'clamp(40px, 5vw, 64px) clamp(24px, 5vw, 64px)' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <span style={T.kicker}>Project Summary</span>
            <h2 style={{ ...T.h2, marginTop: '4px', fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
              Six Agents. One Mission.
            </h2>
            <p style={{ ...T.body, maxWidth: '660px', fontSize: '15.5px', marginBottom: '36px' }}>
              The AI Agents suite at SenseHQ represents a fundamental shift from workflow automation to autonomous talent acquisition. Each agent is a specialist — designed with a clear scope, transparent reasoning, and a recruiter-in-control philosophy. Together, they form the engine behind SenseHQ's AI Recruiter product.
            </p>

            {/* KPI cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {SUMMARY_KPIS.map((kpi, i) => (
                <MetricCard key={i} value={kpi.value} label={kpi.label} color={kpi.color} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Agent Tabs ── */}
        <AgentTabs activeId={activeAgent} onChange={handleTabChange} />

        {/* ── Per-Agent Content ── */}
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: 'clamp(40px, 5vw, 64px) clamp(24px, 5vw, 40px) 80px' }}>
          <AgentContent key={activeAgent} agent={agent} />
        </div>
      </div>

      <style>{`
        @keyframes aaCsFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cs-back-btn:hover {
          background: #111 !important;
          color: #fff !important;
          border-color: #111 !important;
        }
      `}</style>
    </div>
  )
}
