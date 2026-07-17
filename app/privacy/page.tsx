import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — wordcountertool.app',
  description: 'Privacy policy for wordcountertool.app. All text processing happens in your browser. Nothing is transmitted to any server.',
  alternates: { canonical: 'https://wordcountertool.app/privacy' },
}

export default function PrivacyPage() {
  return (
    <>
      <div className="relative bg-cover bg-slate-800" style={{ backgroundImage: "url('/herobgwct.webp')", backgroundPosition: 'center 70%' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-white dark:to-slate-900" />
        <div className="relative z-10">
          <ToolHeader />
          <div className="max-w-5xl mx-auto px-4 pt-6 pb-20 text-center text-white">
            <h1 className="text-3xl font-black mb-4">Privacy Policy</h1>
            <div className="flex justify-center">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/90 bg-black/60 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg shadow-black/40">
                <span className="flex items-center gap-1.5"><span>&#128274;</span><span>Private <span className="hidden sm:inline text-white/60">— your text never leaves your browser</span></span></span>
                <span className="flex items-center gap-1.5"><span>&#9889;</span> Instant</span>
                <span className="flex items-center gap-1.5"><span>&#8734;</span> Unlimited</span>
                <span className="flex items-center gap-1.5"><span>&#10003;</span> Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Your Privacy</h2>
          <p>
            <strong>All text processing happens in your browser using native JavaScript. Nothing is transmitted to any server.</strong>
          </p>
          <p>
            Your text — whether it is a novel draft, client contract, business proposal, or personal notes — never leaves your device. wordcountertool.app has no backend that receives, stores, or processes your content.
          </p>

          <h2>What We Do Not Collect</h2>
          <ul>
            <li>We do not collect or transmit the text you paste or type into the tool</li>
            <li>We do not store your word counts, character counts, or any statistics</li>
            <li>We do not require you to create an account or provide any personal information</li>
            <li>We do not use cookies beyond those required by third-party advertising</li>
          </ul>

          <h2>Local Storage</h2>
          <p>
            wordcountertool.app stores two small pieces of data in your browser's <code>localStorage</code>:
          </p>
          <ul>
            <li><strong>wordcountertool-theme</strong>: your dark or light mode preference</li>
            <li><strong>wordcountertool-goal</strong>: your word goal (if you set one)</li>
          </ul>
          <p>
            These values never leave your device and can be cleared at any time by clearing your browser's local storage.
          </p>

          <h2>Advertising</h2>
          <p>
            wordcountertool.app displays ads served by Google AdSense. Google may use cookies to serve ads based on your prior visits to this website or other sites. You can opt out of personalised advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>
            .
          </p>

          <h2>Analytics</h2>
          <p>
            wordcountertool.app uses Google Analytics 4 (GA4) to collect anonymous, aggregated usage
            data. GA4 tracks page views, session duration, general geographic region (country level),
            device type, and browser type. It does not receive, process, or store any text you enter
            into the tools. No personally identifiable information is collected or transmitted through
            GA4.
          </p>
          <p>
            Google Analytics uses cookies to distinguish returning visitors from new ones and to
            aggregate usage patterns across sessions. You can opt out of Google Analytics tracking by
            installing the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>

          <h2>AdSense and Advertising Cookies</h2>
          <p>
            wordcountertool.app displays ads served by Google AdSense (publisher ID: ca-pub-5035661017594256).
            Google uses cookies to serve ads based on your prior visits to this website and to other
            sites across the web. These cookies allow Google to personalize ad content based on your
            browsing history.
          </p>
          <p>
            You can opt out of personalized advertising at any time by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>
            . You can also opt out of third-party vendor advertising cookies through the{' '}
            <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer">
              Network Advertising Initiative opt-out page
            </a>
            .
          </p>

          <h2>GDPR and CCPA</h2>
          <p>
            If you are located in the European Economic Area (EEA) or the United Kingdom, you have
            rights under the General Data Protection Regulation (GDPR) regarding any personal data that
            may be processed about you, including the right to access, correct, or request deletion of
            that data. Because wordcountertool.app does not collect or store personal data directly,
            the primary data processor you may interact with is Google (via Analytics and AdSense). You
            can review Google's privacy practices at{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              policies.google.com/privacy
            </a>
            .
          </p>
          <p>
            If you are a California resident, the California Consumer Privacy Act (CCPA) provides you
            with the right to know what personal information is collected about you and the right to
            opt out of the sale of personal information. wordcountertool.app does not sell personal
            information. The only third-party data processing occurs through Google Analytics and Google
            AdSense, both of which provide opt-out mechanisms described above.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this privacy policy or about how your data is handled, please
            use the Contact link in the footer. We aim to respond to all privacy inquiries within 5
            business days.
          </p>

          <p className="text-sm text-slate-400">Last updated: June 2026</p>
        </div>
      </main>

      <Footer />
    </>
  )
}
