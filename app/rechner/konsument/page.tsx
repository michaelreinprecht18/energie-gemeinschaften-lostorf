import type { Metadata } from 'next'
import SiteNav from '../../components/SiteNav'
import SiteFooter from '../../components/SiteFooter'
import ResizableIframe from '../../components/ResizableIframe'

export const metadata: Metadata = {
  title: 'Konsumenten-Rechner',
  description: 'Berechne deine Stromkosten mit und ohne Lokale Elektrizitätsgemeinschaft (LEG) in Lostorf – aufgeteilt nach Energie, Netz und Abgaben, mit Ersparnis-Ausweis.',
  alternates: { canonical: '/rechner/konsument' },
}

export default function KonsumentenRechnerPage() {
  return (
    <>
      <SiteNav />
      <ResizableIframe src="/leg-rechner-konsument.html" title="Konsumenten-Rechner" />
      <SiteFooter />
    </>
  )
}
