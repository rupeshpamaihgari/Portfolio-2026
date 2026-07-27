import { useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback } from 'react'
import { DeckHeader, DeckFooter, SlidesDrawer } from './SlideChrome'
import { renderSlideBody, isFullBleed, ST } from './SlideLayouts'

/* ─────────────────────────────────────────────────────────────
   PresentationDeck — the shared slide-deck shell.

   Deck-agnostic: it only reads `deck.title`, `deck.routeBase` and
   `deck.parts[].slides[]`, then delegates each slide body to
   SlideLayouts. See decks/ for the content manifests.
───────────────────────────────────────────────────────────── */

const FONT_B = "'Nunito', sans-serif"

/* Flatten parts into a linear slide list, recording where each part starts. */
export function flattenDeck(deck) {
  const parts = []
  const slides = []
  let cursor = 0
  deck.parts.forEach((part, partIndex) => {
    const withStart = { ...part, startIndex: cursor, partIndex }
    parts.push(withStart)
    part.slides.forEach((slide, i) => {
      slides.push({ slide, part: withStart, localIndex: i })
    })
    cursor += part.slides.length
  })
  return { parts, slides }
}

export function countSlides(deck) {
  return deck.parts.reduce((n, p) => n + p.slides.length, 0)
}

export default function PresentationDeck({ deck, initialSlide = 0, onExit }) {
  const { parts, slides } = useMemo(() => flattenDeck(deck), [deck])
  const total = slides.length

  const [index, setIndex] = useState(() => Math.min(Math.max(initialSlide, 0), Math.max(total - 1, 0)))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [edges, setEdges] = useState({ top: false, bottom: false })

  const scrollerRef = useRef(null)
  const innerRef = useRef(null)
  const touchRef = useRef(null)

  const current = slides[index] || slides[0]
  const { slide, part, localIndex } = current

  const goTo = useCallback((n) => {
    setIndex(Math.min(Math.max(n, 0), total - 1))
  }, [total])

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, total - 1)), [total])
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), [])

  const exit = useCallback(() => {
    onExit?.(part.sourceStep, part.sourceAgentId)
  }, [onExit, part])

  /* ── Body scroll lock ─────────────────────────────────────── */
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prevOverflow }
  }, [])

  /* ── Hash sync — replaceState so the deck stays one history entry ── */
  useEffect(() => {
    const { pathname, search } = window.location
    const url = `${pathname}${search}#/${deck.routeBase}/present/${index + 1}`
    window.history.replaceState(null, '', url)
  }, [index, deck.routeBase])

  /* ── Reconcile external hash edits (manual URL change, history nav) ── */
  useEffect(() => {
    const handler = () => {
      const raw = window.location.hash.replace(/^#\/?/, '')
      const seg = raw.split('/')
      if (seg[0] !== deck.routeBase || seg[1] !== 'present') return
      const n = parseInt(seg[2], 10)
      const target = Number.isNaN(n) ? 0 : Math.min(Math.max(n - 1, 0), total - 1)
      setIndex((cur) => (cur === target ? cur : target))
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [deck.routeBase, total])

  /* ── Fade-edge bookkeeping ────────────────────────────────── */
  const updateEdges = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setEdges({
      top: el.scrollTop > 8,
      bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 8,
    })
  }, [])

  useLayoutEffect(() => {
    const el = scrollerRef.current
    if (el) el.scrollTop = 0
    updateEdges()
  }, [index, updateEdges])

  /* Images and videos change height after mount — watch the inner wrapper. */
  useEffect(() => {
    const el = innerRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(updateEdges)
    ro.observe(el)
    return () => ro.disconnect()
  }, [index, updateEdges])

  /* ── Keyboard ─────────────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.defaultPrevented) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      // The Lightbox portals to <body> and owns the keyboard while open.
      if (document.querySelector('[data-cs-lightbox]')) return
      if (e.target?.closest?.('input, textarea, [contenteditable], video')) return

      const el = scrollerRef.current

      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          if (drawerOpen) setDrawerOpen(false)
          else exit()
          return
        case 'ArrowRight':
        case 'PageDown':
        case 'n':
          e.preventDefault(); next(); return
        case 'ArrowLeft':
        case 'PageUp':
        case 'p':
          e.preventDefault(); prev(); return
        case 'Home':
          e.preventDefault(); goTo(0); return
        case 'End':
          e.preventDefault(); goTo(total - 1); return
        case 's':
        case 'm':
          e.preventDefault(); setDrawerOpen((o) => !o); return
        case ' ':
        case 'Spacebar': {
          e.preventDefault()
          if (!el) { e.shiftKey ? prev() : next(); return }
          const step = el.clientHeight * 0.85
          if (e.shiftKey) {
            if (el.scrollTop > 4) el.scrollBy({ top: -step, behavior: 'smooth' })
            else prev()
          } else if (el.scrollTop + el.clientHeight < el.scrollHeight - 4) {
            el.scrollBy({ top: step, behavior: 'smooth' })
          } else {
            next()
          }
          return
        }
        default:
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen, exit, next, prev, goTo, total])

  /* ── Touch swipe ──────────────────────────────────────────── */
  const onTouchStart = (e) => {
    if (e.target?.closest?.('.cs-media-frame')) { touchRef.current = null; return }
    const t = e.changedTouches[0]
    touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now() }
  }

  const onTouchEnd = (e) => {
    const s = touchRef.current
    if (!s) return
    touchRef.current = null
    const t = e.changedTouches[0]
    const dx = t.clientX - s.x
    const dy = t.clientY - s.y
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 2 && Date.now() - s.t < 500) {
      dx < 0 ? next() : prev()
    }
  }

  const accent = slide.accent || part.accent
  const fullBleed = isFullBleed(slide)
  const ctx = { partIndex: part.partIndex, partCount: parts.length, localIndex, total, index }

  return (
    <div
      className="pd-root"
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgb(234,232,225)', overflow: 'hidden', fontFamily: FONT_B,
      }}
    >
      <DeckHeader
        deckTitle={deck.title}
        part={part}
        index={index}
        total={total}
        drawerOpen={drawerOpen}
        onToggleDrawer={() => setDrawerOpen((o) => !o)}
        onExit={exit}
      />

      {/* Stage */}
      <div className="pd-stage" style={{ position: 'absolute', top: '57px', bottom: '72px', left: 0, right: 0 }}>
        <div
          ref={scrollerRef}
          className="pd-scroller"
          onScroll={updateEdges}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div
            key={index}
            ref={innerRef}
            className="pd-slide"
            /* The entrance transform inflates scrollHeight while it runs, so the
               edges must be re-measured once the slide has settled. */
            onAnimationEnd={updateEdges}
            style={{
              maxWidth: '1080px', margin: '0 auto', padding: '44px 40px 52px',
              boxSizing: 'border-box', minHeight: '100%',
              display: 'flex', flexDirection: 'column',
              animation: 'caseStudyFadeIn 0.4s cubic-bezier(0.33, 1, 0.68, 1) both',
            }}
          >
            {/* Auto margins centre short slides in the stage and collapse to 0
                once content overflows — unlike justify-content, which would
                make the top of a tall slide unreachable in a scroll container. */}
            <div style={{ marginTop: 'auto', marginBottom: 'auto', width: '100%', minWidth: 0 }}>
              {!fullBleed && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
                    <span style={ST.kicker}>
                      {String(localIndex + 1).padStart(2, '0')}
                      {slide.kicker ? ` · ${slide.kicker}` : ''}
                    </span>
                  </div>
                  <h2 className="pd-slide-title" style={ST.title}>{slide.title}</h2>
                </>
              )}
              {renderSlideBody(slide, accent, ctx)}
            </div>
          </div>
        </div>

        {/* Fade edges */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '28px', pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgb(234,232,225), rgba(234,232,225,0))',
            opacity: edges.top ? 1 : 0, transition: 'opacity 0.2s ease',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px', pointerEvents: 'none',
            background: 'linear-gradient(to top, rgb(234,232,225), rgba(234,232,225,0))',
            opacity: edges.bottom ? 1 : 0, transition: 'opacity 0.2s ease',
          }}
        />
      </div>

      <DeckFooter
        part={part}
        localIndex={localIndex}
        partStart={part.startIndex}
        index={index}
        total={total}
        isLast={index === total - 1}
        onPrev={prev}
        onNext={index === total - 1 ? exit : next}
        onJump={goTo}
      />

      <SlidesDrawer
        open={drawerOpen}
        deck={deck}
        parts={parts}
        index={index}
        total={total}
        onJump={(n) => { goTo(n); setDrawerOpen(false) }}
        onClose={() => setDrawerOpen(false)}
      />

      <style>{`
        .pd-scroller::-webkit-scrollbar { width: 0; height: 0; }
        .pd-num-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }
        .pd-dot:hover { background: rgba(0,0,0,0.45) !important; }
        .pd-img-frame:hover .pd-expand { opacity: 1; }
        /* Panorama frames get a shorter fixed height on small or short screens. */
        @media (max-height: 760px) { .pd-wide .cs-media-frame { height: 340px !important; } }
        @media (max-width: 768px)  { .pd-wide .cs-media-frame { height: 260px !important; } }
        .pd-img-frame:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 34px rgba(0,0,0,0.1) !important;
        }
        .pd-drawer-row:hover { background: rgba(0,0,0,0.05); }
        .pd-drawer-row[aria-current="true"]:hover { background: #111; }

        @media (max-width: 768px) {
          .pd-header { height: 52px !important; padding: 0 12px !important; }
          .pd-stage  { top: 52px !important; bottom: 112px !important; }
          .pd-slide  { padding: 24px 18px 32px !important; }
          .pd-deck-title, .pd-counter, .pd-part-label { display: none !important; }
          /* Header collapses to icons; the footer keeps its labels — there is room. */
          .pd-header .pd-btn-label { display: none; }
          .pd-icon-btn {
            padding: 0 !important; width: 34px; height: 34px;
            justify-content: center; gap: 0 !important;
          }
          .pd-footer {
            height: 112px !important; flex-wrap: wrap; align-content: center;
            padding: 0 14px !important; gap: 0 !important;
          }
          .pd-dot-cluster {
            order: -1; width: 100%; height: 44px; justify-content: center;
            overflow-x: auto; scrollbar-width: none;
          }
          .pd-dot-cluster::-webkit-scrollbar { height: 0; }
          .pd-nav-btn { flex: 1 1 0; justify-content: center; }
          .pd-drawer { width: 100% !important; max-width: none !important; }
          .pd-bullets-impact, .pd-split { grid-template-columns: 1fr !important; gap: 18px !important; }
          .pd-impact-card { position: static !important; padding: 24px !important; }
          .pd-slide-title { font-size: clamp(22px, 6vw, 30px) !important; margin-bottom: 20px !important; }
          .pd-flow { flex-direction: column; }
          .pd-flow > div { flex-direction: column; }
          .pd-flow-arrow { transform: rotate(90deg); align-self: center !important; }
          .pd-divider-body { max-width: 100% !important; }
          .pd-divider-numeral { opacity: 0.18 !important; right: -30px !important; }
          .pd-gallery { grid-template-columns: 1fr !important; }
          .pd-blocks { grid-template-columns: 1fr !important; gap: 18px !important; }
          .pd-expand { opacity: 1 !important; }
        }

        @media (max-height: 620px) {
          .pd-slide  { padding: 20px 24px 24px !important; }
          .pd-stage  { bottom: 60px; }
          .pd-footer { height: 60px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pd-slide  { animation: none !important; }
          .pd-drawer { transition: none !important; }
        }
      `}</style>
    </div>
  )
}
