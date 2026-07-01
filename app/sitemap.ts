import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wordcountertool.app'
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/character-counter`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/reading-time`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/readability`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/keyword-density`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/platform-limits`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ]
}
