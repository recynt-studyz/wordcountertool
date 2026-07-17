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

        <div className="mt-10 prose prose-slate dark:prose-invert max-w-none">
          <h2>How the Character Counter Works</h2>
          <p>
            Every character you type or paste — letters, numbers, spaces, punctuation, line breaks, and
            emoji — is counted individually. The "characters with spaces" total is the raw length of your
            text string. The "characters without spaces" count removes all whitespace (spaces, tabs, and
            newlines) and counts what remains.
          </p>
          <p>
            <strong>Why platforms have different character limits:</strong> Twitter's 280-character cap
            originated in 2017 as a doubling of the original 140-character limit, which itself was derived
            from SMS. SMS is capped at 160 characters because German researcher Friedhelm Hillebrand
            established in 1985 that most messages, questions, and directives fit within that length —
            a finding that became the GSM standard adopted by every carrier worldwide. Instagram allows
            2,200 characters in captions because longer text supports storytelling and hashtag strategies.
            LinkedIn allows 3,000 characters per post to accommodate professional-length commentary and
            thought leadership content.
          </p>
          <p>
            <strong>ASCII vs. Unicode:</strong> In ASCII encoding, every character is exactly one byte.
            Unicode (UTF-8), which handles every language, symbol, and emoji, uses 1–4 bytes per character.
            The letter "A" is 1 byte; "é" is 2 bytes; "中" is 3 bytes; and most emoji are 4 bytes. When
            this tool shows byte count, it uses UTF-8 — the encoding standard of the web.
          </p>
          <p>
            <strong>Emoji and platform counting:</strong> Most platforms count standard emoji as 2
            characters because of how Unicode stores them in memory. Compound emoji — family groups or
            combinations assembled with Zero Width Joiners — can register as 6 or more characters on
            platforms using older Unicode handling. This counter shows the raw Unicode character count,
            which matches what modern platforms report.
          </p>

          <h2>Example: Fitting a Post Across Six Platforms</h2>
          <p>
            A social media manager drafts a product launch announcement for Twitter. Her first version
            runs 312 characters — 32 over the 280-character limit. She pastes it into the character
            counter and sees the breakdown: 312 characters with spaces, 261 without spaces, 3 sentences.
          </p>
          <p>
            The fix is straightforward: two filler openers ("We are excited to announce" and "We hope
            you will join us") consume 44 characters without adding meaning. She rewrites the opening as
            direct copy and checks again: 274 characters, with room for a hashtag.
          </p>
          <p>
            The same announcement needs to reach six platforms. Checking all limits at once:
          </p>
          <ul>
            <li><strong>Twitter/X (280):</strong> Core message fits at 274 characters.</li>
            <li><strong>Instagram caption (2,200):</strong> Full version fits; she adds three hashtag lines.</li>
            <li><strong>LinkedIn post (3,000):</strong> Full version fits; she expands with a paragraph of context.</li>
            <li><strong>Facebook post (63,206):</strong> No practical constraint.</li>
            <li><strong>TikTok caption (2,200):</strong> Full version fits.</li>
            <li><strong>SMS marketing (160):</strong> Requires a stripped-down version with a short URL.</li>
          </ul>
          <p>
            Using the Platform Limits tool below surfaces all these comparisons at once, so she can
            identify which platforms need a separate, shorter version before she starts writing them.
          </p>

          <h2>Key Factors in Character Counting</h2>
          <p>
            <strong>Invisible characters</strong> sometimes enter your text when pasting from formatted
            documents or rich text editors: zero-width spaces, non-breaking spaces, soft hyphens, and
            smart quotes all have character values and are included in the count. If your character total
            seems unexpectedly high for a short piece of text, hidden formatting characters from the
            source document are a common cause.
          </p>
          <p>
            <strong>URL treatment varies by platform.</strong> Twitter automatically shortens all URLs to
            23 characters via its t.co shortener, regardless of the original URL length — a 10-character
            URL and a 200-character URL both count as 23 characters in a tweet. On Instagram, links in
            captions are not clickable, so URLs count at full character length but serve no navigational
            purpose; most creators write "link in bio" instead.
          </p>
          <p>
            <strong>Newlines count as characters.</strong> A line break is one character on Unix-based
            systems, or two characters (carriage return + newline) in Windows line endings. On Twitter,
            line breaks count toward the 280-character limit. In SMS, they consume bytes in the message
            payload and can push a message into multi-part territory, doubling the delivery cost.
          </p>
          <p>
            <strong>Byte count vs. character count</strong> matters when working with databases, APIs,
            or systems that impose byte limits rather than character limits. A database field with a
            255-byte limit can hold 255 ASCII characters but only about 63 characters if each is a
            4-byte emoji. The byte count shown here helps identify cases where text that looks short
            may exceed a byte-based constraint.
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
