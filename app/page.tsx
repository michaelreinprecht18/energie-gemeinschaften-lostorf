import { Sun, Users, Zap, MapPin, Leaf, ArrowRight, Check, ChevronDown } from 'lucide-react'
import Rechner from './components/Rechner'
import StatsBand from './components/StatsBand'
import ContactForm from './components/ContactForm'
import ScrollAnimator from './components/ScrollAnimator'
import MobileMenu from './components/MobileMenu'

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
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: '#9A7B2E',
    fontFamily: 'var(--font-nunito)',
    marginBottom: 16,
  },
  h2: {
    fontFamily: 'var(--font-baskerville)',
    fontWeight: 500,
    fontSize: 'clamp(28px, 4vw, 42px)',
    color: '#1A1510',
    lineHeight: 1.15,
    marginBottom: 16,
  },
  lead: {
    fontFamily: 'var(--font-nunito)',
    fontSize: 18,
    fontWeight: 300,
    color: '#5C5248',
    lineHeight: 1.75,
    maxWidth: 640,
  },
  card: {
    background: '#FFFFFF',
    border: '1px solid #D9CEB5',
    borderRadius: 14,
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
      <ScrollAnimator />

      {/* ─── Navigation ─── */}
      <nav className="nav-glass" style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: '1px solid rgba(217, 206, 181, 0.6)',
      }}>
        <div style={{ ...S.container, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 700, color: '#1A1510', fontSize: 15, lineHeight: 1.3, whiteSpace: 'nowrap' }}>
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
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32, color: '#9A7B2E',
            animation: 'fadeSlideUp 0.7s ease 0.1s both',
          }}>
            <Sun size={18} />
            <span style={{ fontFamily: 'var(--font-nunito)', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Solarstrom lokal erzeugt. Gemeinsam genutzt.
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-baskerville)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 6vw, 68px)',
            color: '#1A1510',
            lineHeight: 1.1,
            marginBottom: 24,
            animation: 'fadeSlideUp 0.7s ease 0.25s both',
          }}>
            Energiegemeinschaften<br />Lostorf
          </h1>

          <p style={{
            fontFamily: 'var(--font-nunito)',
            fontSize: 20,
            fontWeight: 500,
            color: '#1A1510',
            lineHeight: 1.7,
            maxWidth: 580,
            margin: '0 auto 40px',
            animation: 'fadeSlideUp 0.7s ease 0.4s both',
          }}>
            Lokal produzierter Solarstrom, der nicht selbst verbraucht wird, soll in Lostorf bleiben — und der Gemeinde zugutekommen.
            Wo immer möglich als vZEV, ansonsten als LEG. Lostorf hat das Potenzial für 22 Quartier-LEG.
            Nutzen wir diesen wertvollen Strom gemeinsam.
          </p>

          <div style={{
            display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
            animation: 'fadeSlideUp 0.7s ease 0.55s both',
          }}>
            <a href="#leg" className="btn-primary" style={{
              background: '#9DD295', color: '#1A1510',
              fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: 15,
              padding: '14px 32px', borderRadius: 8,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              Was ist eine LEG? <ArrowRight size={16} />
            </a>
            <a href="#rechner" className="btn-secondary" style={{
              background: 'transparent', color: '#1A1510',
              border: '1.5px solid #D9CEB5',
              fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: 15,
              padding: '14px 32px', borderRadius: 8,
            }}>
              Zum Rechner
            </a>
          </div>
        </div>

        <a href="#leg" style={{
          position: 'absolute', bottom: 32, left: '50%',
          color: '#9A7B2E', animation: 'bounce 2s infinite',
          opacity: 0.7,
        }}>
          <ChevronDown size={28} />
        </a>
      </section>

      <hr style={S.divider} />

      {/* ─── LEG ─── */}
      <section id="leg" style={{ ...S.sectionPad, background: '#FFFFFF' }}>
        <div style={S.container}>

          {/* Intro: Text + Bild */}
          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', marginBottom: 64 }}>
            <div className="scroll-fade">
              <SectionLabel>Lokale Elektrizitätsgemeinschaft</SectionLabel>
              <h2 style={S.h2}>Was ist eine LEG?</h2>
              <p style={{ ...S.lead, marginBottom: 20 }}>
                Eine <strong>Lokale Elektrizitätsgemeinschaft (LEG)</strong> schafft einen lokalen Strommarktplatz: Wer eine Solaranlage betreibt, kann den überschüssigen Strom direkt an Nachbarinnen und Nachbarn im selben Quartier oder in der ganzen Gemeinde verkaufen.
              </p>
              <p style={{ ...S.lead, fontSize: 16, marginBottom: 20 }}>
                Sind alle Teilnehmenden an derselben Trafostation angeschlossen, lassen sich die Netzentgelte um bis zu <strong>40 % reduzieren</strong> — ein erheblicher Vorteil für alle Beteiligten.
              </p>
              <p style={{ ...S.lead, fontSize: 16, marginBottom: 0, fontWeight: 600, color: '#1A3317' }}>
                Lostorf hat das Potenzial für <strong>22 lokale Elektrizitätsgemeinschaften</strong>.
              </p>
            </div>
            <div className="scroll-fade scroll-fade-d1">
              <img
                src="/images/leg-schema-bkw.png"
                alt="Schema einer Lokalen Elektrizitätsgemeinschaft (LEG)"
                style={{ width: '100%', borderRadius: 16, display: 'block' }}
              />
              <p style={{ marginTop: 8, fontSize: 11, color: '#9A9089', fontFamily: 'var(--font-nunito)' }}>
                Grafik: <a href="https://www.bkw.ch" target="_blank" rel="noopener noreferrer" style={{ color: '#9A7B2E' }}>bkw.ch</a>
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 56 }}>
            {[
              { icon: <Sun size={22} color="#9A7B2E" />, title: 'Lokalstrom direkt handeln', text: 'Produzenten verkaufen ihren Überschussstrom direkt an Verbraucher im selben Netzgebiet.', delay: 'scroll-fade scroll-fade-d1' },
              { icon: <Users size={22} color="#9A7B2E" />, title: 'Beide Seiten profitieren', text: 'Produzenten erzielen mehr als den üblichen Einspeisevergütungssatz. Konsumenten zahlen weniger als den Netzstrompreis.', delay: 'scroll-fade scroll-fade-d2' },
              { icon: <Zap size={22} color="#9A7B2E" />, title: 'Reduzierte Netzkosten', text: 'Lokal gehandelter Strom durchläuft nur das Niederspannungsnetz. Der Verteilnetzbetreiber verrechnet deshalb reduzierte Netznutzungskosten.', delay: 'scroll-fade scroll-fade-d3' },
              { icon: <Leaf size={22} color="#9A7B2E" />, title: 'Reduziert den Netzausbau', text: 'Lokal erzeugter Solarstrom wird direkt vor Ort im Quartier verbraucht und reduziert damit den Bedarf an kostspieligem Netzausbau.', delay: 'scroll-fade scroll-fade-d4' },
            ].map(c => (
              <div key={c.title} className={`hover-lift ${c.delay}`} style={S.card}>
                <div style={{ marginBottom: 14 }}>{c.icon}</div>
                <div style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 600, fontSize: 17, color: '#1A1510', marginBottom: 8 }}>{c.title}</div>
                <div style={{ fontFamily: 'var(--font-nunito)', fontSize: 14, color: '#5C5248', lineHeight: 1.65 }}>{c.text}</div>
              </div>
            ))}
          </div>

          {/* Wer kann mitmachen */}
          <div className="scroll-fade hover-lift" style={{ ...S.card, borderLeft: '3px solid #9A7B2E', marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 600, fontSize: 17, color: '#1A1510', marginBottom: 12 }}>
              Wer kann mitmachen?
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
              {[
                'Haushalte mit Solaranlage (Produzenten)',
                'Haushalte ohne Solaranlage (Konsumenten)',
                'Bestehende vZEV-Teilnehmende',
                'Gewerbebetriebe',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Check size={15} color="#9A7B2E" />
                  <span style={{ fontFamily: 'var(--font-nunito)', fontSize: 14, color: '#5C5248' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LEG Trafo-Karte */}
          <div className="scroll-fade" style={{ marginBottom: 8 }}>
            <h3 style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 600, fontSize: 22, color: '#1A1510', marginBottom: 8 }}>
              LEG Trafo-Karte Lostorf
            </h3>
            <p style={{ ...S.lead, fontSize: 15, marginBottom: 20, maxWidth: 'none' }}>
              Die 22 möglichen Trafo-Kreise in Lostorf — klick auf einen Kreis, um alle Adressen und bestehende PV-Anlagen anzuzeigen.
            </p>
          </div>
          <div className="scroll-fade scroll-fade-d1" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #D9CEB5', boxShadow: '0 4px 24px rgba(26,21,16,0.07)' }}>
            <iframe
              title="LEG Trafo-Karte Lostorf"
              src="/leg-karte.html"
              style={{ width: '100%', height: 700, border: 'none', display: 'block' }}
            />
          </div>
        </div>
      </section>

      <hr style={S.divider} />

      {/* ─── vZEV ─── */}
      <section id="vzev" style={{ ...S.sectionPad, background: '#E7F9E4' }}>
        <div style={S.container}>

          {/* Intro: Text + Vergleich */}
          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start', marginBottom: 48 }}>
            <div className="scroll-fade">
              <SectionLabel>Virtueller Zusammenschluss</SectionLabel>
              <h2 style={S.h2}>Was ist ein vZEV?</h2>
              <p style={{ ...S.lead, marginBottom: 20 }}>
                Ein <strong>virtueller Zusammenschluss zum Eigenverbrauch (vZEV)</strong> ist eine Eigenverbrauchsgemeinschaft, in der mindestens zwei Strombezüger gemeinsam mit mindestens einer Photovoltaikanlage lokal produzierten Solarstrom innerhalb der Nachbarschaft nutzen.
              </p>
              <p style={{ ...S.lead, fontSize: 16, marginBottom: 20 }}>
                Voraussetzung ist, dass alle Teilnehmenden am gleichen Netzanschlusspunkt angeschlossen sind. Der vZEV erhöht die Wirtschaftlichkeit von PV-Anlagen, senkt die Stromkosten der Beteiligten und ermöglicht eine effizientere Nutzung des produzierten Solarstroms.
              </p>
              <a
                href="https://www.primeo-energie.ch/geschaeftskunden/photovoltaik/energiegemeinschaften/vzev.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#9DD295', color: '#1A1510',
                  fontFamily: 'var(--font-nunito)', fontWeight: 600, fontSize: 14,
                  padding: '12px 24px', borderRadius: 8, marginTop: 8,
                }}
              >
                Prüfen ob vZEV bei dir möglich ist <ArrowRight size={15} />
              </a>
            </div>

            <div className="scroll-fade scroll-fade-d1">
              <img
                src="/images/vzev-schema-bkw.png"
                alt="Schema eines virtuellen Zusammenschlusses zum Eigenverbrauch (vZEV)"
                style={{ width: '100%', borderRadius: 16, display: 'block' }}
              />
              <p style={{ marginTop: 8, fontSize: 11, color: '#9A9089', fontFamily: 'var(--font-nunito)' }}>
                Grafik: <a href="https://www.bkw.ch" target="_blank" rel="noopener noreferrer" style={{ color: '#9A7B2E' }}>bkw.ch</a>
              </p>
            </div>
          </div>

          {/* vZEV Vorteile */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { icon: <Zap size={22} color="#9A7B2E" />, title: 'Mehr Erlös für Produzenten', desc: 'Wer eine Solaranlage betreibt, verkauft den Überschussstrom direkt an Nachbarinnen und Nachbarn — zu einem deutlich besseren Preis als bei der Rückspeisung ins Netz.', delay: 'scroll-fade scroll-fade-d1' },
              { icon: <Sun size={22} color="#9A7B2E" />, title: 'Bessere Eigenverbrauchsquote', desc: 'Der produzierte Solarstrom wird direkt vor Ort verbraucht. Das steigert die Wirtschaftlichkeit der Anlage und verkürzt die Amortisationszeit.', delay: 'scroll-fade scroll-fade-d2' },
              { icon: <Users size={22} color="#9A7B2E" />, title: 'Günstigerer Strom für Konsumenten', desc: 'Wer keine eigene Anlage hat, profitiert trotzdem: Lokal bezogener Solarstrom ist günstiger, weil Netznutzungsgebühren und Abgaben wegfallen.', delay: 'scroll-fade scroll-fade-d3' },
              { icon: <Leaf size={22} color="#9A7B2E" />, title: 'Solarstrom ohne eigene Anlage', desc: 'Auch Mieterinnen und Mieter oder Haushalte ohne Dachfläche können am vZEV teilnehmen und lokal produzierten Solarstrom beziehen.', delay: 'scroll-fade scroll-fade-d4' },
            ].map(item => (
              <div key={item.title} className={`hover-lift ${item.delay}`} style={S.card}>
                <div style={{ marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 600, fontSize: 17, color: '#1A1510', marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontFamily: 'var(--font-nunito)', fontSize: 14, color: '#5C5248', lineHeight: 1.65 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={S.divider} />

      {/* ─── Rechner ─── */}
      <section id="rechner" style={{ ...S.sectionPad, background: '#FFFFFF' }}>
        <div style={S.container}>
          {/* LEG-Rechner Cards */}
          <div className="scroll-fade" style={{ marginTop: 0 }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h3 style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 600, fontSize: 22, color: '#1A1510', marginBottom: 8 }}>
                Detaillierte LEG-Rechner
              </h3>
              <p style={{ ...S.lead, fontSize: 15, maxWidth: 'none' }}>
                Mit den beiden Rechnern findest du heraus, wie du von der LEG profitierst. Beachte: Ein reiner LEG-Bezug ist in der Praxis nicht realistisch – von Dezember bis Februar steht nicht genügend Solarstrom zur Verfügung.
              </p>
            </div>
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ background: '#F5F7F2', border: '1px solid #D9CEB5', borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
                <h4 style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 600, fontSize: 18, color: '#1A1510', marginBottom: 8 }}>Konsumenten-Rechner</h4>
                <p style={{ ...S.lead, fontSize: 14, marginBottom: 20 }}>
                  Berechnen Sie Ihre Stromkosten mit und ohne LEG – aufgeteilt nach Energie, Netz und Abgaben. Vollständiger Tarifvergleich mit Ersparnis-Ausweis.
                </p>
                <a href="/leg-rechner-konsument.html" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#9A7B2E', color: '#FFFFFF', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, padding: '10px 20px', borderRadius: 8, textDecoration: 'none' }}>
                  Zum Konsumenten-Rechner →
                </a>
              </div>
              <div style={{ background: '#F5F7F2', border: '1px solid #D9CEB5', borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>☀️</div>
                <h4 style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 600, fontSize: 18, color: '#1A1510', marginBottom: 8 }}>Produzenten-Kalkulator</h4>
                <p style={{ ...S.lead, fontSize: 14, marginBottom: 20 }}>
                  Vergleichen Sie Ihren PV-Einspeiserverdienst über die LEG mit dem Primeo-Direkttarif – quartalsweise, mit Excel-Import aus dem Primeo-Kundenportal.
                </p>
                <a href="/leg-rechner-produzent.html" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#9A7B2E', color: '#FFFFFF', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, padding: '10px 20px', borderRadius: 8, textDecoration: 'none' }}>
                  Zum Produzenten-Rechner →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={S.divider} />

      {/* ─── PV-Karte ─── */}
      <section id="pv-karte" style={{ ...S.sectionPad, background: '#E7F9E4' }}>
        <div style={S.container}>
          <div className="scroll-fade" style={{ marginBottom: 32 }}>
            <SectionLabel>Solaranlagen in Lostorf</SectionLabel>
            <h2 style={{ ...S.h2, marginBottom: 12 }}>PV-Karte Lostorf</h2>
            <p style={{ ...S.lead, maxWidth: 'none' }}>
              Alle registrierten Photovoltaikanlagen der Gemeinde Lostorf — live aus der Datenbank des Bundesamts für Energie.
            </p>
          </div>
          <div className="scroll-fade scroll-fade-d1" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #D9CEB5', boxShadow: '0 4px 24px rgba(26,21,16,0.07)' }}>
            <iframe
              id="pvkarteFrame"
              title="Solaranlagen Lostorf"
              src="/pv-karte.html"
              style={{ width: '100%', height: 1100, border: 'none', display: 'block' }}
            />
          </div>
        </div>
      </section>

      <hr style={S.divider} />

      {/* ─── Energiestadt ─── */}
      <section id="energiestadt" style={{ ...S.sectionPad, background: '#FFFFFF' }}>
        <div style={S.container}>
          <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div className="scroll-fade">
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

            <div className="scroll-fade scroll-fade-d2 hover-lift" style={{
              background: 'linear-gradient(135deg, #1A3317 0%, #2C4A28 100%)',
              borderRadius: 16,
              padding: '48px 32px',
              textAlign: 'center',
              border: 'none',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(157,210,149,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <MapPin size={32} color="#9DD295" />
              </div>
              <div style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 500, fontSize: 30, color: '#E7F9E4', marginBottom: 6 }}>
                Lostorf
              </div>
              <div style={{ fontFamily: 'var(--font-nunito)', fontSize: 13, color: '#6B9968', marginBottom: 28, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Kanton Solothurn
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { val: '21', desc: 'LEG Potenzial' },
                  { val: 'Energiestadt', desc: 'Label Träger' },
                ].map(s => (
                  <div key={s.val}>
                    <div style={{ fontFamily: 'var(--font-baskerville)', fontSize: 22, fontWeight: 500, color: '#9DD295' }}>{s.val}</div>
                    <div style={{ fontFamily: 'var(--font-nunito)', fontSize: 12, color: '#6B9968' }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={S.divider} />

      {/* ─── Kontakt ─── */}
      <section id="kontakt" style={{ ...S.sectionPad, background: '#E7F9E4' }}>
        <div style={{ ...S.container, maxWidth: 760 }}>
          <div className="scroll-fade" style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel>Kontakt</SectionLabel>
            <h2 style={S.h2}>Fragen zur LEG oder vZEV?</h2>
            <p style={{ ...S.lead, margin: '0 auto' }}>
              Du möchtest eine vZEV oder LEG gründen oder einer bestehenden Gemeinschaft beitreten?
              Wir begleiten dich auf dem Weg — melde dich, wir helfen dir gerne weiter.
            </p>
          </div>
          <div className="scroll-fade scroll-fade-d1">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
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
        </div>
      </footer>
    </>
  )
}
