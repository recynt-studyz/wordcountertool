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
      </main>

      <AdBanner />
      <FAQ questions={faqs} />
      <AdBanner />
      <Footer />
    </>
  )
}
