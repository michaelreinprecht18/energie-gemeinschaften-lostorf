'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV = [
  { href: '/#strategie', label: 'Strategie' },
  { href: '/#leg', label: 'LEG' },
  { href: '/#vzev', label: 'vZEV' },
  { href: '/#rechner', label: 'Rechner' },
  { href: '/#pv-karte', label: 'PV-Karte' },
  { href: '/#energiestadt', label: 'Energiestadt' },
  { href: '/#kontakt', label: 'Kontakt' },
  { href: '/blog', label: 'Blog' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mobile-menu-btn">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Menü öffnen"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          color: '#1A1510',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div style={{
          position: 'fixed',
          top: 64,
          left: 0,
          right: 0,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid #D9CEB5',
          padding: '8px 0 16px',
          zIndex: 49,
          display: 'flex',
          flexDirection: 'column',
        }}>
          {NAV.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-nunito), system-ui, sans-serif',
                fontSize: 16,
                color: '#1A1510',
                padding: '12px 24px',
                borderBottom: '1px solid #F0EBE0',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
