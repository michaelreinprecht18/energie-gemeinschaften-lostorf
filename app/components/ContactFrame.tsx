'use client'
import { useEffect, useRef, useState } from 'react'

const FORM_URL = 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=K_6LNg30xkGxFqQfHb2r71QR5Ukfo8pCvLTwcSK-ux5UNjI0OFdGR1NDQUlMS0IwMU1CQklROFhHMS4u'

// Das Microsoft-Forms-iframe zieht beim Laden den Fokus und scrollt die Seite zu sich.
// Mit loading="lazy" passiert das schon weit oberhalb (z.B. beim Lesen der FAQ).
// Darum wird es erst geladen, wenn der Formular-Bereich tatsächlich sichtbar ist.
export default function ContactFrame() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        setVisible(true)
        io.disconnect()
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        width: '100%', maxWidth: 640, height: 900, margin: '0 auto',
        border: '1px solid #D9CEB5', borderRadius: 16, overflow: 'hidden', background: '#FFFFFF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {visible ? (
        <iframe
          src={FORM_URL}
          style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
          title="Kontaktformular"
        />
      ) : (
        <span style={{ fontFamily: 'var(--font-nunito)', fontSize: 14, color: '#5C5248' }}>Formular wird geladen …</span>
      )}
    </div>
  )
}
