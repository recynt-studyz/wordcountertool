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

      <div className="relative bg-cover bg-slate-800" style={{ backgroundImage: "url('/herobgwct.webp')", backgroundPosition: 'center 70%' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-white dark:to-slate-900" />
        <div className="relative z-10">
          <ToolHeader />
          <div className="max-w-5xl mx-auto px-4 pt-6 pb-20 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-black mb-2">Readability Checker</h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
              Test your <strong className="text-white">readability score</strong> with Flesch, Flesch-Kincaid, Gunning Fog, Coleman-Liau and SMOG. Free and instant.
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
          <ReadabilityWrapper />
        </div>
        <div className="mt-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            This free <strong>readability checker</strong> analyzes your text using five established <strong>readability score</strong> formulas. All calculations run in your browser — your content stays completely private.
          </p>
        </div>

        <div className="mt-10 prose prose-slate dark:prose-invert max-w-none">
          <h2>How the Readability Scores Work</h2>
          <p>
            Readability scores quantify how easy or difficult a text is to read. Every formula uses
            sentence length and word complexity — measured in syllables — as its core inputs, because
            both strongly predict the cognitive effort required to process a piece of writing.
          </p>
          <p>
            <strong>Flesch Reading Ease</strong> scores text on a scale from 0 to 100. The formula is:
            206.835 − (1.015 × words per sentence) − (84.6 × syllables per word). Higher scores mean
            easier reading:
          </p>
          <ul>
            <li><strong>90–100:</strong> Very easy — understandable by a 5th grader</li>
            <li><strong>70–80:</strong> Easy — plain English, accessible to most adults</li>
            <li><strong>60–70:</strong> Standard — 7th–8th grade, the target for general web content</li>
            <li><strong>50–60:</strong> Fairly difficult — 10th–12th grade</li>
            <li><strong>30–50:</strong> Difficult — college level</li>
            <li><strong>0–30:</strong> Very difficult — professional or academic audiences</li>
          </ul>
          <p>
            <strong>Flesch-Kincaid Grade Level</strong> converts the same inputs into a US school grade.
            A score of 8 means an 8th grader can understand the text. Most US newspapers target grade
            6–8. Legal documents often score above grade 14 — which is one reason they are notoriously
            hard to understand.
          </p>
          <p>
            <strong>Gunning Fog Index</strong> estimates the years of formal education a reader needs to
            understand the text on the first pass. It penalizes "complex words" — those with three or more
            syllables. A score of 12 corresponds to a high school diploma; 17 corresponds to a college
            degree. Most business communication targets a Fog Index of 10–12.
          </p>
          <p>
            <strong>Coleman-Liau Index</strong> differs from the other formulas by using character count
            per word instead of syllable count. This makes it useful for languages where counting syllables
            programmatically is less reliable, and it tends to correlate well with Flesch-Kincaid in
            practice.
          </p>
          <p>
            <strong>SMOG Index</strong> (Simple Measure of Gobbledygook) counts complex words across
            30 sentences. It tends to produce higher (harder) scores than Flesch and is the preferred
            formula for healthcare and public health literacy assessments, where accuracy of difficulty
            estimation is critical.
          </p>

          <h2>Example: Rewriting Patient Instructions to Grade 6</h2>
          <p>
            A healthcare organization wants their post-discharge patient instructions accessible to
            virtually all adult patients, targeting a Flesch-Kincaid Grade Level of 6 or below. Their
            first draft scores:
          </p>
          <ul>
            <li>Flesch Reading Ease: 34 (difficult)</li>
            <li>Flesch-Kincaid Grade Level: 12.3</li>
            <li>Gunning Fog Index: 14.8</li>
          </ul>
          <p>
            The main culprits are long, compound sentences and medical terminology. A sentence like
            "Patients should be advised to contact their primary care physician or specialist in the
            event that any of the following symptoms present themselves within 72 hours of discharge"
            runs 33 words with multiple embedded clauses. Medical terms like "anticoagulation therapy"
            and "thromboembolism prophylaxis" carry three to six syllables each and penalize all the
            syllable-based formulas heavily.
          </p>
          <p>
            After one revision pass — breaking long sentences, replacing jargon with plain equivalents
            ("blood thinners" instead of "anticoagulation therapy"), and switching from passive to active
            voice — the scores become:
          </p>
          <ul>
            <li>Flesch Reading Ease: 68 (standard)</li>
            <li>Flesch-Kincaid Grade Level: 6.4</li>
            <li>Gunning Fog Index: 8.1</li>
          </ul>
          <p>
            The instructions now meet the organization's accessibility standard. Clinical accuracy was
            not compromised — only the phrasing changed.
          </p>

          <h2>Key Factors in Readability</h2>
          <p>
            <strong>Sentence length</strong> is the most powerful lever available. Cutting a 35-word
            sentence into two 17-word sentences improves every readability score simultaneously. Aim
            for an average sentence length of 15–20 words. Vary lengths for rhythm — a run of
            identically-sized sentences feels mechanical — but keep the average below 20.
          </p>
          <p>
            <strong>Word syllable count</strong> is the second major input. Replacing long words with
            shorter synonyms makes a measurable difference: "use" instead of "utilize," "buy" instead
            of "purchase," "end" instead of "terminate." Technical and specialized domains often require
            longer words, but every unnecessary syllable raises the difficulty score.
          </p>
          <p>
            <strong>Passive voice</strong> tends to produce longer, more complex sentences even when
            the underlying idea is simple. "The report was submitted by the team on Friday" (active:
            "The team submitted the report on Friday") is shorter, cleaner, and reads faster. Active
            constructions are almost always a readability improvement.
          </p>
          <p>
            <strong>Readability formulas have limits.</strong> A short sentence can still be confusing
            if it contains domain jargon, double negatives, or abstract nouns stacked together. The
            scores here are a useful diagnostic first pass — not a substitute for editing with a real
            reader in mind, and not a guarantee that a high score means the writing is clear.
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
