import type { Metadata } from 'next'
import { DM_Sans, Nunito_Sans } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Energiegemeinschaften Lostorf',
  description: 'Informationsplattform für lokal produzierten Solarstrom in Lostorf – vZEV & LEG',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${baskerville.variable} ${nunito.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
