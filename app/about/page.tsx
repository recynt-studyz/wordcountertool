import type { Metadata } from 'next'
import Link from 'next/link'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About — wordcountertool.app',
  description: 'About wordcountertool.app — a free, private word counter and text analysis tool built for writers, bloggers, and content creators.',
  alternates: { canonical: 'https://wordcountertool.app/about' },
}

export default function AboutPage() {
  return (
    <>
      <div className="relative bg-cover bg-slate-800" style={{ backgroundImage: "url('/herobgwct.webp')", backgroundPosition: 'center bottom' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-white dark:to-slate-900" />
        <div className="relative z-10">
          <ToolHeader />
          <div className="max-w-5xl mx-auto px-4 pt-6 pb-20 text-center text-white">
            <h1 className="text-3xl font-black mb-2">About wordcountertool.app</h1>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
            wordcountertool.app is a free, private word counter and text analysis tool built for writers, bloggers, students, and content creators.
          </p>

          <p>
            The goal is simple: give you every stat you need about your writing, instantly, without uploading anything anywhere. No account. No file upload. No API calls. All text processing runs entirely in your browser.
          </p>

          <h2>What it does</h2>
          <ul>
            <li><Link href="/">Word Counter</Link> — word count, character count, sentences, paragraphs, readability scores, and keyword density all in one place</li>
            <li><Link href="/character-counter">Character Counter</Link> — detailed character breakdown including bytes, letters, numbers, and special characters</li>
            <li><Link href="/reading-time">Reading Time Calculator</Link> — reading time at multiple speeds with a custom WPM slider</li>
            <li><Link href="/readability">Readability Checker</Link> — five readability formulas including Flesch, Gunning Fog, and Coleman-Liau</li>
            <li><Link href="/keyword-density">Keyword Density Checker</Link> — keyword frequency analysis with bigram and trigram support for SEO</li>
            <li><Link href="/platform-limits">Platform Limits Checker</Link> — check your content against Twitter, Instagram, LinkedIn, and 8 other platforms at once</li>
          </ul>

          <h2>Philosophy</h2>
          <p>
            Writers spend a lot of time in their text editor. A word count tool should feel like a natural extension of that — fast, quiet, and always available. That means no spinners while your text uploads, no login walls, no pop-ups asking you to subscribe.
          </p>
          <p>
            Just paste your text and get answers.
          </p>

          <h2>Privacy</h2>
          <p>
            Your writing is yours. Nothing you type is ever sent anywhere. Read the full <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </main>

      <Footer />
    </>
  )
}
