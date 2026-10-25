'use client'
import { useState } from 'react'
import type { ComponentType } from 'react'
import { Sun, Sunset, Moon } from 'lucide-react'

const INK = '#1A1510'
const SOFT = '#5C5248'
const GOLD = '#9A7B2E'
const GOLD_D = '#7E6424'
const GREEN = '#3A7A30'
const GREEN_D = '#2D7A27'
const BLUE = '#3B6E8F'
const HEAD = 'var(--font-baskerville), system-ui, sans-serif'
const BODY = 'var(--font-nunito), system-ui, sans-serif'

type Battery = { kwh: string; zustand: string; delta: string; fill: [number, number] }
type Producer = {
  name: string
  kwp: string
  battery?: Battery
  bezug?: { kw: string; split: string }
  erzeugung: string
  eigen: string
  abgabe: string
  abgabeLabel: string
  abgabeColor: string
}
type Consumer = { bezug: string; leg: string; legColor: string }
type Scenario = {
  id: string
  label: string
  Icon: ComponentType<{ size?: number }>
  text: string
  producers: Producer[]
  hub: { angebotLabel: string; angebotSub: string; angebot: string; verbrauchSub: string; verbrauch: string; netzLabel: string; netz: string }
  consumers: Consumer[]
  produzentenFluss: { aktiv: boolean[]; farbe: string }
  konsumentenFarbe: string
  netz: { richtung: 'ein' | 'aus'; text: string }
}

const SCENARIOS: Scenario[] = [
  {
    id: 'mittag',
    label: 'Sonniger Mittag',
    Icon: Sun,
    text: 'Die Sonne scheint stark. Die Produzenten decken zuerst ihren Eigenverbrauch und laden die Batterien. Nur der Überschuss geht in die LEG. Er deckt den Strombedarf der Konsumenten zu 100 %. Was die Konsumenten nicht brauchen, fliesst ins Netz.',
    producers: [
      { name: 'Produzent 1', kwp: '28 kWp', battery: { kwh: '16.6 kWh', zustand: 'Batterie lädt', delta: '+4.0 kW', fill: [30, 48] }, erzeugung: '14.0 kW', eigen: '1.8 kW', abgabe: '8.2 kW', abgabeLabel: 'Überschuss an LEG', abgabeColor: GOLD_D },
      { name: 'Produzent 2', kwp: '16 kWp', battery: { kwh: '15 kWh', zustand: 'Batterie lädt', delta: '+2.5 kW', fill: [40, 56] }, erzeugung: '8.0 kW', eigen: '1.2 kW', abgabe: '4.3 kW', abgabeLabel: 'Überschuss an LEG', abgabeColor: GOLD_D },
      { name: 'Produzent 3', kwp: '10 kWp', erzeugung: '5.0 kW', eigen: '0.8 kW', abgabe: '4.2 kW', abgabeLabel: 'Überschuss an LEG', abgabeColor: GOLD_D },
    ],
    hub: { angebotLabel: 'Überschuss', angebotSub: 'der 3 Produzenten', angebot: '16.7 kW', verbrauchSub: 'der 2 Konsumenten', verbrauch: '7.2 kW', netzLabel: 'Einspeisung ins Netz', netz: '9.5 kW' },
    consumers: [
      { bezug: '4.3 kW', leg: '100 %', legColor: GREEN_D },
      { bezug: '2.9 kW', leg: '100 %', legColor: GREEN_D },
    ],
    produzentenFluss: { aktiv: [true, true, true], farbe: GOLD },
    konsumentenFarbe: GREEN,
    netz: { richtung: 'aus', text: '9.5 kW ins Netz' },
  },
  {
    id: 'abend',
    label: 'Abend',
    Icon: Sunset,
    text: 'Die Sonne ist weg, die Produzenten verbrauchen jetzt mehr selbst, auch aus ihren Batterien. Was die Batterien von Produzent 1 und 2 darüber hinaus liefern, geht an die LEG. Die untersten 30 % bleiben für den Eigenverbrauch reserviert. Produzent 3 hat keinen Speicher und bezieht seinen Mehrverbrauch wie die Konsumenten anteilig aus der LEG. Was die LEG nicht deckt, kommt aus dem Netz.',
    producers: [
      { name: 'Produzent 1', kwp: '28 kWp', battery: { kwh: '16.6 kWh', zustand: 'Batterie entlädt', delta: '−4.4 kW', fill: [44, 30] }, erzeugung: '0.4 kW', eigen: '1.6 kW', abgabe: '3.2 kW', abgabeLabel: 'Batterie an LEG', abgabeColor: BLUE },
      { name: 'Produzent 2', kwp: '16 kWp', battery: { kwh: '15 kWh', zustand: 'Batterie entlädt', delta: '−3.0 kW', fill: [40, 26] }, erzeugung: '0.2 kW', eigen: '0.8 kW', abgabe: '2.4 kW', abgabeLabel: 'Batterie an LEG', abgabeColor: BLUE },
      { name: 'Produzent 3', kwp: '10 kWp', bezug: { kw: '0.3 kW', split: '70 % LEG, 30 % Netz' }, erzeugung: '0.1 kW', eigen: '0.4 kW', abgabe: '0.0 kW', abgabeLabel: 'Überschuss an LEG', abgabeColor: SOFT },
    ],
    hub: { angebotLabel: 'Angebot', angebotSub: 'Batterien der Produzenten', angebot: '5.6 kW', verbrauchSub: 'Konsumenten + Produzent 3', verbrauch: '8.0 kW', netzLabel: 'Bezug aus dem Netz', netz: '2.4 kW' },
    consumers: [
      { bezug: '4.4 kW', leg: '70 %', legColor: GREEN_D },
      { bezug: '3.3 kW', leg: '70 %', legColor: GREEN_D },
    ],
    produzentenFluss: { aktiv: [true, true, false], farbe: BLUE },
    konsumentenFarbe: GREEN,
    netz: { richtung: 'ein', text: '2.4 kW aus dem Netz' },
  },
  {
    id: 'nacht',
    label: 'Nacht',
    Icon: Moon,
    text: 'Es gibt keine Solarproduktion. Die Batterien sind auf ihre Reserve von 30 % entladen. Diese Reserve ist für die LEG gesperrt und deckt nur den Eigenverbrauch der Produzenten 1 und 2. Produzent 3 und alle Konsumenten beziehen ihren Strom aus dem Netz.',
    producers: [
      { name: 'Produzent 1', kwp: '28 kWp', battery: { kwh: '16.6 kWh', zustand: 'Reserve 30 % gesperrt', delta: '−0.6 kW', fill: [20, 20] }, erzeugung: '0.0 kW', eigen: '0.6 kW', abgabe: '0.0 kW', abgabeLabel: 'An LEG gesperrt', abgabeColor: SOFT },
      { name: 'Produzent 2', kwp: '16 kWp', battery: { kwh: '15 kWh', zustand: 'Reserve 30 % gesperrt', delta: '−0.4 kW', fill: [20, 20] }, erzeugung: '0.0 kW', eigen: '0.4 kW', abgabe: '0.0 kW', abgabeLabel: 'An LEG gesperrt', abgabeColor: SOFT },
      { name: 'Produzent 3', kwp: '10 kWp', bezug: { kw: '0.5 kW', split: '0 % LEG, 100 % Netz' }, erzeugung: '0.0 kW', eigen: '0.5 kW', abgabe: '0.0 kW', abgabeLabel: 'Abgabe an LEG', abgabeColor: SOFT },
    ],
    hub: { angebotLabel: 'Angebot', angebotSub: 'Batterien gesperrt', angebot: '0.0 kW', verbrauchSub: 'Konsumenten + Produzent 3', verbrauch: '3.6 kW', netzLabel: 'Bezug aus dem Netz', netz: '3.6 kW' },
    consumers: [
      { bezug: '1.9 kW', leg: '0 %', legColor: SOFT },
      { bezug: '1.2 kW', leg: '0 %', legColor: SOFT },
    ],
    produzentenFluss: { aktiv: [false, false, false], farbe: GOLD },
    konsumentenFarbe: SOFT,
    netz: { richtung: 'ein', text: '3.6 kW aus dem Netz' },
  },
]

function T({ x, y, size, fill, font = 'body', weight, anchor, italic, children }: {
  x: number; y: number; size: number; fill: string; font?: 'head' | 'body'; weight?: number
  anchor?: 'start' | 'middle' | 'end'; italic?: boolean; children: React.ReactNode
}) {
  return (
    <text x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor}
      style={{ fontFamily: font === 'head' ? HEAD : BODY, fontWeight: weight, fontStyle: italic ? 'italic' : undefined }}>
      {children}
    </text>
  )
}

function Dots({ path, color, dur, begin = 0 }: { path: string; color: string; dur: number; begin?: number }) {
  return (
    <g className="leg-flow">
      {[{ r: 7, b: begin, o: 1 }, { r: 5, b: begin + dur / 2, o: 0.85 }].map((d, i) => (
        <circle key={i} r={d.r} fill={color} opacity={0} filter="url(#legGlow)">
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" begin={`${d.b}s`}><mpath href={`#${path}`} /></animateMotion>
          <animate attributeName="opacity" values={`0;${d.o};${d.o};0`} dur={`${dur}s`} repeatCount="indefinite" begin={`${d.b}s`} />
        </circle>
      ))}
    </g>
  )
}

function Blink({ cx, cy, r, color, begin = 0, dur = 2 }: { cx: number; cy: number; r: number; color: string; begin?: number; dur?: number }) {
  return (
    <circle cx={cx} cy={cy} r={r} fill={color}>
      <animate attributeName="opacity" values="1;0.35;1" dur={`${dur}s`} repeatCount="indefinite" begin={`${begin}s`} />
    </circle>
  )
}

function ProducerCard({ p, y, i }: { p: Producer; y: number; i: number }) {
  const b = p.battery
  return (
    <g transform={`translate(60,${y})`}>
      <rect width={400} height={204} rx={14} fill="#FFFFFF" stroke="#D9CEB5" filter="url(#legShadow)" />
      <g clipPath="url(#legClipCard)"><rect width={4} height={204} fill={GOLD} /></g>
      <T x={24} y={42} size={22} font="head" weight={700} fill={INK}>{p.name}</T>
      <use href="#legMeter" x={258} y={12} />
      <Blink cx={376} cy={22} r={4} color={GREEN} begin={i * 0.4} />

      <use href="#legIconSolar" x={24} y={66} color={GOLD} />
      <T x={100} y={82} size={14} fill={SOFT}>PV-Anlage</T>
      <T x={100} y={106} size={20} font="head" weight={700} fill={INK}>{p.kwp}</T>
      {b ? (
        <>
          <T x={226} y={82} size={14} fill={SOFT}>{b.zustand}</T>
          <T x={226} y={106} size={20} font="head" weight={700} fill={INK}>{b.kwh}</T>
          <g transform="translate(226,112)">
            <rect x={0} y={0} width={70} height={12} rx={3} fill="none" stroke={BLUE} strokeWidth={1.6} />
            <rect x={70} y={3} width={3} height={6} rx={1} fill={BLUE} />
            <rect x={2} y={2} width={b.fill[0]} height={8} rx={2} fill={BLUE}>
              {b.fill[0] !== b.fill[1] && (
                <animate attributeName="width" values={`${b.fill[0]};${b.fill[1]};${b.fill[0]}`} dur={`${7 + i}s`} repeatCount="indefinite" />
              )}
            </rect>
            <line x1={21.8} y1={-3} x2={21.8} y2={15} stroke={BLUE} strokeWidth={1.4} strokeDasharray="2 2">
              <title>Die untersten 30 % der Batterie sind für den Eigenverbrauch reserviert und für die LEG gesperrt.</title>
            </line>
          </g>
          <T x={306} y={123} size={14} font="head" weight={700} fill={BLUE}>{b.delta}</T>
        </>
      ) : p.bezug ? (
        <>
          <T x={226} y={82} size={14} fill={SOFT}>Strombezug</T>
          <T x={226} y={106} size={20} font="head" weight={700} fill={INK}>{p.bezug.kw}</T>
          <T x={226} y={123} size={13} weight={600} fill={SOFT}>{p.bezug.split}</T>
        </>
      ) : (
        <T x={226} y={98} size={14} fill={SOFT}>Ohne Batteriespeicher</T>
      )}

      <rect x={16} y={136} width={368} height={56} rx={8} fill={GOLD} fillOpacity={0.09} stroke={GOLD} strokeOpacity={0.22} />
      <T x={30} y={154} size={12} fill={SOFT}>Erzeugung</T>
      <T x={30} y={180} size={20} font="head" weight={700} fill={INK}>{p.erzeugung}</T>
      <T x={142} y={154} size={12} fill={SOFT}>Eigenverbrauch</T>
      <T x={142} y={180} size={20} font="head" weight={700} fill={INK}>{p.eigen}</T>
      <T x={262} y={154} size={12} weight={700} fill={p.abgabeColor}>{p.abgabeLabel}</T>
      <T x={262} y={180} size={20} font="head" weight={700} fill={p.abgabeColor}>{p.abgabe}</T>
    </g>
  )
}

function ConsumerCard({ c, y, i }: { c: Consumer; y: number; i: number }) {
  return (
    <g transform={`translate(1140,${y})`}>
      <rect width={400} height={204} rx={14} fill="#FFFFFF" stroke="#D9CEB5" filter="url(#legShadow)" />
      <g clipPath="url(#legClipCard)"><rect width={4} height={204} fill={GREEN} /></g>
      <T x={24} y={42} size={22} font="head" weight={700} fill={INK}>{`Konsument ${i + 1}`}</T>
      <use href="#legMeter" x={258} y={12} />
      <Blink cx={376} cy={22} r={4} color={GREEN} begin={0.5 + i * 0.4} />

      <use href="#legIconHouse" x={24} y={66} color={GREEN} />
      <T x={100} y={82} size={14} fill={SOFT}>Haushalt</T>
      <T x={100} y={106} size={16} weight={600} fill={INK}>ohne PV-Anlage</T>

      <rect x={16} y={136} width={368} height={56} rx={8} fill={GREEN} fillOpacity={0.09} stroke={GREEN} strokeOpacity={0.22} />
      <T x={30} y={154} size={12} fill={SOFT}>Bezug jetzt</T>
      <T x={30} y={180} size={20} font="head" weight={700} fill={INK}>{c.bezug}</T>
      <T x={214} y={154} size={12} weight={700} fill={c.legColor}>LEG-Strom</T>
      <T x={214} y={180} size={20} font="head" weight={700} fill={c.legColor}>{c.leg}</T>
    </g>
  )
}

export default function LegLiveAnsicht() {
  const [id, setId] = useState('mittag')
  const sc = SCENARIOS.find(s => s.id === id) ?? SCENARIOS[0]
  const aktiv = sc.produzentenFluss.aktiv
  const verbrauchAktiv = sc.consumers.some(c => c.bezug !== '0.0 kW')
  const netzPfad = sc.netz.richtung === 'aus' ? 'legPt' : 'legPtr'
  const produzentBezug = sc.producers[2]?.bezug

  return (
    <div>
      <div role="group" aria-label="Szenario wählen" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
        {SCENARIOS.map(s => {
          const active = s.id === id
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setId(s.id)}
              aria-pressed={active}
              className={active ? 'btn-primary' : 'btn-secondary'}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                background: active ? '#9DD295' : 'transparent', color: INK,
                border: `1.5px solid ${active ? '#9DD295' : '#D9CEB5'}`,
                fontFamily: BODY, fontWeight: 600, fontSize: 15, padding: '12px 22px', borderRadius: 8,
              }}
            >
              <s.Icon size={18} /> {s.label}
            </button>
          )
        })}
      </div>

      <p aria-live="polite" style={{ fontFamily: BODY, fontSize: 15, fontWeight: 300, color: SOFT, lineHeight: 1.75, margin: '0 0 16px', maxWidth: 'none' }}>
        {sc.text}
      </p>

      <div style={{ overflowX: 'auto', border: '1px solid #D9CEB5', borderRadius: 16, background: '#E7F9E4' }}>
        <svg viewBox="0 0 1600 900" role="img" aria-labelledby="legSvgTitle legSvgDesc" style={{ display: 'block', width: '100%', minWidth: 1000, height: 'auto' }}>
          <title id="legSvgTitle">LEG Lostorf Demo 2.0 Live Ansicht</title>
          <desc id="legSvgDesc">{`Szenario ${sc.label}. ${sc.text} Beispielwerte.`}</desc>
          <style>{'@media (prefers-reduced-motion: reduce) { .leg-flow { display: none; } }'}</style>

          <defs>
            <clipPath id="legClipCard"><rect width={400} height={204} rx={14} /></clipPath>
            <clipPath id="legClipTrafo"><rect width={230} height={92} rx={14} /></clipPath>
            <filter id="legGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation={2.5} result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="legShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx={0} dy={5} stdDeviation={8} floodColor={INK} floodOpacity={0.1} />
            </filter>

            <path id="legP1" d="M 460 210 C 570 210, 560 320, 670 320" fill="none" />
            <path id="legP2" d="M 460 432 C 560 432, 570 380, 670 380" fill="none" />
            <path id="legP3" d="M 460 654 C 570 654, 560 440, 670 440" fill="none" />
            <path id="legC1" d="M 930 340 C 1030 340, 1040 304, 1140 304" fill="none" />
            <path id="legC2" d="M 930 440 C 1030 440, 1040 544, 1140 544" fill="none" />
            <path id="legPt" d="M 800 540 L 800 640" fill="none" />
            <path id="legPtr" d="M 800 640 L 800 540" fill="none" />
            <path id="legH3" d="M 670 500 C 570 500, 560 690, 460 690" fill="none" />

            <g id="legIconHouse" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round">
              <rect x={8} y={24} width={44} height={26} rx={2} />
              <polygon points="30,4 4,25 56,25" />
              <rect x={26} y={34} width={10} height={16} />
            </g>
            <g id="legIconSolar">
              <g fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round">
                <rect x={8} y={24} width={44} height={26} rx={2} />
                <polygon points="30,4 4,25 56,25" />
                <rect x={26} y={36} width={10} height={14} />
              </g>
              <polygon points="13,19 22,11 27,15 18,23" fill="currentColor" />
              <polygon points="33,15 38,11 47,19 42,23" fill="currentColor" />
            </g>
            <g id="legMeter">
              <rect x={0.75} y={0.75} width={128.5} height={44.5} rx={8} fill="#E7F9E4" stroke="#9DD295" strokeWidth={1.5} />
              <T x={65} y={19} size={14} font="head" weight={700} anchor="middle" fill="#1A3317">Smart Meter</T>
              <rect x={35} y={26} width={60} height={15} rx={3} fill="#FFFFFF" stroke="#9DD295" strokeWidth={1} />
              <T x={65} y={37.5} size={11} font="head" weight={700} anchor="middle" fill={GREEN_D}>live</T>
            </g>
          </defs>

          <rect width={1600} height={900} fill="#E7F9E4" />

          <T x={800} y={52} size={34} font="head" weight={700} anchor="middle" fill={INK}>LEG Lostorf Demo 2.0 Live Ansicht</T>
          <T x={800} y={82} size={17} anchor="middle" fill={SOFT}>Produzenten, Batteriespeicher und Konsumenten der Gemeinschaft in Echtzeit</T>

          <circle cx={800} cy={390} r={170} fill="none" stroke={GREEN} strokeWidth={2} opacity={0} className="leg-flow">
            <animate attributeName="r" values="170;215;170" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0;0.35" dur="3.5s" repeatCount="indefinite" />
          </circle>

          {/* Verbindungslinien */}
          <g fill="none" strokeWidth={3.5} strokeLinecap="round">
            {['legP1', 'legP2', 'legP3'].map((pid, k) => (
              <use key={pid} href={`#${pid}`} stroke={GOLD} opacity={aktiv[k] ? 0.45 : 0.15} />
            ))}
            <use href="#legC1" stroke={GREEN} opacity={verbrauchAktiv ? 0.45 : 0.15} />
            <use href="#legC2" stroke={GREEN} opacity={verbrauchAktiv ? 0.45 : 0.15} />
            <use href="#legPt" stroke={SOFT} opacity={0.45} />
            <use href="#legH3" stroke={GREEN} opacity={produzentBezug ? 0.45 : 0.12} />
          </g>

          {/* Fliessende Energie (neu gestartet bei jedem Szenario) */}
          <g key={sc.id}>
            {aktiv[0] && <Dots path="legP1" color={sc.produzentenFluss.farbe} dur={2.6} begin={0} />}
            {aktiv[1] && <Dots path="legP2" color={sc.produzentenFluss.farbe} dur={2.6} begin={0.4} />}
            {aktiv[2] && <Dots path="legP3" color={sc.produzentenFluss.farbe} dur={3} begin={0.8} />}
            {verbrauchAktiv && <Dots path="legC1" color={sc.konsumentenFarbe} dur={2.4} begin={0.2} />}
            {verbrauchAktiv && <Dots path="legC2" color={sc.konsumentenFarbe} dur={2.8} begin={0.6} />}
            <Dots path={netzPfad} color={SOFT} dur={2} begin={0} />
            {produzentBezug && <Dots path="legH3" color={sc.konsumentenFarbe} dur={2.6} begin={0.3} />}
          </g>

          {sc.producers.map((p, i) => <ProducerCard key={p.name} p={p} y={108 + i * 222} i={i} />)}

          {/* LEG-Bilanz */}
          <g transform="translate(670,240)">
            <rect width={260} height={300} rx={16} fill="#1A3317" stroke="#9DD295" strokeOpacity={0.55} strokeWidth={1.5} filter="url(#legShadow)" />
            <T x={130} y={38} size={20} font="head" weight={700} anchor="middle" fill="#E7F9E4">LEG Lostorf Demo 2.0</T>
            <T x={130} y={60} size={14} anchor="middle" fill="#B8D9B4">Live-Bilanz</T>
            <rect x={95} y={72} width={70} height={24} rx={12} fill="#9DD295" />
            <circle cx={111} cy={84} r={4.5} fill="#1A3317"><animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" /></circle>
            <T x={123} y={89} size={13} font="head" weight={700} fill="#1A3317">LIVE</T>

            <T x={22} y={134} size={16} weight={700} fill="#E7F9E4">{sc.hub.angebotLabel}</T>
            <T x={22} y={152} size={12} fill="#B8D9B4">{sc.hub.angebotSub}</T>
            <T x={238} y={140} size={22} font="head" weight={700} anchor="end" fill="#E7F9E4">{sc.hub.angebot}</T>

            <T x={22} y={184} size={16} weight={700} fill="#E7F9E4">Verbrauch</T>
            <T x={22} y={202} size={12} fill="#B8D9B4">{sc.hub.verbrauchSub}</T>
            <T x={238} y={190} size={22} font="head" weight={700} anchor="end" fill="#E7F9E4">{sc.hub.verbrauch}</T>

            <line x1={22} y1={224} x2={238} y2={224} stroke={GREEN} strokeWidth={1.5} />
            <T x={22} y={256} size={15} weight={700} fill="#E7F9E4">{sc.hub.netzLabel}</T>
            <T x={238} y={286} size={26} font="head" weight={700} anchor="end" fill={sc.netz.richtung === 'aus' ? '#9DD295' : '#E7F9E4'}>{sc.hub.netz}</T>
          </g>

          {/* Trafostation */}
          <g transform="translate(685,640)">
            <rect width={230} height={92} rx={14} fill="#FFFFFF" stroke="#D9CEB5" filter="url(#legShadow)" />
            <g clipPath="url(#legClipTrafo)"><rect width={4} height={92} fill={SOFT} /></g>
            <circle cx={40} cy={46} r={13} fill="none" stroke={SOFT} strokeWidth={2.2} />
            <circle cx={58} cy={46} r={13} fill="none" stroke={SOFT} strokeWidth={2.2} />
            <T x={86} y={44} size={21} font="head" weight={700} fill={INK}>Trafostation</T>
            <T x={86} y={66} size={14} fill={SOFT}>Verteilnetz Primeo</T>
          </g>
          <T x={816} y={596} size={15} weight={600} fill={SOFT}>{sc.netz.text}</T>
          {sc.consumers.map((c, i) => <ConsumerCard key={i} c={c} y={202 + i * 240} i={i} />)}

          {/* Legende */}
          <g transform="translate(60,796)">
            <rect width={1480} height={72} rx={10} fill="#FFFFFF" stroke="#D9CEB5" />
            <circle cx={36} cy={36} r={7} fill={GOLD} />
            <T x={54} y={42} size={16} fill={SOFT}>Solarstrom der Produzenten</T>
            <circle cx={312} cy={36} r={7} fill={BLUE} />
            <T x={330} y={42} size={16} fill={SOFT}>Strom aus Batteriespeichern</T>
            <circle cx={578} cy={36} r={7} fill={GREEN} />
            <T x={596} y={42} size={16} fill={SOFT}>Strom zu den Konsumenten</T>
            <line x1={852} y1={36} x2={882} y2={36} stroke={SOFT} strokeWidth={3.5} strokeLinecap="round" />
            <T x={894} y={42} size={16} fill={SOFT}>Austausch mit dem Netz</T>
            <Blink cx={1118} cy={36} r={5} color={GREEN} dur={1.5} />
            <T x={1134} y={42} size={16} fill={SOFT}>Live-Messwert (Smart Meter)</T>
            <T x={1460} y={42} size={15} anchor="end" italic fill={GOLD}>Beispielwerte</T>
          </g>
        </svg>
      </div>
    </div>
  )
}
