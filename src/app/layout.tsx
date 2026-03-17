import type { Metadata } from 'next'
import { Inter, Montserrat, JetBrains_Mono } from 'next/font/google'

import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['600', '700', '800'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SEZY | Votre Passerelle Europe-Afrique',
  description: 'Logistique Paris-Cotonou, Shopping Bien-être et Études en Europe.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${montserrat.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans text-slate-700 bg-white antialiased overflow-x-hidden">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ScrollToTop />
        </div>
      </body>
    </html>
  )
}
