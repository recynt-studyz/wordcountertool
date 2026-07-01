import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Word Counter Tool — Free Online Word & Character Count',
  description:
    'Free online word counter with character count, readability scores, keyword density, reading time, and platform character limits. Instant, private, no signup.',
  keywords: [
    'word counter',
    'word count',
    'character counter',
    'word counter online',
    'reading time calculator',
    'readability checker',
    'keyword density checker',
    'character count',
    'words counter',
    'word count tool',
    'platform character limits',
    'social media character limits',
  ],
  metadataBase: new URL('https://wordcountertool.app'),
  alternates: { canonical: 'https://wordcountertool.app' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Word Counter Tool — Free Online Word & Character Count',
    description:
      'Free online word counter with character count, readability scores, keyword density, reading time, and platform character limits. Instant, private, no signup.',
    url: 'https://wordcountertool.app',
    siteName: 'wordcountertool.app',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Counter Tool — Free Online Word & Character Count',
    description:
      'Free online word counter with character count, readability scores, keyword density, reading time, and platform character limits. Instant, private, no signup.',
  },
  other: {
    'google-adsense-account': 'ca-pub-8792838105001561',
  },
  verification: {
    google: 'PLACEHOLDER_GOOGLE_SITE_VERIFICATION',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8792838105001561" />
        {/* Dark mode init — must run before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('wordcountertool-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8792838105001561"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
