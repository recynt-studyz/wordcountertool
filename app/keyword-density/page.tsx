import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import KeywordDensityWrapper from '@/components/KeywordDensityWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Keyword Density Checker — SEO Keyword Analysis',
  description:
    'Analyze keyword frequency and density for SEO optimization. Check bigrams, trigrams, and target keyword placement. Free keyword density analyzer.',
  alternates: { canonical: 'https://wordcountertool.app/keyword-density' },
}

const faqs = [
  {
    question: 'What is keyword density?',
    answer:
      'Keyword density is the percentage of times a specific word or phrase appears in a text relative to the total word count. For example, if "content marketing" appears 10 times in a 500-word article, its keyword density is 2%.',
  },
  {
    question: 'What is the ideal keyword density for SEO?',
    answer:
      'Most SEO professionals recommend a keyword density of 0.5–2% for your target keyword. Below 0.5% may signal the topic is not covered thoroughly; above 2–3% risks appearing as keyword stuffing, which Google penalizes. Natural writing is always better than forcing keywords.',
  },
  {
    question: 'How do I check keyword density?',
    answer:
      'Paste your content into the keyword density analyzer above. You will see the top 20 most frequent words, bigrams, and trigrams with their exact densities. You can also enter a target keyword to see its specific density and whether it appears in the first 100 words.',
  },
  {
    question: 'What are bigrams and trigrams in keyword analysis?',
    answer:
      'Bigrams are two-word phrases (e.g. "keyword density") and trigrams are three-word phrases (e.g. "keyword density checker"). Analyzing multi-word phrases helps identify important topical clusters and long-tail keyword opportunities in your content.',
  },
  {
    question: 'Is keyword stuffing bad for SEO?',
    answer:
      'Yes. Keyword stuffing — unnaturally repeating a keyword to manipulate rankings — is a violation of Google\'s guidelines and can result in ranking penalties. The goal is natural, reader-focused writing where keywords appear in context. A density of 0.5–2% is generally safe.',
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
      name: 'Keyword Density Checker',
      url: 'https://wordcountertool.app/keyword-density',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'HowTo',
      name: 'How to check keyword density',
      step: [
        { '@type': 'HowToStep', name: 'Paste your content', text: 'Copy your article or web page text and paste it into the keyword density checker.' },
        { '@type': 'HowToStep', name: 'View top keywords', text: 'See the top 20 keywords, bigrams, and trigrams with their frequency and density percentage.' },
        { '@type': 'HowToStep', name: 'Check your target keyword', text: 'Enter your target keyword to see its exact density and whether it appears prominently in the first 100 words.' },
      ],
    },
  ],
}

export default function KeywordDensityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="relative bg-blue-900">
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-white dark:to-slate-900" />
        <div className="relative z-10">
          <ToolHeader />
          <div className="max-w-5xl mx-auto px-4 pt-6 pb-20 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-black mb-2">Keyword Density Checker</h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
              Analyze <strong className="text-white">keyword density</strong> for SEO. Check single keywords, bigrams and trigrams. Free <strong className="text-white">SEO keyword analysis</strong> tool.
            </p>
          </div>
        </div>
      </div>

      <AdBanner />

      <main className="max-w-5xl mx-auto px-4 pb-10 -mt-4">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 md:p-8">
          <KeywordDensityWrapper />
        </div>
        <div className="mt-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            Use this free <strong>keyword density</strong> tool for <strong>SEO keyword analysis</strong>. Analyze your content for keyword frequency, multi-word phrases, and target keyword prominence — 100% private, nothing is sent to any server.
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
