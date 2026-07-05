import type { Metadata } from 'next'
import { Libre_Baskerville, Nunito_Sans } from 'next/font/google'
import './globals.css'

const baskerville = Libre_Baskerville({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
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
  title: 'Energie Gemeinschaften Lostorf',
  description: 'Informationsplattform für lokal produzierten Solarstrom in Lostorf – vZEV & LEG',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${baskerville.variable} ${nunito.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
