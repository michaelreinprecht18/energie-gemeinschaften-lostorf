'use client'
import { useState } from 'react'

export default function Rechner() {
  const [verbrauch, setVerbrauch] = useState(3500)
  const [deckung, setDeckung] = useState(35)

  const lokalerStrom = Math.round(verbrauch * deckung / 100)
  const einsparung = Math.round(lokalerStrom * 0.115)
  const co2 = Math.round(lokalerStrom * 0.128)

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <div style={{ display: 'grid', gap: 32, marginBottom: 48 }}>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontFamily: 'var(--font-nunito)', fontSize: 15, color: '#5C5248' }}>
              Jährlicher Stromverbrauch
            </label>
            <span style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 700, color: '#1A1510', fontSize: 16 }}>
              {verbrauch.toLocaleString('de-CH')} kWh
            </span>
          </div>
          <input
            type="range"
            min={500}
            max={15000}
            step={100}
            value={verbrauch}
            onChange={e => setVerbrauch(Number(e.target.value))}
            style={{ accentColor: '#9A7B2E' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: 12, color: '#D9CEB5' }}>500 kWh</span>
            <span style={{ fontSize: 12, color: '#D9CEB5' }}>15 000 kWh</span>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontFamily: 'var(--font-nunito)', fontSize: 15, color: '#5C5248' }}>
              Solaranteil aus der Gemeinschaft
            </label>
            <span style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 700, color: '#1A1510', fontSize: 16 }}>
              {deckung} %
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={80}
            step={5}
            value={deckung}
            onChange={e => setDeckung(Number(e.target.value))}
            style={{ accentColor: '#9A7B2E' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: 12, color: '#D9CEB5' }}>10 %</span>
            <span style={{ fontSize: 12, color: '#D9CEB5' }}>80 %</span>
          </div>
        </div>
      </div>

      <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Lokaler Solarstrom', value: `${lokalerStrom.toLocaleString('de-CH')} kWh`, sub: 'pro Jahr' },
          { label: 'Geschätzte Einsparung', value: `CHF ${einsparung.toLocaleString('de-CH')}`, sub: 'pro Jahr' },
          { label: 'CO₂-Einsparung', value: `${co2.toLocaleString('de-CH')} kg`, sub: 'pro Jahr' },
        ].map(card => (
          <div key={card.label} style={{
            background: '#FFFFFF',
            border: '1px solid #D9CEB5',
            borderRadius: 12,
            padding: '20px 16px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 12, color: '#5C5248', fontFamily: 'var(--font-nunito)', marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {card.label}
            </div>
            <div style={{ fontFamily: 'var(--font-baskerville)', fontWeight: 700, fontSize: 22, color: '#9A7B2E', lineHeight: 1.1 }}>
              {card.value}
            </div>
            <div style={{ fontSize: 12, color: '#D9CEB5', marginTop: 4 }}>{card.sub}</div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 20, fontSize: 13, color: '#D9CEB5', fontFamily: 'var(--font-nunito)', textAlign: 'center' }}>
        Richtwerte. Annahmen: Netzpreis 28 Rp./kWh, LEG-Tarif 16.5 Rp./kWh, CH-Strommix 128 g CO₂/kWh.
      </p>
    </div>
  )
}
