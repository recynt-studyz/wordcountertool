import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import WordCounterWrapper from '@/components/WordCounterWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Word Counter — Free Online Word Count Tool',
  description:
    'Count words, characters, sentences and paragraphs instantly. Includes readability scores, keyword density, reading time and platform limits. Free, private, no signup.',
  alternates: { canonical: 'https://wordcountertool.app' },
}

const faqs = [
  {
    question: 'How do I count words online?',
    answer:
      'Simply paste or type your text into the text area above. The word counter updates instantly as you type, showing your word count, character count, and more — no button to click.',
  },
  {
    question: 'Does this word counter send my text to a server?',
    answer:
      'No. All text processing happens entirely in your browser using native JavaScript. Your text never leaves your device — whether it is a novel draft, client contract, or personal notes. This word counter is completely private.',
  },
  {
    question: 'How do I check my word count for an essay?',
    answer:
      'Paste your essay text into the word counter above. You will see word count, character count, sentence count, and paragraph count instantly. You can also set a word goal to track your progress.',
  },
  {
    question: 'What is a good word count for a blog post?',
    answer:
      'Most successful blog posts run 1,000–2,000 words. Long-form content (2,500–4,000 words) tends to perform better for SEO. Use the Reading Time tool to make sure your article length matches your audience\'s expectations.',
  },
  {
    question: 'Does punctuation count as a word?',
    answer:
      'No. The word counter splits text on whitespace and counts sequences of non-space characters as words. Punctuation attached to a word (like a comma or period) is counted as part of that word token, not as a separate word.',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(q => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: { '@type': 'Answer', text: q.answer },
      })),
    },
    {
      '@type': 'WebApplication',
      name: 'Word Counter Tool',
      url: 'https://wordcountertool.app',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Free online word counter with character count, readability scores, keyword density, reading time, and platform character limits.',
    },
    {
      '@type': 'HowTo',
      name: 'How to count words online',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Paste your text',
          text: 'Copy your content and paste it into the text area on wordcountertool.app.',
        },
        {
          '@type': 'HowToStep',
          name: 'View instant stats',
          text: 'Your word count, character count, sentence count, and more update instantly as you type.',
        },
        {
          '@type': 'HowToStep',
          name: 'Analyze readability and keywords',
          text: 'Scroll down to see readability scores, keyword density, reading time, and platform character limits.',
        },
      ],
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero section */}
      <div
        className="relative bg-cover bg-slate-800"
        style={{ backgroundImage: "url('/herobgwct.webp')", backgroundPosition: 'center 70%' }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10" />
        {/* Bottom fade to white */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-white dark:to-slate-900" />

        <div className="relative z-10">
          <ToolHeader />
          <div className="max-w-5xl mx-auto px-4 pt-8 pb-28 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
              Word Counter
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-6 max-w-2xl mx-auto">
              Count words, characters, and more instantly. Free online word counter built for writers.
            </p>
            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <span>&#128274;</span>
                <span>
                  Private <span className="hidden sm:inline text-white/60">— your text never leaves your browser</span>
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span>&#9889;</span> Instant
              </span>
              <span className="flex items-center gap-1.5">
                <span>&#8734;</span> Unlimited
              </span>
              <span className="flex items-center gap-1.5">
                <span>&#10003;</span> Free
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AdBanner 1 — between hero and tool */}
      <AdBanner />

      {/* Main tool card */}
      <main className="max-w-5xl mx-auto px-4 pb-10 -mt-4">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8">
          <WordCounterWrapper />
        </div>

        {/* Body text for SEO */}
        <div className="mt-8 prose prose-slate dark:prose-invert max-w-none text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            This free <strong>word counter</strong> gives you an instant <strong>word count</strong> and{' '}
            <strong>character counter</strong> as you type. All analysis — including readability scores,
            keyword density, and reading time — runs entirely in your browser.{' '}
            <strong>Your text never leaves your browser.</strong> No account needed, no file uploads,
            completely private.
          </p>
        </div>
      </main>

      {/* AdBanner 2 */}
      <AdBanner />

      {/* FAQ */}
      <FAQ questions={faqs} />

      {/* AdBanner 3 */}
      <AdBanner />

      <Footer />
    </>
  )
}
