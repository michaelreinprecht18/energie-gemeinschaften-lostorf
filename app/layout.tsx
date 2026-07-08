import type { Metadata } from 'next'
import { DM_Sans, Nunito_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const baskerville = DM_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-baskerville',
  display: 'swap',
})

const nunito = Nunito_Sans({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

const siteUrl = 'https://lostorf.solar'
const siteDescription = 'Informationsplattform für lokal produzierten Solarstrom in Lostorf (Kanton Solothurn): Lokale Elektrizitätsgemeinschaften (LEG), virtuelle Zusammenschlüsse zum Eigenverbrauch (vZEV), Sparrechner, PV-Karte und die Energiestadt-Initiative.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Energiegemeinschaften Lostorf – LEG & vZEV Solarstrom',
    template: '%s | Energiegemeinschaften Lostorf',
  },
  description: siteDescription,
  keywords: [
    'LEG Lostorf',
    'Lokale Elektrizitätsgemeinschaft',
    'vZEV Lostorf',
    'Solarstrom Lostorf',
    'Energiegemeinschaft Solothurn',
    'PV-Anlage Lostorf',
    'Energiestadt Lostorf',
    'lokaler Solarstrom Schweiz',
  ],
  authors: [{ name: 'Michael Reinprecht' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: siteUrl,
    siteName: 'Energiegemeinschaften Lostorf',
    title: 'Energiegemeinschaften Lostorf – LEG & vZEV Solarstrom',
    description: siteDescription,
    images: [{ url: '/images/iStock_solarpannels.jpg', width: 2382, height: 1259, alt: 'Solaranlage in Lostorf' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Energiegemeinschaften Lostorf',
    description: siteDescription,
    images: ['/images/iStock_solarpannels.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${baskerville.variable} ${nunito.variable}`}>
      <body className="font-sans">
        {children}
        <Script
          data-goatcounter="https://lostorf-solar.goatcounter.com/count"
          src="https://gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
