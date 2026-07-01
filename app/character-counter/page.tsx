import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import CharacterCounterWrapper from '@/components/CharacterCounterWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Character Counter — Count Characters Online Free',
  description:
    'Count characters with and without spaces, bytes, letters, numbers and special characters instantly. Includes platform character limit checker. Free online character counter.',
  alternates: { canonical: 'https://wordcountertool.app/character-counter' },
}

const faqs = [
  {
    question: 'How do I count characters in text?',
    answer:
      'Paste or type your text into the character counter above. It instantly shows characters with spaces, characters without spaces, bytes, letters, numbers, and special characters — no button required.',
  },
  {
    question: 'What is the difference between characters with and without spaces?',
    answer:
      'Characters with spaces counts every character including spaces, tabs, and newlines. Characters without spaces removes all whitespace first, giving you just the visible characters in your text.',
  },
  {
    question: 'How many characters are in a word on average?',
    answer:
      'The average English word is about 4.7 characters long. So a 1,000-word document is roughly 5,000 characters without spaces, or about 5,900 characters with spaces.',
  },
  {
    question: 'Is my text sent to a server when counting characters?',
    answer:
      'No. All character counting happens in your browser using native JavaScript. Your text never leaves your device. This is a completely private character counter.',
  },
  {
    question: 'How do I count bytes in text?',
    answer:
      'Byte count depends on the encoding. This character counter uses UTF-8 encoding (the web standard). ASCII characters like basic English letters use 1 byte each; accented characters and emoji use 2–4 bytes.',
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
      name: 'Character Counter',
      url: 'https://wordcountertool.app/character-counter',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'HowTo',
      name: 'How to count characters online',
      step: [
        { '@type': 'HowToStep', name: 'Paste your text', text: 'Copy your text and paste it into the character counter.' },
        { '@type': 'HowToStep', name: 'View character stats', text: 'Instantly see characters with spaces, without spaces, byte count, letters, numbers, and special characters.' },
        { '@type': 'HowToStep', name: 'Check platform limits', text: 'Select a platform like Twitter or Instagram to check if your text fits within the character limit.' },
      ],
    },
  ],
}

export default function CharacterCounterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="relative bg-cover bg-slate-800" style={{ backgroundImage: "url('/herobgwct.webp')", backgroundPosition: 'center 70%' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-white dark:to-slate-900" />
        <div className="relative z-10">
          <ToolHeader />
          <div className="max-w-5xl mx-auto px-4 pt-6 pb-20 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-black mb-2">Character Counter</h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
              Count characters, bytes, letters, numbers and special characters instantly. Free <strong className="text-white">character counter</strong> with platform limit checker.
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
          <CharacterCounterWrapper />
        </div>
        <div className="mt-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            Use this free <strong>character counter</strong> to get an accurate <strong>character count</strong> for any text. The counter tracks characters with and without spaces, byte size, and more — entirely in your browser with no data sent to any server.
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
