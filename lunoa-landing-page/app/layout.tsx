import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PWAInstallPrompt } from '@/components/pwa-install-prompt'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lunoa - Where Credible Business Connect',
  description: 'The premier B2B trust and cybersecurity marketplace connecting credible businesses worldwide. Secure messaging, smart matching, and comprehensive business verification.',
  keywords: [
    'B2B marketplace',
    'business trust',
    'cybersecurity',
    'secure messaging',
    'smart matching',
    'business verification',
    'credible business',
    'B2B platform',
    'business networking',
    'enterprise security'
  ],
  authors: [{ name: 'Lunoa Team' }],
  creator: 'Lunoa',
  publisher: 'Lunoa',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lunoa.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Lunoa - Where Credible Business Connect',
    description: 'The premier B2B trust and cybersecurity marketplace connecting credible businesses worldwide.',
    url: 'https://lunoa.io',
    siteName: 'Lunoa',
    images: [
      {
        url: '/images/Lunoa-Byte-Forward-Hackathon.png',
        width: 1200,
        height: 630,
        alt: 'Lunoa - Where Credible Business Connect',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lunoa - Where Credible Business Connect',
    description: 'The premier B2B trust and cybersecurity marketplace connecting credible businesses worldwide.',
    images: ['/images/Lunoa-Byte-Forward-Hackathon.png'],
    creator: '@lunoa',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/lunoa-icon.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#0f172a',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#0f172a',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lunoa" />
        <meta name="application-name" content="Lunoa" />
        <meta name="msapplication-tooltip" content="Lunoa - Where Credible Business Connect" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className}>
        {children}
        <PWAInstallPrompt />
      </body>
    </html>
  )
}
