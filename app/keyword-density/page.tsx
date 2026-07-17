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

      <div className="relative bg-cover bg-slate-800" style={{ backgroundImage: "url('/herobgwct.webp')", backgroundPosition: 'center 70%' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-white dark:to-slate-900" />
        <div className="relative z-10">
          <ToolHeader />
          <div className="max-w-5xl mx-auto px-4 pt-6 pb-20 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-black mb-2">Keyword Density Checker</h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
              Analyze <strong className="text-white">keyword density</strong> for SEO. Check single keywords, bigrams and trigrams. Free <strong className="text-white">SEO keyword analysis</strong> tool.
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
          <KeywordDensityWrapper />
        </div>
        <div className="mt-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            Use this free <strong>keyword density</strong> tool for <strong>SEO keyword analysis</strong>. Analyze your content for keyword frequency, multi-word phrases, and target keyword prominence — 100% private, nothing is sent to any server.
          </p>
        </div>

        <div className="mt-10 prose prose-slate dark:prose-invert max-w-none">
          <h2>How Keyword Density Is Calculated</h2>
          <p>
            Keyword density measures how frequently a keyword or phrase appears in your text relative to
            the total word count. The formula is: keyword density (%) = (keyword occurrences ÷ total
            words) × 100. If "content marketing" appears 10 times in a 500-word article, its density
            is 2% (10 ÷ 500 × 100).
          </p>
          <p>
            This tool displays keyword density across three levels:
          </p>
          <ul>
            <li><strong>Single keywords:</strong> the top 20 most frequent individual words, after filtering out common stop words (the, a, and, of, to, etc.)</li>
            <li><strong>Bigrams:</strong> the top 20 most frequent two-word phrases</li>
            <li><strong>Trigrams:</strong> the top 20 most frequent three-word phrases</li>
          </ul>
          <p>
            <strong>What is the ideal keyword density for SEO?</strong> Most SEO practitioners recommend
            keeping your primary keyword at 0.5–2% density. Below 0.5%, the topic may appear undercovered
            to search engines. Above 3%, the repetition becomes noticeable to readers and may trigger
            Google's quality filters for keyword stuffing. The safest approach is natural writing — if
            a keyword appears at a density that feels forced to a human reader, it is almost certainly
            too high.
          </p>
          <p>
            <strong>TF-IDF vs. keyword density:</strong> Modern search engines use TF-IDF (Term
            Frequency–Inverse Document Frequency) rather than raw density. TF-IDF weighs how often a
            term appears in your document against how often it appears across all documents on the web.
            A word that appears frequently in your text but rarely across the wider web carries more
            topical signal than a common word with similar frequency. Keyword density is a simplified
            proxy for this relationship; TF-IDF is the underlying mechanism search engines actually use.
          </p>
          <p>
            <strong>Keyword placement matters more than density.</strong> A keyword appearing in your
            H1, opening paragraph, and subheadings signals relevance more strongly than the same keyword
            clustered in one section mid-article. This tool shows whether your target keyword appears in
            the first 100 words, which is the most important placement signal for on-page SEO.
          </p>

          <h2>Example: Fixing Keyword Distribution in an SEO Article</h2>
          <p>
            An SEO writer is optimizing a page targeting the phrase "best running shoes for flat feet."
            She pastes her 900-word draft and enters the target phrase in the keyword input. The analysis
            shows:
          </p>
          <ul>
            <li>"running shoes" (bigram): appears 11 times — density 2.44%</li>
            <li>"flat feet" (bigram): appears 6 times — density 1.33%</li>
            <li>"best running shoes" (trigram): appears 4 times — density 0.89%</li>
          </ul>
          <p>
            The bigram "running shoes" at 11 occurrences in 900 words means it appears roughly every
            82 words — noticeable to a reader. More concerning, checking the distribution shows 7 of the
            11 occurrences in the first 300 words. The back half of the article uses the phrase only 4
            times, making the keyword placement pattern look unnatural.
          </p>
          <p>
            She redistributes the keyword usage and introduces natural synonyms: "trail runners," "athletic
            footwear," "stability shoes," and "motion control sneakers." After revision, "running shoes"
            appears 7 times with even distribution across the article. She then checks the trigram results
            and notices "motion control shoes" and "arch support insoles" appearing as new topical clusters
            — subtopics she had not fully addressed. She expands those sections by 200 words, strengthening
            the topical authority of the page without forcing any single phrase higher.
          </p>

          <h2>Key Factors in Keyword Analysis</h2>
          <p>
            <strong>Stop words are filtered out.</strong> Common words like "the," "a," "and," "of," "to,"
            and "in" are excluded from keyword analysis because they appear in virtually every piece of
            content and carry no SEO signal. The analysis surfaces only meaningful content terms, making
            it easier to spot genuine topical patterns in your writing.
          </p>
          <p>
            <strong>Keyword variations count separately.</strong> "Running shoe," "running shoes," and
            "best running shoes" are three distinct phrases in this analysis. Google's natural language
            processing understands them as related, but tracking them independently lets you see exactly
            how each variant is distributed — which is more actionable than aggregating them into a single
            number.
          </p>
          <p>
            <strong>LSI keywords</strong> (Latent Semantic Indexing terms) are topically related words
            Google expects to see in content on a given subject. A page about "coffee brewing" should
            naturally include "beans," "grind," "extraction," "temperature," and "flavor." The keyword
            density results can reveal LSI gaps: if expected related terms are absent from your top
            keywords, your content may appear thin on a subtopic that competitors cover more thoroughly.
          </p>
          <p>
            <strong>Keyword stuffing is penalized.</strong> Google's guidelines explicitly address
            keyword stuffing — unnaturally repeating keywords to manipulate rankings — as a quality
            violation. A density above 5–7% for any single term is a reliable indicator that the text
            has been optimized for search engines rather than readers, and Google's quality systems treat
            it accordingly. The 0.5–2% range stays comfortably within natural writing patterns.
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
