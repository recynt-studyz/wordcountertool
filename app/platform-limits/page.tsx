import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import PlatformLimitsWrapper from '@/components/PlatformLimitsWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Social Media Character Limits — Platform Checker',
  description:
    'Check character limits for Twitter, Instagram, LinkedIn, YouTube, TikTok and more simultaneously. Free social media character limit checker.',
  alternates: { canonical: 'https://wordcountertool.app/platform-limits' },
}

const faqs = [
  {
    question: 'How many characters can a Twitter post be?',
    answer:
      'Twitter/X allows up to 280 characters per post for standard accounts. URLs are shortened to 23 characters regardless of their actual length and count toward the 280-character limit. Twitter Blue subscribers may have access to longer posts.',
  },
  {
    question: 'What is the Instagram caption character limit?',
    answer:
      'Instagram captions can be up to 2,200 characters long. However, only the first 125 characters are visible before the "more" link in the feed, so put your most important content and call-to-action at the beginning.',
  },
  {
    question: 'How long can a LinkedIn post be?',
    answer:
      'LinkedIn posts allow up to 3,000 characters. LinkedIn articles are much longer. For feed posts, the first 200–250 characters show before a "see more" cutoff, so front-load your hook. LinkedIn bios are limited to 220 characters.',
  },
  {
    question: 'What is the ideal meta description length?',
    answer:
      'Google typically displays 150–160 characters of a meta description in search results. Keep yours between 120–158 characters to avoid truncation. The ideal <meta title> length is 50–60 characters to display fully in search results.',
  },
  {
    question: 'How many characters are allowed in a TikTok caption?',
    answer:
      'TikTok allows up to 2,200 characters in video captions. Including relevant hashtags in your caption is important for discovery. The first line of your caption is most prominent, so make it compelling.',
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
      name: 'Social Media Character Limit Checker',
      url: 'https://wordcountertool.app/platform-limits',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'HowTo',
      name: 'How to check social media character limits',
      step: [
        { '@type': 'HowToStep', name: 'Paste your content', text: 'Type or paste your social media post, bio, or caption into the text area.' },
        { '@type': 'HowToStep', name: 'Select a platform', text: 'Click on a platform like Twitter/X, Instagram, or LinkedIn to see a progress bar toward the character limit.' },
        { '@type': 'HowToStep', name: 'View all limits at once', text: 'The table below shows your character count against all platform limits simultaneously, with OK/over status for each.' },
      ],
    },
  ],
}

export default function PlatformLimitsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="relative bg-cover bg-slate-800" style={{ backgroundImage: "url('/herobgwct.webp')", backgroundPosition: 'center 70%' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-white dark:to-slate-900" />
        <div className="relative z-10">
          <ToolHeader />
          <div className="max-w-5xl mx-auto px-4 pt-6 pb-20 text-center text-white">
            <h1 className="text-3xl md:text-4xl font-black mb-2">Social Media Character Limits</h1>
            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto">
              Check <strong className="text-white">character limits</strong> for Twitter, Instagram, LinkedIn, YouTube, TikTok and more — all at once. Free <strong className="text-white">social media limits</strong> checker.
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
          <PlatformLimitsWrapper />
        </div>
        <div className="mt-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          <p>
            This free <strong>character limits</strong> checker shows your content length against all major <strong>social media limits</strong> simultaneously. All processing happens in your browser — nothing is sent to any server. Perfect for content marketers and social media managers who need to check multiple platforms at once.
          </p>
        </div>

        <div className="mt-10 prose prose-slate dark:prose-invert max-w-none">
          <h2>Why Social Platforms Have Different Character Limits</h2>
          <p>
            Every major social platform enforces character limits as a deliberate product decision that
            shapes the type of content users create, read, and share. These limits reflect each platform's
            core use case: quick updates, professional commentary, short-form video captions, or
            long-form storytelling.
          </p>
          <p>
            <strong>Twitter/X — 280 characters:</strong> Twitter launched in 2006 with a 140-character
            limit derived from SMS. Standard SMS messages hold 160 characters, and Twitter's founders
            reserved 20 characters for the sender's username. In 2017, Twitter doubled the limit to 280
            after data showed non-English speakers — who could express more complex ideas in fewer
            characters in their languages — were hitting the ceiling far less often than English speakers,
            creating an unequal experience. The 280-character limit fits roughly 40–50 English words.
          </p>
          <p>
            <strong>SMS — 160 characters:</strong> The 160-character SMS limit dates to 1985, when
            German researcher Friedhelm Hillebrand sat at his typewriter and typed random sentences,
            questions, and directives to test how long typical human messages were. He found that nearly
            all of them fit within 160 characters — a surprisingly consistent finding that was later
            incorporated into the GSM standard and has governed text messaging ever since.
          </p>
          <p>
            <strong>Instagram — 2,200 characters (captions), 150 characters (bio):</strong> Instagram's
            longer caption limit supports storytelling, multi-hashtag strategies, and engagement tactics
            that require more than a sentence. However, only the first 125 characters appear in the feed
            before a "more" tap is required, making the effective above-the-fold limit much shorter.
          </p>
          <p>
            <strong>LinkedIn — 3,000 characters (posts), 220 characters (headline):</strong> LinkedIn's
            higher limit reflects its professional context. Longer posts covering industry analysis,
            career lessons, and thought leadership perform well on the platform. The first 200–250
            characters show in the feed before a "see more" truncation.
          </p>

          <h2>Example: One Message Adapted for Six Platforms</h2>
          <p>
            A content marketing manager at a software company needs to announce a new product integration.
            She writes a core message: 230 characters. She pastes it into the platform limits checker and
            reviews the results across all platforms simultaneously:
          </p>
          <ul>
            <li><strong>Twitter/X (280):</strong> Fits with 50 characters to spare — she adds a second hashtag.</li>
            <li><strong>Instagram caption (2,200):</strong> Fits easily — she expands with a three-paragraph story about the partnership, reaching 480 characters.</li>
            <li><strong>LinkedIn post (3,000):</strong> She writes a professional version at 620 characters with a personal note about why the integration matters to the team.</li>
            <li><strong>Facebook post (63,206):</strong> No constraint — she uses the full LinkedIn version.</li>
            <li><strong>TikTok caption (2,200):</strong> Full Instagram version fits without changes.</li>
            <li><strong>SMS marketing (160):</strong> The 230-character original is too long. She creates a separate 88-character version with a shortened URL.</li>
          </ul>
          <p>
            One core message becomes five distinct platform-optimized variants. The simultaneous comparison
            view makes it immediately clear which platforms require a rewrite versus which can use the
            original or an expanded version.
          </p>
          <p>
            The same workflow applies for meta descriptions (ideal: 120–158 characters), YouTube
            descriptions (5,000-character limit, but most viewers see only the first 157 before "show
            more"), and email subject lines (50–60 characters to display fully in most email clients).
          </p>

          <h2>Key Factors When Working With Platform Limits</h2>
          <p>
            <strong>Hashtags and mentions count as characters.</strong> On Twitter, "#marketing" is 10
            characters and "@brandname" counts at full character length. A post with three hashtags and
            two mentions can consume 60–80 characters before a single word of the main message is written.
            Plan your character budget with these elements included.
          </p>
          <p>
            <strong>URL treatment varies by platform.</strong> Twitter shortens all URLs to exactly 23
            characters via its t.co shortener, regardless of the original URL length. On Instagram, links
            in captions are not clickable, so the URL length counts in full but provides no value — most
            creators use "link in bio" instead of pasting a URL. LinkedIn renders a link preview card
            but still counts the URL toward the character limit.
          </p>
          <p>
            <strong>Emoji count differently on some platforms.</strong> Most platforms count emoji as
            2 characters due to Unicode encoding. Compound emoji assembled with Zero Width Joiners —
            such as family group emoji — can register as 6–16 characters on platforms using older
            Unicode counting methods. If emoji are central to your post, verify the count on the
            platform directly after checking here.
          </p>
          <p>
            <strong>Line breaks affect formatting behavior differently.</strong> LinkedIn treats line
            breaks as significant for visual formatting, and posts with line breaks between short
            paragraphs perform better for readability in the feed. Twitter converts multiple line
            breaks to single breaks. Instagram preserves line breaks in the full caption view but not
            in the truncated preview, which can make hashtag blocks appear at the wrong place if you
            are not careful about line break placement.
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
