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

        <div className="mt-10 prose prose-slate dark:prose-invert max-w-none">
          <h2>How Reading Time Is Calculated</h2>
          <p>
            Reading time is calculated by dividing your total word count by a reading speed in words per
            minute (WPM). The formula is simple: reading time (minutes) = word count ÷ reading speed.
            A 1,200-word article at 200 WPM takes 6 minutes to read; at 300 WPM, the same article takes
            4 minutes.
          </p>
          <p>
            The average adult reads non-fiction prose at 200–250 words per minute during silent reading.
            Research by Brysbaert (2019), covering 190 studies and more than 17,000 readers, placed the
            median English reading speed at 238 WPM. This tool uses 200 WPM as a conservative default
            that accounts for readers who pause to process unfamiliar concepts or re-read dense passages.
          </p>
          <p>
            Reading speed varies substantially by context:
          </p>
          <ul>
            <li><strong>Slow (150 WPM):</strong> Careful reading of technical, legal, or academic content where comprehension is critical</li>
            <li><strong>Average (200–238 WPM):</strong> General non-fiction, blog posts, news articles</li>
            <li><strong>Fast (300 WPM):</strong> Familiar subjects, light reading, skimming for key points</li>
            <li><strong>Speed reading (600+ WPM):</strong> Specialized technique with significantly reduced comprehension</li>
          </ul>
          <p>
            <strong>Content type affects pace.</strong> A 1,000-word programming tutorial takes longer to
            read than a 1,000-word lifestyle article because readers slow down when processing unfamiliar
            syntax, instructions they need to follow, or data they need to verify. The reading time estimate
            here is calibrated for general prose; add 30–50% for dense technical writing.
          </p>
          <p>
            <strong>Images add time.</strong> Medium's algorithm adds 12 seconds per image to its reading
            time estimates. A 2,000-word article with 10 images would add roughly 2 minutes over the
            baseline text-only estimate.
          </p>
          <p>
            <strong>Speaking time</strong> uses 130 WPM — the average conversational delivery rate for
            prepared presentations and speeches. Audiobooks typically run 150–160 WPM. Rapid conversation
            reaches 170–200 WPM. For keynotes and recorded narration, 130 WPM is the standard planning
            figure used by professional speakers.
          </p>

          <h2>Example: Planning a Long-Form Guide and a Video Script</h2>
          <p>
            A blogger publishes comprehensive home renovation guides. Her latest piece covers 12 projects
            across 3,200 words. She pastes it into the reading time calculator and sees:
          </p>
          <ul>
            <li>Reading time at 150 WPM (slow): 21 minutes</li>
            <li>Reading time at 200 WPM (average): 16 minutes</li>
            <li>Reading time at 300 WPM (fast): 10.7 minutes</li>
            <li>Speaking time at 130 WPM: 24.6 minutes</li>
          </ul>
          <p>
            At 16 minutes, the guide is solidly in long-form territory. Research from Medium's data team
            found that posts with 7–10 minute reading times generate the highest reader engagement —
            readers who reach the 7-minute mark tend to read to completion. She decides to add a table
            of contents and clear section headings so readers can jump directly to the projects they care
            about, reducing the felt commitment without cutting words.
          </p>
          <p>
            The speaking time estimate — 24.6 minutes — tells her the guide read aloud would produce a
            25-minute video. That is too long for YouTube DIY content, where retention drops sharply after
            15 minutes. She trims the script to 2,100 words, bringing the speaking time to just under
            16 minutes and within YouTube's engagement sweet spot for in-depth tutorials.
          </p>
          <p>
            The same calculation helps podcasters plan episode length, professors time lectures, and
            corporate trainers design modules that fit standard meeting blocks.
          </p>

          <h2>Key Factors That Affect Reading Time</h2>
          <p>
            <strong>Content complexity</strong> is the variable the WPM formula cannot fully capture.
            Simple narrative prose reads at 250+ WPM; dense academic writing can drop below 100 WPM for
            readers outside the field. When accuracy matters, test your content with a sample from your
            actual target audience and time them directly.
          </p>
          <p>
            <strong>Formatting reduces effective reading time.</strong> Text broken into short paragraphs,
            bullet points, and clear headers reads faster because readers can scan to find what they need.
            A well-formatted 2,000-word article reads faster in practice than a solid wall of text at the
            same word count, even though the raw estimate is identical.
          </p>
          <p>
            <strong>Mobile vs. desktop reading:</strong> Research from the Nielsen Norman Group found
            that people read approximately 20% slower on mobile screens than on desktop monitors. If your
            primary audience reads on phones — as is typical for social content and newsletters — adjust
            your reading time expectations upward by 20% and favor shorter paragraphs and tighter sentences.
          </p>
          <p>
            <strong>Reading time and SEO:</strong> Google does not use reading time as a direct ranking
            signal, but content depth — which correlates with longer reading times — does affect rankings
            indirectly. Articles in the 1,500–2,500-word range (7–12 minutes) consistently earn more
            backlinks and rank for more long-tail queries than shorter content, according to multiple
            large-scale SEO studies.
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
