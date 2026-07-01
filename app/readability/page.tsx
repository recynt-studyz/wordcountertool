import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import ReadabilityWrapper from '@/components/ReadabilityWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Readability Checker — Test Text Readability Score',
  description:
    'Check text readability with Flesch Reading Ease, Flesch-Kincaid Grade, Gunning Fog, Coleman-Liau, and SMOG scores. Free online readability checker.',
  alternates: { canonical: 'https://wordcountertool.app/readability' },
}

const faqs = [
  {
    question: 'What is the Flesch Reading Ease score?',
    answer:
      'The Flesch Reading Ease score rates text on a scale from 0 to 100. Higher scores (70–100) indicate easy-to-read text aimed at general audiences. Scores below 30 are very difficult and typically academic. Most web content should target a score of 60–70.',
  },
  {
    question: 'What readability score should I aim for?',
    answer:
      'For general web content and blogs, aim for a Flesch Reading Ease score of 60–70 (plain English, readable by most adults). For marketing copy, 70+ is ideal. Academic papers typically score 30–50. A Flesch-Kincaid Grade Level of 7–9 is recommended for most online content.',
  },
  {
    question: 'What is the Flesch-Kincaid Grade Level?',
    answer:
      'The Flesch-Kincaid Grade Level maps your text to a US school grade level. A grade of 8 means an 8th grader (roughly 13–14 years old) can read it. Most popular newspapers target grade 6–8. This readability checker shows the grade level instantly.',
  },
  {
    question: 'How do I improve my text readability?',
    answer:
      'The most effective ways to improve readability are: (1) shorten your sentences — aim for under 20 words each, (2) use simpler words with fewer syllables, (3) break up long paragraphs, and (4) use active voice instead of passive constructions.',
  },
  {
    question: 'What is the Gunning Fog Index?',
    answer:
      'The Gunning Fog Index estimates the years of education needed to understand a text. It is calculated using sentence length and the percentage of complex words (3+ syllables). A score of 12 corresponds to high school level. Most business writing targets a Fog Index of 10–12.',
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
      name: 'Readability Checker',
      url: 'https://wordcountertool.app/readability',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'HowTo',
      name: 'How to check text readability',
      step: [
        { '@type': 'HowToStep', name: 'Paste your text', text: 'Copy your content and paste it into the readability checker.' },
        { '@type': 'HowToStep', name: 'View readability scores', text: 'Instantly see Flesch, Flesch-Kincaid, Gunning Fog, Coleman-Liau, and SMOG scores.' },
        { '@type': 'HowToStep', name: 'Follow improvement suggestions', text: 'Read the personalized suggestions to make your text clearer and more accessible.' },
      ],
    },
  ],
}

export default function ReadabilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="relative bg-cover bg-slate-800" style={{ backgroundImage: "url('/herobgwct.webp')", backgroundPosition: 'center bottom' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-white dark:to-slate-900" />
        <div className="relative z-10">
          <ToolHeader />
          <div className="max-w-5xl mx-auto px-4 pt-6 pb-20 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-black mb-2">Readability Checker</h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
              Test your <strong className="text-white">readability score</strong> with Flesch, Flesch-Kincaid, Gunning Fog, Coleman-Liau and SMOG. Free and instant.
            </p>
          </div>
        </div>
      </div>

      <AdBanner />

      <main className="max-w-5xl mx-auto px-4 pb-10 -mt-4">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8">
          <ReadabilityWrapper />
        </div>
        <div className="mt-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            This free <strong>readability checker</strong> analyzes your text using five established <strong>readability score</strong> formulas. All calculations run in your browser — your content stays completely private.
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
