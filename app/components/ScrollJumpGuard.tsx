'use client'
import { useEffect } from 'react'

// Das eingebettete Microsoft-Forms-iframe zieht beim Laden ungewollt den Fokus
// und damit den Scroll der Seite zu sich. Dieser Guard hält die Scrollposition
// kurz nach dem Laden fest, ausser die URL hat einen echten Sprungziel-Hash
// (z.B. #kontakt) oder der Besucher scrollt selbst aktiv.
export default function ScrollJumpGuard() {
  useEffect(() => {
    if (window.location.hash) return
    if (history.scrollRestoration) history.scrollRestoration = 'manual'

    const guardUntil = Date.now() + 2000
    let lastUserY = window.scrollY
    let userScrolled = false

    function onUserScroll() {
      userScrolled = true
    }
    window.addEventListener('wheel', onUserScroll, { passive: true })
    window.addEventListener('touchmove', onUserScroll, { passive: true })

    let rafId: number
    function tick() {
      if (Date.now() > guardUntil || userScrolled) return
      if (window.scrollY !== lastUserY) window.scrollTo(0, lastUserY)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('wheel', onUserScroll)
      window.removeEventListener('touchmove', onUserScroll)
    }
  }, [])

  return null
}
