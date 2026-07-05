'use client'
import { useEffect, useRef, useState } from 'react'

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1400
          const start = performance.now()
          const animate = (now: number) => {
            const elapsed = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - elapsed, 3)
            setValue(Math.round(eased * target))
            if (elapsed < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{value}{suffix}</span>
}

const STATS = [
  { value: 21, suffix: '', label: 'mögliche Quartier-LEG in Lostorf' },
  { value: 100, suffix: '+', label: 'Haushalte pro Energiegemeinschaft' },
  { value: 30, suffix: '%', label: 'mögliche Kosteneinsparung' },
]

export default function StatsBand() {
  return (
    <div style={{ background: '#1A3317', padding: '52px 24px' }}>
      <div style={{
        maxWidth: 860,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 40,
        textAlign: 'center',
      }} className="mobile-stack">
        {STATS.map((s, i) => (
          <div key={i}>
            <div style={{
              fontFamily: 'var(--font-baskerville), system-ui, sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(44px, 5vw, 64px)',
              color: '#9DD295',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>
              <AnimatedNumber target={s.value} suffix={s.suffix} />
            </div>
            <div style={{
              fontFamily: 'var(--font-nunito), system-ui, sans-serif',
              fontSize: 14,
              color: '#6B9968',
              marginTop: 10,
              lineHeight: 1.5,
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
