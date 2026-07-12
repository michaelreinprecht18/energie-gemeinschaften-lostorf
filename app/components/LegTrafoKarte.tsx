'use client'
import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { TRAFO_KREISE, type TrafoKreis } from '../data/trafoKreise'

const GEO_URL = 'https://api3.geo.admin.ch/rest/services/api/SearchServer'
const CACHE_GEO = 'geo_cache_v4'

function norm(s: string) {
  return (s || '').toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/[^a-z0-9]/g, '')
}
function normNr(s: string) {
  return norm((s || '').replace(/[a-zA-Z]+$/, ''))
}
function findTrafo(addr: { street: string; nr: string }): TrafoKreis | null {
  if (!addr.street) return null
  const ls = norm(addr.street)
  const rawNr = (addr.nr || '').split(/[\s+]/)[0]
  const ln = norm(rawNr), lnB = normNr(rawNr)
  for (const tk of TRAFO_KREISE) {
    if (tk.addresses.some(a => {
      if (norm(a.street) !== ls) return false
      const an = norm(a.nr), anB = normNr(a.nr)
      return an === ln || an === lnB || anB === ln || anB === lnB
    })) return tk
  }
  return null
}
function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

const totalAddresses = TRAFO_KREISE.reduce((s, tk) => s + tk.addresses.length, 0)

// Trafo-Kreise mit einer aktiven oder in Gründung befindlichen LEG — werden beim Laden direkt angezeigt
const ACTIVE_LEG_KREISE = ['01 – Schulstrasse']

// Bekannte LEG-Produzenten pro Trafo-Kreis — werden nur mit Solar-Symbol markiert, wenn der zugehörige Kreis angezeigt wird
const LEG_PRODUCERS: Record<string, { street: string; nr: string }[]> = {
  '01 – Schulstrasse': [{ street: 'Holdenackerstrasse', nr: '3' }],
}

// Anzahl PV-Produzenten und installierte Leistung (kWp) pro Trafo-Kreis — manuell nachführen,
// sobald neue Produzenten einer LEG beitreten
const TRAFO_KREIS_STATS: Record<string, { producers: number; kwp: number }> = {
  '01 – Schulstrasse': { producers: 1, kwp: 28 },
  '02 – Hangstrasse': { producers: 0, kwp: 0 },
  '03 – Alte Badstrasse': { producers: 0, kwp: 0 },
  '04 – Rebenstrasse': { producers: 0, kwp: 0 },
  '05 – Bachstrasse': { producers: 0, kwp: 0 },
  '06 – Bachstrasse': { producers: 0, kwp: 0 },
  '07 – Belchenstrasse': { producers: 0, kwp: 0 },
  '08 – Birkenstrasse': { producers: 0, kwp: 0 },
  '09 – Buerstrasse': { producers: 0, kwp: 0 },
  '10 – Bündtenmattweg': { producers: 0, kwp: 0 },
  '11 – Chilenackerstrasse': { producers: 0, kwp: 0 },
  '12 – Chilenackerstrasse': { producers: 0, kwp: 0 },
  '13 – Chälenstrasse': { producers: 0, kwp: 0 },
  '14 – Hauptstrasse': { producers: 0, kwp: 0 },
  '15 – Höhenweg': { producers: 0, kwp: 0 },
  '16 – Industriestrasse': { producers: 0, kwp: 0 },
  '17 – Juraweg': { producers: 0, kwp: 0 },
  '18 – Längackerstrasse': { producers: 0, kwp: 0 },
  '19 – Mahrenstrasse': { producers: 0, kwp: 0 },
  '20 – Duschletenstrasse': { producers: 0, kwp: 0 },
  '21 – Duschletenstrasse': { producers: 0, kwp: 0 },
  '22 – Hangstrasse': { producers: 0, kwp: 0 },
}

export default function LegTrafoKarte() {
  const mapElRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const activeMarkersRef = useRef<L.Marker[]>([])
  const geoCacheRef = useRef<Record<string, { lat: number; lon: number }>>({})

  const [street, setStreet] = useState('')
  const [nr, setNr] = useState('')
  const [searchMsg, setSearchMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [activeName, setActiveName] = useState<string | null>(null)
  const [panelInfo, setPanelInfo] = useState<{ name: string; color: string; text: string } | null>(null)

  useEffect(() => {
    if (!mapElRef.current || mapRef.current) return
    ;(async () => {
      const L = (await import('leaflet')).default
      const map = L.map(mapElRef.current!).setView([47.3848, 7.9460], 15)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO', subdomains: 'abcd', maxZoom: 19,
      }).addTo(map)
      mapRef.current = map
      try { geoCacheRef.current = JSON.parse(localStorage.getItem(CACHE_GEO) || '{}') } catch {}
      if (ACTIVE_LEG_KREISE[0]) showTrafo(ACTIVE_LEG_KREISE[0])
    })()
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  function saveGeoCache() {
    try { localStorage.setItem(CACHE_GEO, JSON.stringify(geoCacheRef.current)) } catch {}
  }

  async function geocode(streetName: string, houseNr: string): Promise<{ lat: number; lon: number } | null> {
    const k = streetName + '|' + houseNr
    if (geoCacheRef.current[k]) return geoCacheRef.current[k]
    try {
      const q = encodeURIComponent(streetName + ' ' + houseNr + ' Lostorf')
      const r = await fetch(GEO_URL + '?searchText=' + q + '&type=locations&limit=1&sr=4326')
      const d = await r.json()
      if (d.results && d.results.length) {
        const a = d.results[0].attrs
        if (a.lat && a.lon) { geoCacheRef.current[k] = { lat: a.lat, lon: a.lon }; return geoCacheRef.current[k] }
      }
    } catch {}
    return null
  }

  function houseIcon(L: typeof import('leaflet'), color: string, highlight?: boolean) {
    const size = highlight ? 24 : 15
    const shadow = highlight
      ? `box-shadow:0 0 0 5px ${color}40,0 2px 8px rgba(0,0,0,.4);`
      : 'box-shadow:0 2px 6px rgba(0,0,0,.4);'
    return L.divIcon({
      html: `<div style="width:${size}px;height:${size}px;background:${color};border:2.5px solid #fff;border-radius:50%;${shadow}"></div>`,
      className: '', iconSize: [size, size], iconAnchor: [size / 2, size / 2],
    })
  }

  function producerIcon(L: typeof import('leaflet'), color: string, highlight?: boolean) {
    const size = highlight ? 28 : 22
    const shadow = highlight
      ? `box-shadow:0 0 0 5px ${color}40,0 2px 8px rgba(0,0,0,.4);`
      : 'box-shadow:0 2px 6px rgba(0,0,0,.4);'
    return L.divIcon({
      html: `<div style="width:${size}px;height:${size}px;background:${color};border:2.5px solid #fff;border-radius:50%;${shadow}display:flex;align-items:center;justify-content:center;font-size:${Math.round(size * 0.6)}px;line-height:1">☀️</div>`,
      className: '', iconSize: [size, size], iconAnchor: [size / 2, size / 2],
    })
  }

  function clearTrafo() {
    const map = mapRef.current
    activeMarkersRef.current.forEach(m => map?.removeLayer(m))
    activeMarkersRef.current = []
    setActiveName(null)
    setPanelInfo(null)
  }

  async function showTrafo(name: string, highlight?: { street: string; nr: string }) {
    const tk = TRAFO_KREISE.find(t => t.name === name)
    const map = mapRef.current
    if (!tk || !map) return
    const L = (await import('leaflet')).default
    clearTrafo()
    map.closePopup()
    setActiveName(name)
    setPanelInfo({ name, color: tk.color, text: `${tk.addresses.length} Adressen · wird geladen...` })

    let placed = 0
    const bounds: [number, number][] = []
    let highlightMarker: L.Marker | null = null
    const hs = highlight ? norm(highlight.street) : null
    const hRawNr = highlight ? (highlight.nr || '').split(/[\s+]/)[0] : null
    const hn = highlight ? norm(hRawNr || '') : null
    const hnB = highlight ? normNr(hRawNr || '') : null

    const producers = LEG_PRODUCERS[name] || []

    for (let i = 0; i < tk.addresses.length; i += 6) {
      const batch = tk.addresses.slice(i, i + 6)
      const res = await Promise.all(batch.map(a => geocode(a.street, a.nr)))
      for (let j = 0; j < batch.length; j++) {
        const pos = res[j]
        if (!pos) continue
        const an = norm(batch[j].nr), anB = normNr(batch[j].nr)
        const isHl = !!(highlight && norm(batch[j].street) === hs && (an === hn || an === hnB || anB === hn || anB === hnB))
        const isProducer = producers.some(p => {
          const ps = norm(p.street), pn = norm(p.nr), pnB = normNr(p.nr)
          return norm(batch[j].street) === ps && (an === pn || an === pnB || anB === pn || anB === pnB)
        })
        const icon = isProducer ? producerIcon(L, tk.color, isHl) : houseIcon(L, tk.color, isHl)
        const m = L.marker([pos.lat, pos.lon], { icon, zIndexOffset: isHl ? 600 : (isProducer ? 400 : 0) }).addTo(map)
        const producerBadge = isProducer ? `<br><span style="display:inline-block;margin-top:4px;padding:1px 7px;border-radius:20px;font-size:9px;font-weight:700;background:#F5F0E8;color:#7E6424;border:1px solid #D9CEB5">☀️ LEG-Produzent</span>` : ''
        m.bindPopup(`<div style="font-weight:700;font-size:13px;color:#1A1510;margin-bottom:3px;font-family:'DM Sans',sans-serif">${batch[j].street} ${batch[j].nr}</div><span style="display:inline-block;padding:1px 7px;border-radius:20px;font-size:9px;font-weight:700;background:${tk.color}18;color:${tk.color};border:1px solid ${tk.color}60">Trafo: ${name}</span>${producerBadge}`)
        activeMarkersRef.current.push(m)
        bounds.push([pos.lat, pos.lon])
        placed++
        if (isHl) highlightMarker = m
      }
      setPanelInfo({ name, color: tk.color, text: `${tk.addresses.length} Adressen · ${placed} platziert` })
      await sleep(200)
    }
    saveGeoCache()
    setPanelInfo({ name, color: tk.color, text: `${tk.addresses.length} Adressen · ${placed} auf Karte` })
    if (highlightMarker) {
      map.setView((highlightMarker as L.Marker).getLatLng(), 17, { animate: true })
      ;(highlightMarker as L.Marker).openPopup()
    } else if (bounds.length > 1) map.fitBounds(bounds, { padding: [50, 50] })
    else if (bounds.length === 1) map.setView(bounds[0], 16)
  }

  function searchAddress() {
    const s = street.trim(), n = nr.trim()
    if (!s) { setSearchMsg({ type: 'err', text: 'Bitte Strasse eingeben.' }); return }
    const tk = findTrafo({ street: s, nr: n })
    if (tk) {
      showTrafo(tk.name, { street: s, nr: n })
      setSearchMsg({ type: 'ok', text: `✓ Gefunden: ${tk.name}` })
    } else {
      clearTrafo()
      setSearchMsg({ type: 'err', text: 'Keine Zuordnung gefunden – bitte Adresse prüfen oder wende dich an die Arbeitsgruppe Energiestadt.' })
    }
  }

  const S = {
    sbTitle: { fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' as const, color: '#9A9089', marginBottom: 8, fontFamily: 'var(--font-nunito)' },
    input: { padding: '8px 10px', border: '1px solid #D9CEB5', borderRadius: 6, fontSize: 13, color: '#1A1510', outline: 'none', fontFamily: 'var(--font-nunito)', minWidth: 0 },
  }

  return (
    <div style={{ display: 'flex', height: 640, border: '1px solid #D9CEB5', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(26,21,16,0.07)' }}>
      <div style={{ width: 270, flexShrink: 0, background: '#fff', borderRight: '1px solid #D9CEB5', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: 14, borderBottom: '1px solid #D9CEB5', flexShrink: 0 }}>
          <div style={S.sbTitle}>Adresse suchen</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            <input type="text" placeholder="Strasse" value={street} onChange={e => setStreet(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && searchAddress()}
              style={{ ...S.input, flex: 2 }} />
            <input type="text" placeholder="Nr." value={nr} onChange={e => setNr(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && searchAddress()}
              style={{ ...S.input, flex: 1 }} />
          </div>
          <button onClick={searchAddress} style={{
            width: '100%', padding: 9, border: 'none', borderRadius: 6, background: '#9A7B2E', color: '#fff',
            fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font-nunito)',
          }}>
            LEG Trafo-Kreis finden
          </button>
          {searchMsg && (
            <div style={{
              marginTop: 8, padding: '8px 10px', borderRadius: 6, fontSize: 12, lineHeight: 1.5,
              background: searchMsg.type === 'ok' ? '#E7F9E4' : '#FDECEC',
              color: searchMsg.type === 'ok' ? '#3A7A30' : '#C0392B',
              border: `1px solid ${searchMsg.type === 'ok' ? '#B8D9B4' : '#F5C6C6'}`,
            }}>
              {searchMsg.text}
            </div>
          )}
        </div>
        <div style={{ padding: '10px 14px 6px', flexShrink: 0 }}>
          <div style={S.sbTitle}>Trafo-Kreise (22)</div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 8px' }}>
          {TRAFO_KREISE.map(tk => {
            const stats = TRAFO_KREIS_STATS[tk.name] || { producers: 0, kwp: 0 }
            return (
              <div
                key={tk.name}
                onClick={() => showTrafo(tk.name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 6,
                  fontSize: 12, cursor: 'pointer', marginBottom: 2,
                  border: `1px solid ${activeName === tk.name ? tk.color : 'transparent'}`,
                  background: activeName === tk.name ? '#F5F0E8' : 'transparent',
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: tk.color, flexShrink: 0 }} />
                <div style={{
                  flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  color: activeName === tk.name ? tk.color : '#5C5248',
                  fontWeight: activeName === tk.name ? 600 : 400,
                  fontFamily: 'var(--font-nunito)',
                }}>
                  {tk.name}{ACTIVE_LEG_KREISE.includes(tk.name) ? ' ☀️' : ''}
                </div>
                {stats.producers > 0 && (
                  <div style={{ textAlign: 'right', flexShrink: 0, fontFamily: 'var(--font-nunito)' }}>
                    <span style={{ fontSize: 9, color: '#9A9089', display: 'block' }}>{stats.producers} PV</span>
                    <span style={{ fontSize: 9, color: '#9A7B2E', fontWeight: 600, display: 'block' }}>{stats.kwp} kWp</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
        <div ref={mapElRef} style={{ position: 'absolute', inset: 0 }} />
        {panelInfo && (
          <div style={{
            position: 'absolute', bottom: 14, left: 14, background: '#fff', border: '1px solid #D9CEB5',
            borderRadius: 12, boxShadow: '0 4px 20px rgba(26,21,16,.1)', padding: '11px 14px', minWidth: 200, zIndex: 800,
          }}>
            <button onClick={clearTrafo} style={{
              position: 'absolute', top: 7, right: 9, background: 'none', border: 'none', cursor: 'pointer',
              color: '#9A9089', fontSize: 17, lineHeight: 1, padding: 2,
            }}>×</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: panelInfo.color, flexShrink: 0 }} />
              <div style={{ fontWeight: 700, fontSize: 13, color: '#1A1510', fontFamily: 'var(--font-baskerville)' }}>{panelInfo.name}</div>
            </div>
            <div style={{ fontSize: 11, color: '#5C5248', fontFamily: 'var(--font-nunito)' }}>{panelInfo.text}</div>
          </div>
        )}
      </div>
    </div>
  )
}
