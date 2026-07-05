import { Sun, Users, Zap, MapPin, Leaf, Mail, Phone, ArrowRight, Check, ChevronDown } from 'lucide-react'
import Rechner from './components/Rechner'

const NAV = [
  { href: '#leg', label: 'LEG' },
  { href: '#vzev', label: 'vZEV' },
  { href: '#rechner', label: 'Rechner' },
  { href: '#pv-karte', label: 'PV-Karte' },
  { href: '#energiestadt', label: 'Energiestadt' },
  { href: '#kontakt', label: 'Kontakt' },
  { href: '/blog', label: 'Blog' },
]

const S = {
  container: { maxWidth: 1100, margin: '0 auto', padding: '0 24px' } as React.CSSProperties,
  sectionPad: { paddingTop: 96, paddingBottom: 96 } as React.CSSProperties,
  label: {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: '#9A7B2E',
    fontFamily: 'var(--font-nunito)',
    marginBottom: 16,
  },
  h2: {
    fontFamily: 'var(--font-baskerville)',
    fontWeight: 500,
    fontSize: 'clamp(28px, 4vw, 40px)',
    color: '#1A1510',
    lineHeight: 1.2,
    marginBottom: 16,
  },
  lead: {
    fontFamily: 'var(--font-nunito)',
    fontSize: 18,
    fontWeight: 300,
    color: '#5C5248',
    lineHeight: 1.7,
    maxWidth: 640,
  },
  card: {
    background: '#FFFFFF',
    border: '1px solid #D9CEB5',
    borderRadius: 12,
    padding: '28px 24px',
  } as React.CSSProperties,
  divider: { borderTop: '1px solid #D9CEB5', margin: '0' } as React.CSSProperties,
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span style={S.label}>{children}</span>
}

export default function Page() {
  return (
    <>
      {/* ─── Navigation ─── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#FFFFFF',
        borderBottom: '1px solid #D9CEB5',
      }}>
        <div style={{ ...S.container, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 700, color: '#1A1510', fontSize: 15, lineHeight: 1.3, whiteSpace: 'nowrap' }}>
            Energiegemeinschaften <span style={{ color: '#9A7B2E' }}>Lostorf</span>
          </a>
          <div className="nav-links" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {NAV.map(l => (
              <a key={l.href} href={l.href} style={{ fontFamily: 'var(--font-nunito)', fontSize: 14, color: '#5C5248' }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section id="start" style={{
        minHeight: 'calc(100vh - 340px)',
        backgroundImage: 'linear-gradient(rgba(231,249,228,0.50), rgba(231,249,228,0.65)), url(/images/iStock_solarpannels.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
        textAlign: 'center',
        padding: '24px 24px 80px',
        position: 'relative',
      }}>
        <div style={{ maxWidth: 760 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32, color: '#9A7B2E' }}>
            <Sun size={18} />
            <span style={{ fontFamily: 'var(--font-nunito)', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Lokal. Sauber. Gemeinsam.
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-baskerville)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 6vw, 68px)',
            color: '#1A1510',
            lineHeight: 1.1,
            marginBottom: 24,
          }}>
            Energiegemeinschaften<br />Lostorf
          </h1>

          <p style={{
            fontFamily: 'var(--font-nunito)',
            fontSize: 20,
            fontWeight: 500,
            color: '#1A1510',
            lineHeight: 1.7,
            marginBottom: 40,
            maxWidth: 580,
            margin: '0 auto 40px',
          }}>
            Lokal produzierter Solarstrom, der nicht selbst verbraucht wird, soll in Lostorf bleiben — und der Gemeinde zugutekommen.
            Wo immer möglich als vZEV, ansonsten als LEG. Lostorf hat das Potenzial für 21 Quartier-LEG.
            Nutzen wir diesen wertvollen Strom gemeinsam.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#leg" style={{
              background: '#9DD295', color: '#1A1510',
              fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: 15,
              padding: '14px 32px', borderRadius: 8,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              Was ist eine LEG? <ArrowRight size={16} />
            </a>
            <a href="#rechner" style={{
              background: 'transparent', color: '#1A1510',
              border: '1px solid #D9CEB5',
              fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: 15,
              padding: '14px 32px', borderRadius: 8,
            }}>
              Zum Rechner
            </a>
          </div>
        </div>

        <a href="#leg" style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          color: '#D9CEB5', animation: 'bounce 2s infinite',
        }}>
          <ChevronDown size={28} />
        </a>
      </section>

      <hr style={S.divider} />

      {/* ─── LEG ─── */}
      <section id="leg" style={{ ...S.sectionPad, background: '#FFFFFF' }}>
        <div style={S.container}>
          <SectionLabel>Lokale Elektrizitätsgemeinschaft</SectionLabel>
          <h2 style={S.h2}>Was ist eine LEG?</h2>
          <p style={{ ...S.lead, marginBottom: 56 }}>
            Seit der Revision des Schweizer Energiegesetzes ermöglicht die <strong>Lokale Elektrizitätsgemeinschaft (LEG)</strong> bis
            zu 100 Haushalte und Betriebe innerhalb eines lokalen Netzgebiets, gemeinsam lokal produzierten
            Solarstrom zu nutzen und abzurechnen.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 56 }}>
            {[
              { icon: <Sun size={22} color="#9A7B2E" />, title: 'Lokal produziert', text: 'Strom wird in der Gemeinschaft produziert und verbraucht – kurze Wege, kein langer Transport.' },
              { icon: <Users size={22} color="#9A7B2E" />, title: 'Gemeinsam profitieren', text: 'Produzenten erhalten bessere Vergütung, Konsumenten zahlen weniger als den üblichen Netzpreis.' },
              { icon: <Zap size={22} color="#9A7B2E" />, title: 'Netzgebühren sparen', text: 'Lokal gehandelter Strom belastet das übergeordnete Netz weniger – das reduziert die Netzkosten.' },
              { icon: <Leaf size={22} color="#9A7B2E" />, title: 'CO₂ einsparen', text: 'Jede selbst verbrauchte Kilowattstunde Solarstrom verdrängt fossile Energie aus dem Netz.' },
            ].map(c => (
              <div key={c.title} style={S.card}>
                <div style={{ marginBottom: 14 }}>{c.icon}</div>
                <div style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 700, fontSize: 17, color: '#1A1510', marginBottom: 8 }}>{c.title}</div>
                <div style={{ fontFamily: 'var(--font-nunito)', fontSize: 14, color: '#5C5248', lineHeight: 1.6 }}>{c.text}</div>
              </div>
            ))}
          </div>

          <div style={{ ...S.card, borderLeft: '3px solid #9A7B2E' }}>
            <div style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 700, fontSize: 17, color: '#1A1510', marginBottom: 12 }}>
              Wer kann mitmachen?
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
              {[
                'Haushalte mit eigenem Solarstrom',
                'Mieterinnen und Mieter',
                'Gewerbebetriebe im Netzgebiet',
                'Gemeinden und öffentliche Gebäude',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Check size={15} color="#9A7B2E" />
                  <span style={{ fontFamily: 'var(--font-nunito)', fontSize: 14, color: '#5C5248' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr style={S.divider} />

      {/* ─── vZEV ─── */}
      <section id="vzev" style={{ ...S.sectionPad, background: '#E7F9E4' }}>
        <div style={S.container}>
          <SectionLabel>Virtueller Zusammenschluss</SectionLabel>
          <h2 style={S.h2}>Was ist ein vZEV?</h2>
          <p style={{ ...S.lead, marginBottom: 48 }}>
            Der <strong>virtuelle Zusammenschluss zum Eigenverbrauch (vZEV)</strong> ist das bewährte Vorgängermodell
            zur LEG. Er erlaubt Gebäudeeigentümern mit Photovoltaikanlage, den produzierten Strom direkt
            mit Mietparteien oder Nachbargebäuden im selben Netzgebiet zu teilen.
          </p>

          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              {
                title: 'vZEV',
                badge: 'Bewährt',
                points: [
                  'Bestehendes Modell, seit Jahren in Betrieb',
                  'Ideal für Mehrfamilienhäuser mit PV',
                  'Direkte Abrechnung über den Netzbetreiber',
                  'Einfache Struktur, klare Verhältnisse',
                ],
              },
              {
                title: 'LEG',
                badge: 'Neu',
                points: [
                  'Bis 100 Teilnehmende im lokalen Netz',
                  'Gebäudeübergreifend & gemeindebreit',
                  'Flexiblere Tarifgestaltung möglich',
                  'Stärkt das lokale Energiesystem',
                ],
                highlight: true,
              },
            ].map(col => (
              <div key={col.title} style={{
                ...S.card,
                border: col.highlight ? '1px solid #9A7B2E' : '1px solid #D9CEB5',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <span style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 700, fontSize: 20, color: '#1A1510' }}>{col.title}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 20,
                    background: col.highlight ? '#9A7B2E' : '#E7F9E4',
                    color: col.highlight ? '#FFFFFF' : '#5C5248',
                    fontFamily: 'var(--font-nunito)',
                  }}>{col.badge}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.points.map(p => (
                    <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check size={14} color="#9A7B2E" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-nunito)', fontSize: 14, color: '#5C5248', lineHeight: 1.5 }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={S.divider} />

      {/* ─── Rechner ─── */}
      <section id="rechner" style={{ ...S.sectionPad, background: '#FFFFFF' }}>
        <div style={S.container}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel>Sparrechner</SectionLabel>
            <h2 style={{ ...S.h2, marginBottom: 12 }}>Was bringt mir die LEG?</h2>
            <p style={{ ...S.lead, margin: '0 auto' }}>
              Verschiebe die Regler und sieh, wie viel lokal erzeugter Solarstrom du nutzen könntest.
            </p>
          </div>
          <Rechner />
        </div>
      </section>

      <hr style={S.divider} />

      {/* ─── PV-Karte ─── */}
      <section id="pv-karte" style={{ ...S.sectionPad, background: '#E7F9E4' }}>
        <div style={S.container}>
          <SectionLabel>Solaranlagen in Lostorf</SectionLabel>
          <h2 style={{ ...S.h2, marginBottom: 12 }}>PV-Karte Lostorf</h2>
          <p style={{ ...S.lead, marginBottom: 40 }}>
            Übersicht der bestehenden Photovoltaikanlagen in der Gemeinde Lostorf.
            Die Karte zeigt den aktuellen Ausbauzustand der lokalen Solarinfrastruktur.
          </p>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #D9CEB5', height: 420 }}>
            <iframe
              title="Solaranlagen Lostorf"
              src="https://www.openstreetmap.org/export/embed.html?bbox=7.930%2C47.375%2C7.990%2C47.408&layer=mapnik"
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              loading="lazy"
            />
          </div>
          <p style={{ marginTop: 10, fontSize: 12, color: '#D9CEB5', fontFamily: 'var(--font-nunito)' }}>
            Kartendaten © <a href="https://www.openstreetmap.org/copyright" style={{ color: '#9A7B2E' }}>OpenStreetMap</a>-Mitwirkende
          </p>
        </div>
      </section>

      <hr style={S.divider} />

      {/* ─── Energiestadt ─── */}
      <section id="energiestadt" style={{ ...S.sectionPad, background: '#FFFFFF' }}>
        <div style={S.container}>
          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <SectionLabel>Lostorf</SectionLabel>
              <h2 style={S.h2}>Energiestadt Lostorf</h2>
              <p style={{ ...S.lead, marginBottom: 32 }}>
                Lostorf engagiert sich aktiv für eine nachhaltige Energiezukunft.
                Das Energiestadt-Label zeichnet Gemeinden aus, die in den Bereichen
                Raumplanung, Gebäude, Versorgung, Mobilität und interne Organisation
                vorbildliche Massnahmen umsetzen.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Förderung erneuerbarer Energien',
                  'Energieeffiziente Gebäude und Infrastruktur',
                  'Lokale Energiegemeinschaften als Vorzeigemodell',
                  'Langfristige Klimaschutzziele',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Leaf size={15} color="#9A7B2E" />
                    <span style={{ fontFamily: 'var(--font-nunito)', fontSize: 15, color: '#5C5248' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ ...S.card, background: '#E7F9E4', textAlign: 'center', padding: '48px 32px' }}>
              <MapPin size={40} color="#9A7B2E" style={{ margin: '0 auto 16px' }} />
              <div style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 700, fontSize: 28, color: '#1A1510', marginBottom: 8 }}>
                Lostorf
              </div>
              <div style={{ fontFamily: 'var(--font-nunito)', fontSize: 14, color: '#5C5248', lineHeight: 1.6 }}>
                Kanton Solothurn<br />
                Gemeinde mit Weitblick
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={S.divider} />

      {/* ─── Kontakt ─── */}
      <section id="kontakt" style={{ ...S.sectionPad, background: '#E7F9E4' }}>
        <div style={{ ...S.container, textAlign: 'center', maxWidth: 680 }}>
          <SectionLabel>Kontakt</SectionLabel>
          <h2 style={S.h2}>Fragen zur LEG oder vZEV?</h2>
          <p style={{ ...S.lead, margin: '0 auto 48px' }}>
            Ob du eine Solaranlage hast oder einfach günstigeren lokalen Strom beziehen möchtest —
            melde dich, wir beantworten gerne deine Fragen.
          </p>

          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 520, margin: '0 auto' }}>
            <a href="mailto:info@energiegemeinschaft-lostorf.ch" style={{
              ...S.card,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
              padding: '32px 20px',
            }}>
              <Mail size={24} color="#9A7B2E" />
              <span style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 700, fontSize: 16, color: '#1A1510' }}>E-Mail</span>
              <span style={{ fontFamily: 'var(--font-nunito)', fontSize: 13, color: '#5C5248', textAlign: 'center' }}>
                info@energiegemeinschaft-lostorf.ch
              </span>
            </a>
            <a href="tel:+41000000000" style={{
              ...S.card,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
              padding: '32px 20px',
            }}>
              <Phone size={24} color="#9A7B2E" />
              <span style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 700, fontSize: 16, color: '#1A1510' }}>Telefon</span>
              <span style={{ fontFamily: 'var(--font-nunito)', fontSize: 13, color: '#5C5248', textAlign: 'center' }}>
                Kontaktnummer folgt
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{ background: '#2C4A28', color: '#B8D9B4', padding: '40px 24px', textAlign: 'center' }}>
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
        </div>
      </footer>
    </>
  )
}
