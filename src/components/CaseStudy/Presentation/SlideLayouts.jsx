import { useState, useEffect, useRef } from 'react'
import { CaseStudyVideo, CaseStudyScrollableImage, Lightbox } from '../CaseStudyMedia'

/* ─────────────────────────────────────────────────────────────
   Slide layout primitives.

   Every layout receives ({ slide, accent }). The shell renders the
   shared frame (kicker + title) and then delegates the body here.
   Palette, fonts and radii all come from the portfolio design system.
───────────────────────────────────────────────────────────── */

export const PALETTE = ['#F4A58A', '#B8D4F8', '#B8F4D4', '#F8E4A0', '#D4B8F8', '#c8f4f0', '#f4c8d4', '#e4d4f8']

/* The site's existing dark hero mesh — reused for cover + impact cards */
const DARK_MESH = 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 40%, #16213e 70%, #1a1a1a 100%)'
const DOT_GRID = 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)'

const FONT_H = "'Fredoka', sans-serif"
const FONT_B = "'Nunito', sans-serif"

/* Slide typography scale — larger than the scroll-mode `T` object,
   because slides are read at presentation distance. */
export const ST = {
  kicker: {
    fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#999', fontFamily: FONT_B,
  },
  title: {
    fontSize: 'clamp(26px, 3.2vw, 40px)', fontWeight: 700,
    letterSpacing: '-0.03em', lineHeight: 1.15, color: '#111',
    margin: '10px 0 28px', fontFamily: FONT_H,
  },
  body: {
    fontSize: '14.5px', lineHeight: 1.75, color: '#555', fontFamily: FONT_B,
  },
  cardTitle: {
    fontSize: '14px', fontWeight: 700, color: '#111',
    letterSpacing: '-0.01em', fontFamily: FONT_B,
  },
  caption: {
    fontSize: '12.5px', color: '#888', fontFamily: FONT_B, lineHeight: 1.6,
  },
}

const CARD = {
  background: '#fff',
  borderRadius: '16px',
  border: '1px solid rgba(0,0,0,0.05)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
}

/* ── Small shared pieces ─────────────────────────────────────── */

function Lede({ children }) {
  if (!children) return null
  return (
    <p style={{ ...ST.body, fontSize: '16px', lineHeight: 1.8, color: '#555', maxWidth: '780px', margin: '0 0 26px' }}>
      {children}
    </p>
  )
}

/* Fitted slide image.

   The image fills its column and grows in proportion, so the frame always
   carries the image's own aspect ratio and never shows padding beside it.
   Panoramas too wide to read at that size fall back to the case study's
   horizontal-scroll frame. Full detail is one click away in the Lightbox. */
function SlideImage({ src, alt = '', scrollFrame, scrollHeight = 430, pan = false, aspect }) {
  const [open, setOpen] = useState(false)
  const [ratio, setRatio] = useState(null)
  const [boxW, setBoxW] = useState(0)
  const boxRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    const probe = new Image()
    probe.onload = () => {
      if (!cancelled && probe.naturalHeight) setRatio(probe.naturalWidth / probe.naturalHeight)
    }
    probe.src = src
    return () => { cancelled = true }
  }, [src])

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const measure = () => setBoxW(el.clientWidth)
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* Scroll frame only when the image genuinely cannot fit: at the frame's
     height it would still be wider than the column. A ratio test alone is not
     enough — a wide-ish image in a wide column fits fine, and forcing it to
     scroll would leave dead space to its right. */
  const panorama = scrollFrame !== undefined
    ? scrollFrame
    /* Pannable diagrams are always framed — panning is the whole point. */
    : pan || (ratio !== null && boxW > 0 && ratio * scrollHeight > boxW + 8)

  if (panorama) {
    return (
      <div ref={boxRef} className="pd-wide" style={{ minWidth: 0 }}>
        <CaseStudyScrollableImage src={src} alt={alt} pan={pan} height={scrollHeight} style={{ margin: 0 }} />
      </div>
    )
  }

  return (
    <div ref={boxRef} style={{ minWidth: 0 }}>
      <div style={{ minWidth: 0 }}>
        <div
          className="cs-media-frame pd-img-frame"
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          aria-label={alt ? `Expand image: ${alt}` : 'Expand image'}
          onKeyDown={(e) => { if (e.key === 'Enter') setOpen(true) }}
          style={{
            borderRadius: '18px', border: '1.5px solid #e8e6e0', background: '#fff',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 2px rgba(0,0,0,0.03)',
            overflow: 'hidden', position: 'relative', cursor: 'zoom-in',
            maxWidth: '100%', lineHeight: 0,
            ...(aspect ? { aspectRatio: aspect, display: 'flex', alignItems: 'center', justifyContent: 'center' } : null),
          }}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            style={
              aspect
                /* A fixed aspect ratio + contain keeps a row of differently-
                   shaped illustrations on one grid — the frame is white, so
                   the letterbox padding this trades away is invisible here. */
                ? { display: 'block', width: '100%', height: '100%', objectFit: 'contain' }
                /* Otherwise fill the column and grow in proportion — no height
                   cap, since capping height while width is 100% is exactly
                   what letterboxes a solo hero image. */
                : { display: 'block', width: '100%', height: 'auto' }
            }
          />
          <span
            aria-hidden="true"
            className="pd-expand"
            style={{
              position: 'absolute', top: '10px', right: '10px',
              background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px', padding: '6px', lineHeight: 0,
              backdropFilter: 'blur(6px)', opacity: 0, transition: 'opacity 0.25s ease',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M1 5V1H5M9 1H13V5M13 9V13H9M5 13H1V9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </div>
  )
}

function Media({ media }) {
  if (!media) return null
  const { kind = 'image', src, alt = '', scrollFrame, pan = false } = media
  if (kind === 'video') return <CaseStudyVideo src={src} style={{ margin: 0 }} />
  return (
    <SlideImage
      src={src}
      alt={alt}
      pan={pan}
      /* `kind: 'scroll'` is only a hint — SlideImage decides from the real
         image ratio and column width. Set `scrollFrame` to force it. */
      scrollFrame={scrollFrame}
    />
  )
}

/* Row of supporting images — used where the scroll-mode case study shows a
   set of illustrations for one idea (limitation diagrams, phase artefacts). */
function Gallery({ items = [], columns, aspect = '4 / 3' }) {
  if (!items.length) return null
  const cols = columns || Math.min(items.length, 3)
  return (
    <div
      className="pd-gallery"
      style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '14px', marginTop: '22px', alignItems: 'start' }}
    >
      {items.map((it, i) => (
        <figure key={i} style={{ margin: 0, minWidth: 0 }}>
          {/* A shared aspect ratio — not each image's own — is what keeps a
              row of differently-shaped illustrations reading as one grid. */}
          <SlideImage src={it.src} alt={it.alt || ''} scrollHeight={220} aspect={it.aspect || aspect} />
          {it.caption && (
            <figcaption style={{ ...ST.caption, fontSize: '12px', margin: '9px 2px 0', textAlign: 'center' }}>{it.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  )
}

/* ── 1. Title / cover ────────────────────────────────────────── */

function TitleSlide({ slide, accent }) {
  const { eyebrow, heading, subtitle, meta = [] } = slide.content || {}
  return (
    <div
      style={{
        background: DARK_MESH, borderRadius: '24px',
        padding: 'clamp(36px, 5vw, 68px)', position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundImage: DOT_GRID, backgroundSize: '24px 24px' }} />
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`, filter: 'blur(40px)' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-40px', width: '240px', height: '240px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)', filter: 'blur(30px)' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {eyebrow && <span style={{ ...ST.kicker, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '14px' }}>{eyebrow}</span>}
        <h1 style={{ fontFamily: FONT_H, fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.06, color: '#fff', margin: '0 0 16px' }}>
          {heading}
        </h1>
        {subtitle && (
          <p style={{ fontFamily: FONT_B, fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', maxWidth: '560px', margin: '0 0 32px' }}>
            {subtitle}
          </p>
        )}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {meta.map((m, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '999px',
                padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: FONT_B,
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: PALETTE[i % PALETTE.length], flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.35)' }}>{m.label}</span>
              <span style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.12)' }} />
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── 2. Section divider ──────────────────────────────────────── */

function SectionDivider({ slide, accent, ctx }) {
  const { number, label, thesis } = slide.content || {}
  const partCount = ctx?.partCount ?? 0
  const partIndex = ctx?.partIndex ?? 0

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px 0' }}>
      <span
        aria-hidden="true"
        className="pd-divider-numeral"
        style={{
          position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)',
          fontFamily: FONT_H, fontSize: 'clamp(150px, 24vw, 300px)', fontWeight: 700, lineHeight: 0.8,
          color: accent, opacity: 0.32, letterSpacing: '-0.06em', pointerEvents: 'none', userSelect: 'none',
        }}
      >
        {number}
      </span>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '64%' }} className="pd-divider-body">
        <h2 style={{ fontFamily: FONT_H, fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.06, color: '#111', margin: '0 0 20px' }}>
          {label}
        </h2>
        {thesis && (
          <p style={{ fontFamily: FONT_B, fontSize: '17px', lineHeight: 1.75, color: '#555', maxWidth: '640px', margin: 0 }}>
            {thesis}
          </p>
        )}
        {partCount > 0 && (
          <div style={{ display: 'flex', gap: '7px', marginTop: '36px' }}>
            {Array.from({ length: partCount }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: i === partIndex ? '26px' : '7px', height: '7px', borderRadius: '999px',
                  background: i === partIndex ? '#111' : i < partIndex ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.14)',
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── 3. Bullets + impact (the reference layout) ──────────────── */

function BulletsImpact({ slide, accent }) {
  const { lede, cards = [], impact, media, caption, gallery } = slide.content || {}
  return (
    <>
      <Lede>{lede}</Lede>
      <div className="pd-bullets-impact" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '28px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
          {cards.map((c, i) => (
            <div
              key={i}
              className="pd-num-card"
              style={{ ...CARD, padding: '18px 22px', display: 'flex', gap: '14px', alignItems: 'flex-start', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
            >
              <span style={{ fontFamily: FONT_B, fontSize: '13px', fontWeight: 700, color: accent, minWidth: '20px', marginTop: '2px', fontVariantNumeric: 'tabular-nums' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div style={{ minWidth: 0 }}>
                {c.title && <div style={{ ...ST.cardTitle, marginBottom: '6px' }}>{c.title}</div>}
                <p style={{ fontFamily: FONT_B, fontSize: '13.5px', lineHeight: 1.7, color: '#555', margin: 0 }}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        {impact && (
          <div
            className="pd-impact-card"
            style={{
              background: DARK_MESH, borderRadius: '20px', padding: '30px',
              position: 'sticky', top: 0, overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, backgroundImage: DOT_GRID, backgroundSize: '24px 24px' }} />
            <div style={{ position: 'absolute', top: '-70px', right: '-70px', width: '220px', height: '220px', borderRadius: '50%', background: `radial-gradient(circle, ${accent}26 0%, transparent 70%)`, filter: 'blur(34px)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent }} />
                <span style={{ ...ST.kicker, color: 'rgba(255,255,255,0.4)' }}>{impact.label || 'The Impact'}</span>
              </div>
              <p style={{ fontFamily: FONT_H, fontSize: 'clamp(20px, 2.4vw, 28px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.28, color: '#fff', margin: '18px 0 0' }}>
                {impact.statement}
              </p>
              {impact.footnote && (
                <>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '22px 0 16px' }} />
                  <p style={{ fontFamily: FONT_B, fontStyle: 'italic', fontSize: '13px', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
                    {impact.footnote}
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {media && (
        <div style={{ marginTop: '26px' }}>
          <Media media={media} />
          {caption && <p style={{ ...ST.caption, margin: '10px 2px 0' }}>{caption}</p>}
        </div>
      )}
      <Gallery items={gallery} />
    </>
  )
}

/* ── 4. Card grid ────────────────────────────────────────────── */

/* One card's visual (screenshot or inline mock), reused by both the grid
   and the stacked-row variant below. Banner screenshots open the shared
   Lightbox on click, same as every other slide image; inline SVG mocks have
   no higher-resolution source to zoom into, so they stay static. */
function CardVisual({ c }) {
  const [open, setOpen] = useState(false)

  if (c.Mock) {
    return (
      <div style={{ background: c.mockBg || '#f0ede8', lineHeight: 0, height: '100%' }}>
        <c.Mock />
      </div>
    )
  }
  if (c.banner) {
    /* Screenshots (the default) fill the frame with `cover` — they're dense
       enough that a crop reads fine. Icon-style illustrations on a
       transparent/white background use `contain` instead, since cropping
       them tends to cut the artwork off mid-shape. */
    const fit = c.bannerFit || 'cover'
    return (
      <>
        <div
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          aria-label={c.title ? `Expand image: ${c.title}` : 'Expand image'}
          onKeyDown={(e) => { if (e.key === 'Enter') setOpen(true) }}
          style={{ position: 'relative', height: '100%', cursor: 'zoom-in', background: fit === 'contain' ? '#fff' : undefined }}
        >
          <img
            src={c.banner}
            alt=""
            style={{ display: 'block', width: '100%', height: '100%', objectFit: fit, objectPosition: 'center top', padding: fit === 'contain' ? '20px' : 0, boxSizing: 'border-box' }}
          />
          <span
            aria-hidden="true"
            className="pd-expand"
            style={{
              position: 'absolute', top: '10px', right: '10px',
              background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px', padding: '6px', lineHeight: 0,
              backdropFilter: 'blur(6px)', opacity: 0, transition: 'opacity 0.25s ease',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M1 5V1H5M9 1H13V5M13 9V13H9M5 13H1V9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        {open && <Lightbox src={c.banner} alt={c.title || ''} onClose={() => setOpen(false)} />}
      </>
    )
  }
  return null
}

/* A slim, non-sticky highlight strip — for when a slide needs a punchline
   but the images are the point, so the dark card from bullets-impact would
   compete with them for space instead of the cards taking a whole column. */
function ImpactStrip({ impact, accent }) {
  if (!impact) return null
  return (
    <div style={{ background: DARK_MESH, borderRadius: '16px', padding: '20px 26px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
      <div style={{ position: 'absolute', top: '-50px', right: '10%', width: '160px', height: '160px', borderRadius: '50%', background: `radial-gradient(circle, ${accent}26 0%, transparent 70%)`, filter: 'blur(30px)' }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent }} />
        <span style={{ ...ST.kicker, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>{impact.label || 'The Impact'}</span>
      </div>
      <p style={{ position: 'relative', zIndex: 1, fontFamily: FONT_H, fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3, color: '#fff', margin: 0, flex: '1 1 260px' }}>
        {impact.statement}
      </p>
      {impact.footnote && (
        <p style={{ position: 'relative', zIndex: 1, fontFamily: FONT_B, fontStyle: 'italic', fontSize: '12.5px', lineHeight: 1.6, color: 'rgba(255,255,255,0.55)', margin: 0, flex: '1 1 260px' }}>
          {impact.footnote}
        </p>
      )}
    </div>
  )
}

function CardGrid({ slide, accent }) {
  const { lede, cards = [], numbered = false, minWidth = 260, media, caption, gallery, galleryPosition = 'bottom', impact, imageSize = 60, stacked = false } = slide.content || {}
  const galleryEl = gallery?.length ? <Gallery items={gallery} /> : null

  const cardHeader = (c, i, tint) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
      {c.badge && (
        <span style={{ fontFamily: FONT_B, fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#c44', background: 'rgba(196,68,68,0.08)', padding: '3px 9px', borderRadius: '999px', border: '1px solid rgba(196,68,68,0.2)' }}>
          {c.badge}
        </span>
      )}
      {numbered && (
        <span style={{ fontFamily: FONT_B, fontSize: '12px', fontWeight: 700, color: tint, letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums' }}>
          {String(i + 1).padStart(2, '0')}
        </span>
      )}
      {c.title && <span style={ST.cardTitle}>{c.title}</span>}
    </div>
  )

  /* Stacked rows: full-width cards, content on the left and the visual on
     the right, one below the other. Trades density for readability — the
     visual and its copy are both at full size instead of squeezed into a
     grid cell. The slide scrolls if the stack runs long. */
  if (stacked) {
    return (
      <>
        <Lede>{lede}</Lede>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cards.map((c, i) => {
            const tint = c.accent || PALETTE[i % PALETTE.length]
            const hasVisual = c.Mock || c.banner
            return (
              <div
                key={i}
                className="pd-num-card pd-card-row"
                style={{
                  ...CARD, overflow: 'hidden', position: 'relative',
                  display: 'grid', gridTemplateColumns: hasVisual ? '1fr 1fr' : '1fr',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px', background: tint, zIndex: 1 }} />
                <div style={{ padding: '24px 26px', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {cardHeader(c, i, tint)}
                  <p style={{ fontFamily: FONT_B, fontSize: '14px', lineHeight: 1.75, color: '#555', margin: 0 }}>{c.body}</p>
                </div>
                {hasVisual && (
                  <div className="pd-card-visual" style={{ borderLeft: '1px solid rgba(0,0,0,0.06)', minHeight: '180px' }}>
                    <CardVisual c={c} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
        {media && (
          <div style={{ marginTop: '26px' }}>
            <Media media={media} />
            {caption && <p style={{ ...ST.caption, margin: '10px 2px 0' }}>{caption}</p>}
          </div>
        )}
        <Gallery items={gallery} />
        {impact && <div style={{ marginTop: '22px' }}><ImpactStrip impact={impact} accent={accent} /></div>}
      </>
    )
  }

  return (
    <>
      <Lede>{lede}</Lede>
      {galleryPosition === 'top' && <div style={{ marginBottom: '24px' }}>{galleryEl}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`, gap: '16px' }}>
        {cards.map((c, i) => {
          const tint = c.accent || PALETTE[i % PALETTE.length]
          const round = c.imageShape === 'circle'
          /* A banner (screenshot or inline mock) runs full-bleed across the top
             of the card, so the card body gets its own inset padding. */
          const banner = c.banner || c.Mock
          return (
            <div
              key={i}
              className="pd-num-card"
              style={{ ...CARD, padding: banner ? 0 : '20px 22px', overflow: 'hidden', position: 'relative', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: tint, zIndex: 1 }} />

              {banner && <div style={{ height: '170px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}><CardVisual c={c} /></div>}

              <div style={banner ? { padding: '16px 20px 18px' } : undefined}>
                {c.image && (
                  <img
                    src={c.image}
                    alt=""
                    style={{
                      width: `${imageSize}px`, height: `${imageSize}px`, objectFit: 'contain',
                      display: 'block', marginBottom: '12px',
                      ...(round ? { borderRadius: '50%', objectFit: 'cover', border: `2px solid ${tint}` } : null),
                    }}
                  />
                )}
                {cardHeader(c, i, tint)}
                <p style={{ fontFamily: FONT_B, fontSize: '13.5px', lineHeight: 1.7, color: '#555', margin: 0 }}>{c.body}</p>
              </div>
            </div>
          )
        })}
      </div>
      {media && (
        <div style={{ marginTop: '26px' }}>
          <Media media={media} />
          {caption && <p style={{ ...ST.caption, margin: '10px 2px 0' }}>{caption}</p>}
        </div>
      )}
      {galleryPosition !== 'top' && galleryEl}
      {impact && <div style={{ marginTop: '22px' }}><ImpactStrip impact={impact} accent={accent} /></div>}
    </>
  )
}

/* ── 5. Metric wall ──────────────────────────────────────────── */

function MetricWall({ slide, accent }) {
  const { lede, metrics = [], bullets = [] } = slide.content || {}
  return (
    <>
      <Lede>{lede}</Lede>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
        {metrics.map((m, i) => {
          const tint = m.accent || PALETTE[i % PALETTE.length]
          return (
            <div key={i} style={{ ...CARD, padding: '22px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: tint }} />
              <div style={{ fontFamily: FONT_H, fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#111', lineHeight: 1.05, marginBottom: '8px' }}>
                {m.value}
              </div>
              <div style={{ fontFamily: FONT_B, fontSize: '12.5px', lineHeight: 1.5, color: '#777' }}>{m.label}</div>
            </div>
          )
        })}
      </div>
      {bullets.length > 0 && (
        <div style={{ marginTop: '26px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {bullets.map(([label, text], i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ width: '3px', alignSelf: 'stretch', minHeight: '20px', background: accent, borderRadius: '2px', flexShrink: 0 }} />
              <p style={{ fontFamily: FONT_B, fontSize: '14px', lineHeight: 1.7, color: '#555', margin: 0 }}>
                <strong style={{ color: '#222', fontWeight: 700 }}>{label}:</strong> {text}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

/* ── 6. Media-first ──────────────────────────────────────────── */

function MediaSlide({ slide }) {
  const { lede, media, caption, gallery } = slide.content || {}
  return (
    <>
      <Lede>{lede}</Lede>
      <Media media={media} />
      {caption && <p style={{ ...ST.caption, margin: '10px 2px 0' }}>{caption}</p>}
      <Gallery items={gallery} />
    </>
  )
}

/* ── 7. Split: text beside media ─────────────────────────────── */

/* Text blocks with supporting media.

   Stacks by default — copy across the full width in balanced columns, then
   the media full-width beneath it. Half-width media made screenshots too
   small to read while squeezing the copy into a narrow column. Pass
   `side: true` for the rare portrait asset that genuinely reads better
   beside the text. */
function SplitMedia({ slide, accent }) {
  const { blocks = [], media, caption, gallery, side = false, reverse = false } = slide.content || {}

  const text = (
    <div
      className="pd-blocks"
      style={{
        display: 'grid',
        gridTemplateColumns: side || blocks.length < 2 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '22px 34px',
        alignItems: 'start',
        minWidth: 0,
      }}
    >
      {blocks.map((b, i) => (
        <div key={i} style={{ minWidth: 0 }}>
          {b.title && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '8px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
              <span style={{ ...ST.cardTitle }}>{b.title}</span>
            </div>
          )}
          <p style={{ fontFamily: FONT_B, fontSize: '14px', lineHeight: 1.75, color: '#555', margin: 0 }}>{b.body}</p>
        </div>
      ))}
    </div>
  )

  const mediaCol = (
    <div style={{ minWidth: 0 }}>
      <Media media={media} />
      {caption && <p style={{ ...ST.caption, margin: '10px 2px 0' }}>{caption}</p>}
    </div>
  )

  if (side) {
    return (
      <div className="pd-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
        {reverse ? <>{mediaCol}{text}</> : <>{text}{mediaCol}</>}
        <Gallery items={gallery} />
      </div>
    )
  }

  return (
    <>
      {text}
      {media && <div style={{ marginTop: '26px' }}>{mediaCol}</div>}
      <Gallery items={gallery} />
    </>
  )
}

/* ── 8. Process flow ─────────────────────────────────────────── */

function ProcessFlow({ slide, accent }) {
  const { lede, steps = [], media, caption, gallery } = slide.content || {}
  return (
    <>
      <Lede>{lede}</Lede>
      <div className="pd-flow" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: '10px' }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: '10px', flex: '1 1 190px', minWidth: 0 }}>
            <div style={{ ...CARD, padding: '16px 18px', flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: `${accent}44`, border: `1.5px solid ${accent}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_B, fontSize: '10px', fontWeight: 700, color: '#333', flexShrink: 0 }}>
                  {i + 1}
                </span>
                <span style={{ ...ST.cardTitle, fontSize: '13.5px' }}>{s.title}</span>
              </div>
              {s.body && <p style={{ fontFamily: FONT_B, fontSize: '13px', lineHeight: 1.65, color: '#666', margin: 0 }}>{s.body}</p>}
            </div>
            {i < steps.length - 1 && (
              <svg className="pd-flow-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ alignSelf: 'center', flexShrink: 0, opacity: 0.35 }}>
                <path d="M6 4L10 8L6 12" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
      {media && (
        <div style={{ marginTop: '26px' }}>
          <Media media={media} />
          {caption && <p style={{ ...ST.caption, margin: '10px 2px 0' }}>{caption}</p>}
        </div>
      )}
      <Gallery items={gallery} />
    </>
  )
}

/* ── 9. Comparison ───────────────────────────────────────────── */

function Comparison({ slide, accent }) {
  const { lede, left, right } = slide.content || {}
  const col = (side, tinted) => (
    <div
      style={{
        borderRadius: '20px', padding: '24px 26px',
        background: tinted ? `${accent}14` : '#fff',
        border: tinted ? `1px solid ${accent}66` : '1px solid rgba(0,0,0,0.05)',
        boxShadow: tinted ? 'none' : '0 2px 12px rgba(0,0,0,0.05)',
        minWidth: 0,
      }}
    >
      <div style={{ ...ST.kicker, color: tinted ? '#666' : '#999', marginBottom: '12px' }}>{side.label}</div>
      {side.title && <div style={{ fontFamily: FONT_H, fontSize: '19px', fontWeight: 700, letterSpacing: '-0.02em', color: '#111', marginBottom: '14px', lineHeight: 1.25 }}>{side.title}</div>}
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {(side.items || []).map((it, i) => (
          <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: tinted ? accent : '#ccc', marginTop: '8px', flexShrink: 0 }} />
            <span style={{ fontFamily: FONT_B, fontSize: '13.5px', lineHeight: 1.7, color: '#555' }}>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <>
      <Lede>{lede}</Lede>
      <div className="pd-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
        {col(left, false)}
        {col(right, true)}
      </div>
    </>
  )
}

/* ── 10. Quote ───────────────────────────────────────────────── */

function QuoteSlide({ slide, accent }) {
  const { quote, attribution, note } = slide.content || {}
  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', maxWidth: '820px', padding: '10px 0' }}>
      <span style={{ width: '3px', alignSelf: 'stretch', background: accent, borderRadius: '2px', flexShrink: 0 }} />
      <div>
        <p style={{ fontFamily: FONT_H, fontStyle: 'italic', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 500, lineHeight: 1.4, letterSpacing: '-0.02em', color: '#333', margin: 0 }}>
          “{quote}”
        </p>
        {attribution && <p style={{ fontFamily: FONT_B, fontSize: '12.5px', fontWeight: 600, color: '#666', margin: '20px 0 0', letterSpacing: '0.02em' }}>— {attribution}</p>}
        {note && <p style={{ ...ST.body, margin: '18px 0 0', maxWidth: '620px' }}>{note}</p>}
      </div>
    </div>
  )
}

/* ── 11. Statement / list ────────────────────────────────────── */

function Statement({ slide }) {
  const { body, paragraphs = [], media, caption, gallery } = slide.content || {}
  const all = body ? [body, ...paragraphs] : paragraphs
  return (
    <>
      {all.map((p, i) => (
        <p key={i} style={{ fontFamily: FONT_B, fontSize: '17px', lineHeight: 1.8, color: '#555', maxWidth: '760px', margin: '0 0 18px' }}>
          {p}
        </p>
      ))}
      {media && (
        <div style={{ marginTop: '18px' }}>
          <Media media={media} />
          {caption && <p style={{ ...ST.caption, margin: '10px 2px 0' }}>{caption}</p>}
        </div>
      )}
      <Gallery items={gallery} />
    </>
  )
}

function ListSlide({ slide, accent }) {
  const { lede, items = [] } = slide.content || {}
  return (
    <>
      <Lede>{lede}</Lede>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((it, i) => {
          const text = typeof it === 'string' ? it : it.body
          const title = typeof it === 'string' ? null : it.title
          return (
            <div key={i} style={{ ...CARD, padding: '15px 20px', display: 'flex', gap: '13px', alignItems: 'flex-start' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: accent, marginTop: '7px', flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                {title && <div style={{ ...ST.cardTitle, marginBottom: '5px' }}>{title}</div>}
                <p style={{ fontFamily: FONT_B, fontSize: '13.5px', lineHeight: 1.7, color: '#555', margin: 0 }}>{text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

/* ── Registry + dispatcher ───────────────────────────────────── */

const LAYOUTS = {
  'title': TitleSlide,
  'section-divider': SectionDivider,
  'bullets-impact': BulletsImpact,
  'card-grid': CardGrid,
  'metric-wall': MetricWall,
  'media': MediaSlide,
  'split-media': SplitMedia,
  'process-flow': ProcessFlow,
  'comparison': Comparison,
  'quote': QuoteSlide,
  'statement': Statement,
  'list': ListSlide,
}

/* Layouts that own the full slide surface — the shell hides the
   shared kicker/title frame for these. */
const FULL_BLEED = new Set(['title', 'section-divider'])

export function isFullBleed(slide) {
  return FULL_BLEED.has(slide.layout)
}

export function renderSlideBody(slide, accent, ctx) {
  if (typeof slide.render === 'function') return slide.render({ slide, accent, ctx })
  const Layout = LAYOUTS[slide.layout]
  if (!Layout) {
    return (
      <p style={{ ...ST.body, color: '#999' }}>
        Unknown layout “{slide.layout}”.
      </p>
    )
  }
  return <Layout slide={slide} accent={accent} ctx={ctx} />
}
