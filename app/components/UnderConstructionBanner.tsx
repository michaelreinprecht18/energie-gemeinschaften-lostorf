'use client'
import { useEffect, useState } from 'react'

const DISMISS_KEY = 'under_construction_dismissed_v1'

export default function UnderConstructionBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(DISMISS_KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  function dismiss() {
    setVisible(false)
    try { sessionStorage.setItem(DISMISS_KEY, '1') } catch {}
  }

  return (
    <div style={{
      background: '#F5EFD9',
      borderBottom: '1px solid #D9CEB5',
      padding: '10px 44px',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-nunito)', fontSize: 13, color: '#7E6424', lineHeight: 1.5 }}>
          🚧 Diese Website befindet sich im Aufbau &ndash; Inhalte und Funktionen werden laufend ergänzt.
        </span>
      </div>
      <button onClick={dismiss} aria-label="Hinweis schliessen" style={{
        position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
        background: 'none', border: 'none', cursor: 'pointer', color: '#9A7B2E', fontSize: 18, lineHeight: 1, padding: 4,
      }}>×</button>
    </div>
  )
}
