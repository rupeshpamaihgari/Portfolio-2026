import { useState, useEffect } from 'react'
import { getAnalyticsCase } from '../data/analyticsCases'
import { Lightbox } from './CaseStudy/CaseStudyMedia'

const bodyText = { fontSize: '15px', lineHeight: 1.75, color: '#555', margin: '0 0 12px', letterSpacing: '-0.005em' }

/* ─────────────────────────────────────────────────────────────
   Section block with numbered kicker + coloured left rail
────────────────────────────────────────────────────────────── */
function Block({ number, label, accent, children }) {
  return (
    <section style={{ marginBottom: '56px', position: 'relative', paddingLeft: '24px', borderLeft: `2px solid ${accent}40` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <span style={{
          background: accent, color: '#111', fontWeight: 700, fontSize: '11px',
          padding: '4px 12px', borderRadius: '999px', letterSpacing: '0.04em',
        }}>{number}</span>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</h3>
      </div>
      {children}
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   Top bar — sticky back button + breadcrumb
────────────────────────────────────────────────────────────── */
function TopBar({ cs, onBack }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(234,232,225,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      padding: '14px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: "'Nunito', sans-serif",
    }}>
      <button
        onClick={onBack}
        className="btn-light"
        style={{ fontSize: '13px', padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '6px' }}
      >
        ← Back to Portfolio
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999' }}>
          Analytics Case Study
        </span>
        <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#bbb' }} />
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#111', letterSpacing: '-0.01em' }}>
          {cs.title}
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Main page — one full analytics case study
═══════════════════════════════════════════════════════════════════ */
export default function AnalyticsCasePage({ id, onBack }) {
  const cs = getAnalyticsCase(id)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => { window.scrollTo({ top: 0 }) }, [id])

  if (!cs) {
    return (
      <div style={{ minHeight: '100vh', background: 'rgb(234,232,225)', padding: '80px 32px', textAlign: 'center', fontFamily: "'Nunito', sans-serif" }}>
        <h2 style={{ fontSize: '24px', color: '#111', marginBottom: '12px' }}>Case study not found</h2>
        <button onClick={onBack} className="btn-dark" style={{ fontSize: '14px', padding: '12px 28px' }}>← Back to Portfolio</button>
      </div>
    )
  }

  const accent = cs.accent

  return (
    <div style={{ background: 'rgb(234,232,225)', minHeight: '100vh', fontFamily: "'Nunito', sans-serif" }}>
      <TopBar cs={cs} onBack={onBack} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 32px 100px' }}>
        {/* Hero */}
        <div style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, marginBottom: '14px' }}>
            {cs.kicker}
          </p>
          <h1 style={{
            fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1.05,
            color: '#111', marginBottom: '18px', fontFamily: "'Fredoka', sans-serif",
          }}>
            {cs.title}
          </h1>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#555', maxWidth: '720px', letterSpacing: '-0.01em' }}>
            {cs.tagline}
          </p>

          {/* Hero metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '32px' }}>
            {cs.heroMetric.map((m, i) => (
              <div key={i} style={{
                background: `linear-gradient(135deg, ${accent}25 0%, ${accent}10 100%)`,
                borderRadius: '16px', padding: '20px 22px', border: `1px solid ${accent}40`,
              }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#111', letterSpacing: '-0.02em', marginBottom: '4px', fontFamily: "'Fredoka', sans-serif" }}>{m.v}</div>
                <div style={{ fontSize: '12px', color: '#666', lineHeight: 1.4 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 1. Persona */}
        <Block number="01" label="User Persona" accent={accent}>
          <p style={{ ...bodyText, fontWeight: 700, color: '#111', marginBottom: '12px' }}>{cs.persona.name}</p>
          <div style={{
            background: '#fff', borderLeft: `3px solid ${accent}`, padding: '18px 22px',
            borderRadius: '10px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <p style={{ fontStyle: 'italic', fontSize: '16px', lineHeight: 1.7, color: '#333', margin: 0 }}>
              {cs.persona.quote}
            </p>
          </div>
          <p style={bodyText}>{cs.persona.context}</p>
        </Block>

        {/* 2. Problem */}
        <Block number="02" label="Problem Statement" accent={accent}>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {cs.problem.map((p, i) => (
              <li key={i} style={{ ...bodyText, marginBottom: '10px' }}>{p}</li>
            ))}
          </ul>
        </Block>

        {/* 3. Goal */}
        <Block number="03" label="Goal" accent={accent}>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {cs.goal.map((g, i) => (
              <li key={i} style={{ ...bodyText, marginBottom: '10px' }}>{g}</li>
            ))}
          </ul>
        </Block>

        {/* 4. Research */}
        <Block number="04" label="Research" accent={accent}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            {cs.research.map((r, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: '14px', padding: '18px 20px',
                border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#111', margin: '0 0 8px', letterSpacing: '-0.005em' }}>{r.t}</p>
                <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#666', margin: 0 }}>{r.b}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* 5. Design decisions + screens */}
        <Block number="05" label="Design Decisions & Screens" accent={accent}>
          {cs.video && (
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                background: '#000', borderRadius: '16px', overflow: 'hidden',
                border: '1.5px solid rgba(0,0,0,0.08)',
                boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
              }}>
                <video
                  src={cs.video.src}
                  controls
                  playsInline
                  preload="metadata"
                  style={{ width: '100%', display: 'block', background: '#000' }}
                />
              </div>
              {cs.video.caption && (
                <p style={{ fontSize: '13px', color: '#666', margin: '10px 4px 0', lineHeight: 1.6, fontStyle: 'italic' }}>
                  {cs.video.caption}
                </p>
              )}
            </div>
          )}
          {cs.images.length > 0 && (
            <>
              <p style={{ ...bodyText, marginBottom: '24px' }}>
                Final designs below — click any screen to open the lightbox and zoom in. Every design decision that follows is traceable to a research insight or a technical constraint.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
                {cs.images.map((img, i) => (
                  <div key={i} style={{
                    background: '#fff', borderRadius: '16px', overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  }}>
                    <button
                      onClick={() => setLightbox({ src: img.src, alt: img.caption })}
                      style={{ display: 'block', width: '100%', border: 'none', padding: 0, background: 'transparent', cursor: 'zoom-in' }}
                    >
                      <img src={img.src} alt={img.caption} loading="lazy" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </button>
                    <div style={{ padding: '16px 22px', borderTop: '1px solid rgba(0,0,0,0.05)', background: '#faf9f6' }}>
                      <p style={{ fontSize: '13.5px', color: '#555', margin: 0, lineHeight: 1.6, fontStyle: 'italic' }}>
                        <strong style={{ color: '#111', fontStyle: 'normal' }}>Screen {i + 1}:</strong> {img.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {cs.designDecisions.map((d, i) => (
              <div key={i} style={{
                display: 'flex', gap: '16px', alignItems: 'flex-start',
                background: '#fff', borderRadius: '14px', padding: '18px 22px',
                border: '1px solid rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  flexShrink: 0, width: '30px', height: '30px', borderRadius: '8px',
                  background: accent, color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 800, marginTop: '2px',
                }}>{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#111', margin: '0 0 6px', letterSpacing: '-0.005em' }}>{d.t}</p>
                  <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#555', margin: 0 }}>{d.b}</p>
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* 6. Testing */}
        <Block number="06" label="User Testing (Maze)" accent={accent}>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {cs.testing.map((t, i) => (
              <li key={i} style={{ ...bodyText, marginBottom: '10px' }}>{t}</li>
            ))}
          </ul>
        </Block>

        {/* 7. Technical constraints */}
        <Block number="07" label="Technical Constraints" accent={accent}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
            {cs.constraints.map((c, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: '14px', padding: '18px 22px',
                border: '1px dashed rgba(0,0,0,0.12)',
              }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#c0392b', margin: '0 0 8px', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                  ⚠ {c.t}
                </p>
                <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#555', margin: 0 }}>{c.b}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* 8. Outcomes */}
        <Block number="08" label="Outcomes" accent={accent}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            {cs.outcomes.map((o, i) => (
              <div key={i} style={{
                background: `linear-gradient(135deg, ${accent}30 0%, ${accent}10 100%)`,
                borderRadius: '14px', padding: '22px 24px', border: `1px solid ${accent}50`,
              }}>
                <div style={{
                  fontSize: '28px', fontWeight: 700, color: '#111',
                  letterSpacing: '-0.02em', marginBottom: '6px',
                  fontFamily: "'Fredoka', sans-serif",
                }}>{o.v}</div>
                <div style={{ fontSize: '12.5px', color: '#555', lineHeight: 1.5 }}>{o.l}</div>
              </div>
            ))}
          </div>
        </Block>

        {/* Footer back */}
        <div style={{ marginTop: '48px', paddingTop: '28px', borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', gap: '10px' }}>
          <button onClick={onBack} className="btn-dark" style={{ fontSize: '13px', padding: '11px 24px' }}>
            ← Back to Portfolio
          </button>
        </div>
      </div>

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </div>
  )
}
