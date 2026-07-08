export default function SiteFooter() {
  return (
    <footer style={{ background: '#1A3317', color: '#B8D9B4', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 700, fontSize: 15, color: '#E7F9E4' }}>
          Energiegemeinschaften Lostorf
        </span>
        <span style={{ fontFamily: 'var(--font-nunito)', fontSize: 13, lineHeight: 1.7 }}>
          <strong style={{ color: '#E7F9E4', fontWeight: 600 }}>Impressum:</strong>{' '}
          Michael Reinprecht, Holdenackerstrasse 3, 4565 Lostorf
        </span>
        <span style={{ fontFamily: 'var(--font-nunito)', fontSize: 13 }}>
          Diese Webseite wurde mit{' '}
          <a href="https://claude.ai/code" style={{ color: '#9DD295' }}>KI Claude Code</a>{' '}
          erstellt. Zuletzt aktualisiert am {new Date().toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })}
        </span>
        <span style={{ fontFamily: 'var(--font-nunito)', fontSize: 13 }}>
          Für anonyme Besucherstatistiken (Anzahl Besuche, Herkunft) nutzen wir das quelloffene, datenschutzfreundliche Tool{' '}
          <a href="https://www.goatcounter.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#9DD295' }}>GoatCounter</a>{' '}
          — ohne Cookies und ohne personenbezogene Daten.
        </span>
      </div>
    </footer>
  )
}
