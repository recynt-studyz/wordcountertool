import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import ReadingTimeWrapper from '@/components/ReadingTimeWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Reading Time Calculator — How Long to Read Text',
  description:
    'Calculate reading time at different speeds — slow, average, fast, and speed reader. Speaking time and presentation time included. Free reading time calculator.',
  alternates: { canonical: 'https://wordcountertool.app/reading-time' },
}

const faqs = [
  {
    question: 'How long does it take to read 1000 words?',
    answer:
      'At the average reading speed of 200–250 WPM, a 1,000-word article takes about 4–5 minutes to read. A fast reader at 300 WPM would finish in about 3.5 minutes, while a slow reader at 150 WPM might take closer to 7 minutes.',
  },
  {
    question: 'What is the average reading speed?',
    answer:
      'The average adult reading speed is 200–250 words per minute (WPM) for casual reading. Skimming or speed reading can reach 400–600 WPM, though comprehension typically decreases at higher speeds.',
  },
  {
    question: 'How do I calculate speaking time for a speech?',
    answer:
      'The average speaking rate is 120–150 words per minute (WPM). This reading time calculator uses 130 WPM as the default speaking speed. Paste your speech text above and the speaking time is shown instantly.',
  },
  {
    question: 'How long should a blog post take to read?',
    answer:
      'Most readers prefer blog posts that take 5–7 minutes to read, which corresponds to roughly 1,000–1,500 words. Longer in-depth guides (10–15 min) work well for pillar content targeting high-competition keywords.',
  },
  {
    question: 'What is the difference between reading time and speaking time?',
    answer:
      'Reading time is how long a reader would silently read your text (typically 200 WPM). Speaking time is how long it takes to read aloud, which is slower (around 130 WPM) because speech includes natural pauses and enunciation.',
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
      name: 'Reading Time Calculator',
      url: 'https://wordcountertool.app/reading-time',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'HowTo',
      name: 'How to calculate reading time',
      step: [
        { '@type': 'HowToStep', name: 'Paste your text', text: 'Paste your article, essay, or speech script into the reading time calculator.' },
        { '@type': 'HowToStep', name: 'View reading times', text: 'Instantly see reading time at slow, average, fast, and speed reader paces.' },
        { '@type': 'HowToStep', name: 'Adjust your reading speed', text: 'Use the custom WPM slider to calculate your personal reading time at any speed.' },
      ],
    },
  ],
}

export default function ReadingTimePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="relative bg-cover bg-slate-800" style={{ backgroundImage: "url('/herobgwct.webp')", backgroundPosition: 'center 70%' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-white dark:to-slate-900" />
        <div className="relative z-10">
          <ToolHeader />
          <div className="max-w-5xl mx-auto px-4 pt-6 pb-20 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-black mb-2">Reading Time Calculator</h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
              Calculate reading speed and speaking time instantly. Free <strong className="text-white">reading time calculator</strong> with custom WPM slider.
            </p>
            <div className="flex justify-center mt-4">
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

      <AdBanner />

      <main className="max-w-5xl mx-auto px-4 pb-10 -mt-4">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8">
          <ReadingTimeWrapper />
        </div>
        <div className="mt-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            This free <strong>reading time calculator</strong> estimates how long it takes to read any text at different <strong>reading speeds</strong>. Paste your content and immediately see reading time for slow, average, fast, and speed readers — no signup needed.
          </p>
        </div>
      </main>

      <AdBanner />
      <FAQ questions={faqs} />
      <AdBanner />
      <Footer />
    </>
  )
}
