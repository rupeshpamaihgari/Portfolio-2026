/* ─────────────────────────────────────────────────────────────
   PlayButton — enters presentation mode from a case study top bar.
   Leaf module: imported by both case study pages, imports nothing
   from the decks, so no cycle is possible.
───────────────────────────────────────────────────────────── */

export default function PlayButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn-dark cs-play-btn"
      title="Present as slides"
      aria-label="Present as slides"
      style={{
        display: 'flex', alignItems: 'center', gap: '7px',
        padding: '8px 16px', fontSize: '12.5px', fontWeight: 700,
        borderRadius: '999px', letterSpacing: '-0.01em',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path d="M2.6 1.6v7.8a.6.6 0 0 0 .92.5l6.2-3.9a.6.6 0 0 0 0-1L3.52 1.1a.6.6 0 0 0-.92.5Z" fill="currentColor" />
      </svg>
      <span className="cs-play-label">Present</span>
    </button>
  )
}
