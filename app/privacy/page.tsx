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
            <h1 className="text-3xl font-black mb-2">Privacy Policy</h1>
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
            We may use anonymous, aggregated analytics (page views, country of origin) provided by our hosting platform. No personally identifiable information is collected.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this privacy policy, please use the Contact link in the footer.
          </p>

          <p className="text-sm text-slate-400">Last updated: June 2026</p>
        </div>
      </main>

      <Footer />
    </>
  )
}
