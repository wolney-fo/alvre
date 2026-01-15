import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Alvre 📦',
  description: 'Deliveries tracking app 📦',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} antialiased text-foreground bg-background`}
      >
        {children}
      </body>
    </html>
  )
}
