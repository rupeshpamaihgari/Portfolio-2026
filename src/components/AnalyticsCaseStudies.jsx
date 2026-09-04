import { useState } from 'react'
import { ANALYTICS_CASES } from '../data/analyticsCases'

/* ═══════════════════════════════════════════════════════════════════
   Case study card (grid tile) — click navigates to #/analytics/<id>
═══════════════════════════════════════════════════════════════════ */
function CaseCard({ cs }) {
  const [hovered, setHovered] = useState(false)
  const handleOpen = () => {
    window.location.hash = `/analytics/${cs.id}`
    window.scrollTo({ top: 0 })
  }
  return (
    <button
      onClick={handleOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textAlign: 'left', width: '100%', display: 'block',
        background: '#fff', borderRadius: '20px', padding: 0,
        border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.1)' : '0 2px 16px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Thumbnail — real screenshot (or icon fallback for Jarvis) */}
      <div style={{
        aspectRatio: '16/10', overflow: 'hidden',
        background: `linear-gradient(135deg, ${cs.accent}30 0%, ${cs.accent}10 100%)`,
        borderBottom: `3px solid ${cs.accent}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        {cs.thumb ? (
          <img
            src={cs.thumb}
            alt={cs.title}
            loading="lazy"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top center',
              transition: 'transform 0.35s ease',
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
              display: 'block',
            }}
          />
        ) : (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
            color: cs.accent, fontFamily: "'Fredoka', sans-serif",
          }}>
            <div style={{
              fontSize: '40px', width: '72px', height: '72px', borderRadius: '50%',
              background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>💬</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#111', letterSpacing: '-0.02em' }}>
              Jarvis
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: cs.accent, margin: '0 0 8px' }}>
          {cs.kicker}
        </p>
        <h4 style={{ fontSize: '17px', fontWeight: 600, color: '#111', margin: '0 0 8px', letterSpacing: '-0.02em', lineHeight: 1.25, fontFamily: "'Fredoka', sans-serif" }}>
          {cs.title}
        </h4>
        <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#666', margin: '0 0 14px' }}>
          {cs.tagline}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#111', letterSpacing: '-0.005em' }}>
          Read case study
          <span style={{
            transition: 'transform 0.25s ease',
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          }}>→</span>
        </div>
      </div>
    </button>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Main tab component — grid of 4 case study cards
═══════════════════════════════════════════════════════════════════ */
export default function AnalyticsCaseStudies() {
  return (
    <div style={{ paddingTop: '8px', paddingBottom: '16px', animation: 'fadeInUp 0.4s cubic-bezier(0.33,1,0.68,1) forwards' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', marginBottom: '8px' }}>
          Analytics · SenseHQ
        </p>
        <h3 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 600, letterSpacing: '-0.025em', color: '#111', marginBottom: '10px' }}>
          Dashboards that turn data into decisions
        </h3>
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#666', maxWidth: '620px' }}>
          Four analytics case studies from the Sense platform — each built to answer a customer question that was killing renewals, and each shipping a measurable business outcome.
        </p>
      </div>

      {/* Grid of case studies */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '22px' }}>
        {ANALYTICS_CASES.map(cs => (
          <CaseCard key={cs.id} cs={cs} />
        ))}
      </div>
    </div>
  )
}
