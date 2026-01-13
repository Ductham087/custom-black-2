import { Inter } from 'next/font/google'
import './globals.css'
const font = Inter({ subsets: ['latin'] })
import { optimisticFont } from './fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${font.className}  ${optimisticFont.variable}`}>
        {children}
      </body>
    </html>
  )
}
