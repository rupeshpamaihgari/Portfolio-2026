import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

// Worker served from /public/ — base URL handles both dev and GitHub Pages
pdfjsLib.GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.mjs`

export default function PdfThumbnail({ url, style = {} }) {
  const canvasRef = useRef(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!url) return
    let cancelled = false

    pdfjsLib.getDocument({ url }).promise
      .then(pdf => pdf.getPage(1))
      .then(page => {
        if (cancelled || !canvasRef.current) return
        const canvas = canvasRef.current
        const containerW = canvas.parentElement?.clientWidth || 400
        const viewport = page.getViewport({ scale: 1 })
        const scale = containerW / viewport.width
        const scaled = page.getViewport({ scale })
        canvas.width = scaled.width
        canvas.height = scaled.height
        return page.render({ canvasContext: canvas.getContext('2d'), viewport: scaled }).promise
      })
      .catch(err => {
        console.error('[PdfThumbnail] failed:', err)
        if (!cancelled) setError(true)
      })

    return () => { cancelled = true }
  }, [url])

  if (error) return (
    <div style={{ width: '100%', height: '100%', background: '#f5f4f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: '11px', color: '#aaa' }}>Preview unavailable</span>
    </div>
  )

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    />
  )
}
