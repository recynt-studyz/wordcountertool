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
            <div className="flex justify-center">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/90 bg-black/60 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg shadow-black/40">
                <span className="flex items-center gap-1.5">
                  <span>&#128274;</span>
                  <span>Private <span className="hidden sm:inline text-white/60">— your text never leaves your browser</span></span>
                </span>
                <span className="flex items-center gap-1.5"><span>&#9889;</span> Instant</span>
                <span className="flex items-center gap-1.5"><span>&#8734;</span> Unlimited</span>
                <span className="flex items-center gap-1.5"><span>&#10003;</span> Free</span>
              </div>
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

        <div className="mt-10 prose prose-slate dark:prose-invert max-w-none">
          <h2>How the Word Counter Works</h2>
          <p>
            This tool counts words by splitting your text on whitespace and counting each resulting
            token. Any sequence of non-whitespace characters separated by spaces, tabs, or line breaks
            counts as one word. A contraction like "don't" counts as one word. A hyphenated compound
            like "state-of-the-art" counts as one word. A bare number like "42,000" counts as one word.
            URLs count as one word regardless of length.
          </p>
          <p>
            Character counts come in two forms. <em>With spaces</em> counts every character in your
            text — spaces, tabs, and newlines included — and this is the figure most platforms use when
            enforcing character limits. <em>Without spaces</em> strips all whitespace first and counts
            only the visible, non-whitespace characters.
          </p>
          <p>
            Sentence detection splits on sentence-ending punctuation — periods, exclamation marks, and
            question marks — then counts segments that contain at least one non-whitespace character. An
            ellipsis is treated as one sentence boundary, not three. Paragraph counting is simpler: any
            block of text separated by at least one blank line registers as a separate paragraph.
          </p>
          <p>
            <strong>Why counts differ between tools:</strong> Microsoft Word and Google Docs handle edge
            cases differently. Word can treat "well-known" as two words; Google Docs typically counts it
            as one. Some tools strip punctuation before counting; others do not. A discrepancy of five to
            ten words between this counter and your word processor almost always comes down to hyphenation
            handling and URL treatment.
          </p>

          <h2>Example: From Over-Limit Draft to Submission-Ready Article</h2>
          <p>
            A freelance writer receives a 1,500-word article assignment from a content marketing agency.
            She drafts the piece and pastes it here before submitting. The counter reads: 1,623 words,
            9,841 characters with spaces, 31 sentences, 8 paragraphs. She is 123 words over the limit.
          </p>
          <p>
            She opens the keyword density section and finds the phrase "content marketing" appearing 18
            times in her 1,623-word draft — a density of 2.2%. Her client brief specified keeping the
            primary phrase under 2%. The bigram analysis also shows "digital marketing" at 11 occurrences
            and "marketing strategy" at 9. The topic cluster is dense throughout.
          </p>
          <p>
            She starts editing: cutting redundant transitions, tightening wordy phrases ("in order to"
            becomes "to"; "due to the fact that" becomes "because"), and removing a tangential section
            on industry history. After two passes, the counter reads 1,497 words and "content marketing"
            sits at 1.7% density. She submits on time and within spec.
          </p>
          <p>
            The same workflow applies across roles. <strong>Students</strong> paste essay drafts before
            submission to confirm they meet minimum and maximum word requirements. <strong>SEO
            writers</strong> keep primary keywords in the 0.5–2% density range to avoid over-optimization
            penalties. <strong>Journalists</strong> trim to column-inch word budgets before filing copy.
            <strong> Social media managers</strong> verify character counts against Twitter, LinkedIn, and
            Instagram limits before scheduling posts.
          </p>

          <h2>What Affects Your Word Count</h2>
          <p>
            A few elements shift word count in ways that can catch writers off guard:
          </p>
          <ul>
            <li><strong>Hyphenated compounds</strong> count as one word — "state-of-the-art" = 1, not 4.</li>
            <li><strong>Contractions</strong> count as one word — "don't," "it's," and "they're" each = 1.</li>
            <li><strong>Numbers</strong> count as one word regardless of size or formatting — "100,000" = 1.</li>
            <li><strong>URLs</strong> count as one word, no matter how long they are.</li>
            <li><strong>Attached punctuation</strong> is part of its word token — a trailing comma or period does not count separately.</li>
          </ul>
          <p>
            <strong>Character count</strong> is essential for platform publishing. Twitter limits posts to
            280 characters. SMS messages break at 160 characters. Instagram captions allow 2,200 characters
            but only surface the first 125 before a "more" tap is required. Knowing your exact character
            count before you post prevents a mid-sentence cutoff after the fact.
          </p>
          <p>
            <strong>Reading time</strong> is estimated at 200 words per minute — the median silent reading
            speed for adult non-fiction readers, drawn from research by Brysbaert (2019) covering 190
            studies and more than 17,000 participants. Fast readers average 300 WPM; readers working
            through technical or unfamiliar content average closer to 150 WPM. The 200 WPM default
            produces a conservative estimate that applies broadly across audiences.
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
