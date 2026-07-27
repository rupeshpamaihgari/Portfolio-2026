import { useRef, useCallback, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

/* ─────────────────────────────────────────────────────────────
   Lightbox — fullscreen overlay with zoom controls
───────────────────────────────────────────────────────────── */
export function Lightbox({ src, alt, onClose }) {
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(null)
  const clamp = (v) => Math.min(3, Math.max(0.25, Math.round(v * 100) / 100))

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === '+' || e.key === '=') setZoom(z => clamp(z + 0.25))
      if (e.key === '-') setZoom(z => clamp(z - 0.25))
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // Reset pan when zoom goes back to 1
  useEffect(() => { if (zoom <= 1) setOffset({ x: 0, y: 0 }) }, [zoom])

  const onWheel = useCallback((e) => {
    e.preventDefault()
    setZoom(z => clamp(z + (e.deltaY < 0 ? 0.1 : -0.1)))
  }, [])

  const onImgMouseDown = useCallback((e) => {
    e.stopPropagation()
    e.preventDefault()
    dragStart.current = { mx: e.clientX, my: e.clientY, ox: offset.x, oy: offset.y }
    setDragging(true)
  }, [offset])

  const onMouseMove = useCallback((e) => {
    if (!dragStart.current) return
    setOffset({
      x: dragStart.current.ox + (e.clientX - dragStart.current.mx),
      y: dragStart.current.oy + (e.clientY - dragStart.current.my),
    })
  }, [])

  const onMouseUp = useCallback(() => {
    dragStart.current = null
    setDragging(false)
  }, [])

  const zoomBtnStyle = {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#fff', fontSize: '20px', lineHeight: 1, padding: '0 4px',
    opacity: 0.85, fontFamily: "'Nunito', sans-serif", fontWeight: 300,
  }

  return createPortal(
    <div
      data-cs-lightbox="1"
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.9)',
        zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'caseStudyFadeIn 0.18s ease forwards',
        cursor: dragging ? 'grabbing' : (zoom > 1 ? 'grab' : 'default'),
      }}
      onClick={onClose}
      onWheel={onWheel}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '20px', right: '24px',
          background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '999px', padding: '8px 16px',
          color: '#fff', fontSize: '18px', cursor: 'pointer',
          fontFamily: "'Nunito', sans-serif", lineHeight: 1, zIndex: 1,
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.02em' }}>Close</span>
        <span style={{ fontSize: '18px', fontWeight: 300, lineHeight: 1 }}>×</span>
      </button>

      {/* Image */}
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={onImgMouseDown}
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          objectFit: 'contain',
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transition: dragging ? 'none' : 'transform 0.18s ease',
          transformOrigin: 'center center',
          borderRadius: '10px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          userSelect: 'none',
          cursor: dragging ? 'grabbing' : (zoom > 1 ? 'grab' : 'zoom-in'),
        }}
        draggable={false}
      />

      {/* Zoom bar */}
      <div
        style={{
          position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.12)', borderRadius: '999px',
          padding: '8px 20px', display: 'flex', gap: '12px', alignItems: 'center',
          color: '#fff', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button style={zoomBtnStyle} onClick={() => setZoom(z => clamp(z - 0.25))}>−</button>
        <button
          style={{ ...zoomBtnStyle, fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', minWidth: '42px', textAlign: 'center', opacity: 1 }}
          onClick={() => setZoom(1)}
          title="Reset zoom"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button style={zoomBtnStyle} onClick={() => setZoom(z => clamp(z + 0.25))}>+</button>
      </div>

      {/* Hint */}
      <div style={{
        position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.35)', fontSize: '11px', letterSpacing: '0.06em',
        fontFamily: "'Nunito', sans-serif", pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        SCROLL TO ZOOM · ESC TO CLOSE
      </div>
    </div>,
    document.body
  )
}

/* ─────────────────────────────────────────────────────────────
   CaseStudyImage — clickable, opens lightbox
───────────────────────────────────────────────────────────── */
export function CaseStudyImage({ src, alt, style = {} }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        className="cs-media-frame"
        onClick={() => setOpen(true)}
        style={{
          borderRadius: '18px',
          overflow: 'hidden',
          margin: '28px 0',
          background: '#f5f4f1',
          border: '1.5px solid #e8e6e0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 2px rgba(0,0,0,0.03)',
          transition: 'transform 0.35s ease, box-shadow 0.35s ease',
          cursor: 'zoom-in',
          ...style,
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.015)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          draggable={false}
        />
      </div>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  )
}

export function CaseStudyVideo({ src, style = {} }) {
  const isExternal = src.startsWith('http');
  const poster = isExternal
    ? undefined
    : `${import.meta.env.BASE_URL}videos/thumbnails/${src.split('/').pop().replace(/\.(mov|mp4|webm)$/i, '.jpg')}`
  return (
    <div
      className="cs-media-frame"
      style={{
        borderRadius: '18px',
        overflow: 'hidden',
        margin: '28px 0',
        background: '#000',
        border: '1.5px solid rgba(255,255,255,0.08)',
        aspectRatio: '16/9',
        position: 'relative',
        boxShadow: '0 6px 24px rgba(0,0,0,0.1), inset 0 1px 3px rgba(0,0,0,0.08)',
        ...style,
      }}
    >
      {isExternal ? (
        <iframe
          src={src}
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          allow="autoplay"
          allowFullScreen
        />
      ) : (
        <video
          src={src}
          poster={poster}
          preload="none"
          controls
          style={{ width: '100%', height: '100%', display: 'block', background: '#000' }}
        />
      )}
    </div>
  )
}

const FRAME_W = 800
const FRAME_H = 450
const PAN_SCALE = 0.7

/* ─────────────────────────────────────────────────────────────
   CaseStudyScrollableImage — pan/drag + expand-to-lightbox
───────────────────────────────────────────────────────────── */
export function CaseStudyScrollableImage({ src, alt, pan = false, height = FRAME_H, style = {} }) {
  const containerRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 })
  const [imgW, setImgW] = useState(null)
  const [open, setOpen] = useState(false)

  const onImageLoad = useCallback((e) => {
    if (!pan) return
    setImgW(e.currentTarget.naturalWidth * PAN_SCALE)
  }, [pan])

  useEffect(() => {
    if (pan && imgW && containerRef.current) {
      containerRef.current.scrollLeft = (imgW - FRAME_W) / 2
      containerRef.current.scrollTop = 0
    }
  }, [pan, imgW])

  const onMouseDown = useCallback((e) => {
    const el = containerRef.current
    drag.current = { active: true, startX: e.clientX, startY: e.clientY, scrollLeft: el.scrollLeft, scrollTop: el.scrollTop }
    el.style.cursor = 'grabbing'
    e.preventDefault()
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!drag.current.active) return
    const el = containerRef.current
    el.scrollLeft = drag.current.scrollLeft - (e.clientX - drag.current.startX)
    el.scrollTop  = drag.current.scrollTop  - (e.clientY - drag.current.startY)
  }, [])

  const onMouseUp = useCallback(() => {
    drag.current.active = false
    if (containerRef.current) containerRef.current.style.cursor = 'grab'
  }, [])

  return (
    <>
      <div
        className="cs-media-frame"
        style={{
          borderRadius: '18px',
          margin: '28px 0',
          border: '1.5px solid #e8e6e0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06), inset 0 1px 2px rgba(0,0,0,0.03)',
          width: '100%',
          height: `${height}px`,
          overflow: 'hidden',
          position: 'relative',
          ...style,
        }}
      >
        {/* Expand button */}
        <button
          onClick={() => setOpen(true)}
          title="View fullscreen"
          style={{
            position: 'absolute', top: '10px', right: '10px', zIndex: 10,
            background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px', padding: '6px 8px', cursor: 'pointer',
            color: '#fff', backdropFilter: 'blur(6px)', lineHeight: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 5V1H5M9 1H13V5M13 9V13H9M5 13H1V9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {pan ? (
          <div
            ref={containerRef}
            style={{ width: '100%', height: '100%', overflow: 'scroll', cursor: 'grab', userSelect: 'none' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <img
              src={src}
              alt={alt}
              draggable={false}
              onLoad={onImageLoad}
              style={{ width: imgW ? `${imgW}px` : 'auto', maxWidth: 'none', display: 'block' }}
            />
          </div>
        ) : (
          <div style={{ width: '100%', height: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
            <img
              src={src}
              alt={alt}
              style={{ height: `${height}px`, width: 'auto', maxWidth: 'none', display: 'block' }}
            />
          </div>
        )}
      </div>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  )
}
