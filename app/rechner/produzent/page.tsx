import type { Metadata } from 'next'
import SiteNav from '../../components/SiteNav'
import SiteFooter from '../../components/SiteFooter'
import ResizableIframe from '../../components/ResizableIframe'

export const metadata: Metadata = {
  title: 'Produzenten-Kalkulator',
  description: 'Vergleiche deinen PV-Einspeiseverdienst über die Lokale Elektrizitätsgemeinschaft (LEG) mit dem Primeo-Direkttarif – quartalsweise, mit Excel-Import.',
  alternates: { canonical: '/rechner/produzent' },
}

export default function ProduzentenRechnerPage() {
  return (
    <>
      <SiteNav />
      <ResizableIframe src="/leg-rechner-produzent.html" title="Produzenten-Kalkulator" />
      <SiteFooter />
    </>
  )
}
