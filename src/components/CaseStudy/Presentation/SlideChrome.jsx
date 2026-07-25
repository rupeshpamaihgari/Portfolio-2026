import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────
   Deck chrome — header, footer, dot rail, slide drawer.
   Kept apart from PresentationDeck so the shell stays readable.
───────────────────────────────────────────────────────────── */

const FONT_B = "'Nunito', sans-serif"
const FROST = {
  background: 'rgba(234,232,225,0.82)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
}

const MAX_DOTS = 11

/* ── Icons ───────────────────────────────────────────────────── */

const IconSlides = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1.5 3h11M1.5 7h11M1.5 11h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const IconClose = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const IconPrev = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconNext = () => (
  <svg className="cs-nav-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ transition: 'transform 0.25s ease' }}>
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ── Header ──────────────────────────────────────────────────── */

export function DeckHeader({ deckTitle, part, index, total, onToggleDrawer, onExit, drawerOpen }) {
  return (
    <header
      className="pd-header"
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '57px', zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px',
        padding: '0 18px', boxSizing: 'border-box',
        borderBottom: '1px solid rgba(0,0,0,0.06)', ...FROST,
      }}
    >
      <button
        onClick={onToggleDrawer}
        className="cs-back-btn pd-icon-btn"
        aria-label="All slides"
        aria-expanded={drawerOpen}
        title="All slides (S)"
        style={{
          display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0,
          background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0,0,0,0.08)', borderRadius: '999px',
          padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#333',
          cursor: 'pointer', transition: 'all 0.25s ease', fontFamily: FONT_B,
        }}
      >
        <IconSlides />
        <span className="pd-btn-label">All slides</span>
      </button>

      <div className="pd-breadcrumb" style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
        <span className="pd-deck-title" style={{ fontSize: '12px', fontWeight: 700, color: '#111', fontFamily: FONT_B, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '40%' }}>
          {deckTitle}
        </span>
        <span className="pd-deck-title" style={{ width: '1px', height: '12px', background: '#ddd', flexShrink: 0 }} />
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: part.accent, flexShrink: 0 }} />
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#555', fontFamily: FONT_B, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {part.label}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <span className="pd-counter" style={{ fontSize: '11px', fontWeight: 700, color: '#999', letterSpacing: '0.06em', fontFamily: FONT_B, fontVariantNumeric: 'tabular-nums' }}>
          {index + 1} / {total}
        </span>
        <button
          onClick={onExit}
          className="cs-back-btn pd-icon-btn"
          aria-label="Exit presentation"
          title="Exit presentation (Esc)"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(0,0,0,0.08)', borderRadius: '999px',
            padding: '8px 16px', fontSize: '13px', fontWeight: 600, color: '#333',
            cursor: 'pointer', transition: 'all 0.25s ease', fontFamily: FONT_B,
          }}
        >
          <span className="pd-btn-label">Exit</span>
          <IconClose />
        </button>
      </div>
    </header>
  )
}

/* ── Dot rail — scoped to the current part ───────────────────── */

function DotRail({ part, localIndex, partStart, onJump }) {
  const n = part.slides.length
  const start = n <= MAX_DOTS ? 0 : Math.min(Math.max(localIndex - 5, 0), n - MAX_DOTS)
  const end = Math.min(start + MAX_DOTS, n)
  const visible = []
  for (let i = start; i < end; i++) visible.push(i)

  const marker = (key) => (
    <span key={key} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(0,0,0,0.18)', opacity: 0.5, flexShrink: 0 }} />
  )

  return (
    <div className="pd-dots" style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
      {start > 0 && marker('lead')}
      {visible.map((i) => {
        const isActive = i === localIndex
        return (
          <button
            key={i}
            onClick={() => onJump(partStart + i)}
            title={part.slides[i].navLabel || part.slides[i].title}
            aria-label={`Slide ${i + 1}: ${part.slides[i].navLabel || part.slides[i].title}`}
            aria-current={isActive ? 'true' : undefined}
            className="pd-dot"
            style={{
              width: isActive ? '22px' : '6px', height: '6px',
              borderRadius: '999px', border: 'none', padding: 0, flexShrink: 0, cursor: 'pointer',
              background: isActive ? '#111' : i < localIndex ? 'rgba(0,0,0,0.32)' : 'rgba(0,0,0,0.18)',
              transition: 'all 0.25s cubic-bezier(0.34, 1, 0.64, 1)',
            }}
          />
        )
      })}
      {end < n && marker('trail')}
    </div>
  )
}

/* ── Footer ──────────────────────────────────────────────────── */

export function DeckFooter({ part, localIndex, partStart, index, total, onPrev, onNext, onJump, isLast }) {
  const atStart = index === 0
  return (
    <footer
      className="pd-footer"
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '72px', zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
        padding: '0 18px', boxSizing: 'border-box',
        borderTop: '1px solid rgba(0,0,0,0.06)', ...FROST,
      }}
    >
      {/* Global progress */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '-1px', left: 0, height: '2px', background: '#111',
          width: `${((index + 1) / total) * 100}%`,
          transition: 'width 0.3s cubic-bezier(0.33, 1, 0.68, 1)',
        }}
      />

      <button
        onClick={onPrev}
        className="btn-light pd-nav-btn"
        disabled={atStart}
        aria-label="Previous slide"
        style={{
          display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 20px',
          fontSize: '13px', fontWeight: 600, fontFamily: FONT_B, flexShrink: 0,
          opacity: atStart ? 0.35 : 1, pointerEvents: atStart ? 'none' : 'auto',
        }}
      >
        <IconPrev />
        <span className="pd-btn-label">Back</span>
      </button>

      <div className="pd-dot-cluster" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px', minWidth: 0 }}>
        <span className="pd-part-label" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', fontFamily: FONT_B, whiteSpace: 'nowrap' }}>
          {part.label}
        </span>
        <DotRail part={part} localIndex={localIndex} partStart={partStart} onJump={onJump} />
      </div>

      <button
        onClick={onNext}
        className="btn-dark cs-nav-btn-next pd-nav-btn"
        aria-label={isLast ? 'Finish presentation' : 'Next slide'}
        style={{
          display: 'flex', alignItems: 'center', gap: '7px', padding: '10px 22px',
          fontSize: '13px', fontWeight: 600, fontFamily: FONT_B, flexShrink: 0,
        }}
      >
        <span className="pd-btn-label">{isLast ? 'Finish' : 'Next'}</span>
        <IconNext />
      </button>
    </footer>
  )
}

/* ── Slides drawer ───────────────────────────────────────────── */

export function SlidesDrawer({ open, deck, parts, index, total, onJump, onClose }) {
  const activeRef = useRef(null)

  useEffect(() => {
    if (open) activeRef.current?.scrollIntoView({ block: 'center' })
  }, [open, index])

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1400, background: 'rgba(0,0,0,0.28)',
          opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.28s ease',
        }}
      />
      <aside
        className="pd-drawer"
        aria-hidden={!open}
        aria-label="All slides"
        style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, zIndex: 1410,
          width: '320px', maxWidth: '86vw',
          background: 'rgba(234,232,225,0.96)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 0 60px rgba(0,0,0,0.12)',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.32s cubic-bezier(0.33, 1, 0.68, 1)',
          pointerEvents: open ? 'auto' : 'none',
          display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ height: '57px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '10px', padding: '0 18px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#111', fontFamily: FONT_B }}>All slides</span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#999', fontFamily: FONT_B }}>{total} slides</span>
          <button
            onClick={onClose}
            aria-label="Close slide list"
            style={{
              marginLeft: 'auto', width: '28px', height: '28px', borderRadius: '50%',
              border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(255,255,255,0.5)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#555', transition: 'all 0.2s ease',
            }}
          >
            <IconClose />
          </button>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 24px' }}>
          {parts.map((part) => (
            <div key={part.id} style={{ marginBottom: '6px' }}>
              <div
                style={{
                  position: 'sticky', top: 0, zIndex: 1,
                  background: 'rgba(234,232,225,0.96)', backdropFilter: 'blur(8px)',
                  padding: '12px 10px 8px', display: 'flex', gap: '10px', alignItems: 'center',
                }}
              >
                <span style={{ width: '3px', height: '16px', background: part.accent, borderRadius: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#666', fontFamily: FONT_B }}>
                  {part.label}
                </span>
                <span style={{ fontSize: '10px', color: '#bbb', fontFamily: FONT_B, marginLeft: 'auto' }}>{part.slides.length}</span>
              </div>

              {part.slides.map((slide, i) => {
                const globalIndex = part.startIndex + i
                const isActive = globalIndex === index
                return (
                  <button
                    key={slide.id}
                    ref={isActive ? activeRef : null}
                    onClick={() => onJump(globalIndex)}
                    className="pd-drawer-row"
                    aria-current={isActive ? 'true' : undefined}
                    style={{
                      display: 'flex', gap: '10px', alignItems: 'flex-start', width: '100%',
                      padding: '9px 12px', borderRadius: '12px', border: 'none', textAlign: 'left',
                      cursor: 'pointer', transition: 'background 0.2s ease',
                      background: isActive ? '#111' : 'transparent',
                    }}
                  >
                    <span style={{ fontSize: '10px', fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.45)' : '#bbb', fontFamily: FONT_B, minWidth: '18px', marginTop: '3px', fontVariantNumeric: 'tabular-nums' }}>
                      {globalIndex + 1}
                    </span>
                    <span style={{ flex: 1, minWidth: 0, fontSize: '13px', fontWeight: isActive ? 600 : 500, color: isActive ? '#fff' : '#444', lineHeight: 1.45, fontFamily: FONT_B }}>
                      {slide.navLabel || slide.title}
                    </span>
                    {isActive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: part.accent, flexShrink: 0, marginTop: '6px' }} />}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
