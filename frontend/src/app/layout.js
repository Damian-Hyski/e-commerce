import './globals.css'

export const metadata = {
  title: 'E-Commerce',
  description: 'next E-Commerce',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}
