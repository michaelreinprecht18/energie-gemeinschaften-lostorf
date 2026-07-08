import MobileMenu from './MobileMenu'

const NAV = [
  { href: '/#leg', label: 'LEG' },
  { href: '/#vzev', label: 'vZEV' },
  { href: '/#rechner', label: 'Rechner' },
  { href: '/#pv-karte', label: 'PV-Karte' },
  { href: '/#energiestadt', label: 'Energiestadt' },
  { href: '/#kontakt', label: 'Kontakt' },
  { href: '/blog', label: 'Blog' },
]

const container: React.CSSProperties = { maxWidth: 1100, margin: '0 auto', padding: '0 24px' }

export default function SiteNav() {
  return (
    <nav className="nav-glass" style={{
      position: 'sticky', top: 0, zIndex: 50,
      borderBottom: '1px solid rgba(217, 206, 181, 0.6)',
    }}>
      <div style={{ ...container, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 700, color: '#1A1510', fontSize: 15, lineHeight: 1.3, whiteSpace: 'nowrap' }}>
          Energiegemeinschaften <span style={{ color: '#9A7B2E' }}>Lostorf</span>
        </a>
        <div className="nav-links" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {NAV.map(l => (
            <a key={l.href} href={l.href} className="nav-link" style={{ fontFamily: 'var(--font-nunito)', fontSize: 14, color: '#5C5248' }}>
              {l.label}
            </a>
          ))}
        </div>
        <MobileMenu />
      </div>
    </nav>
  )
}
