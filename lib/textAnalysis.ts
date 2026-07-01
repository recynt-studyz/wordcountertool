export const countWords = (text: string): number =>
  text.trim() === '' ? 0 : text.trim().split(/\s+/).length

export const countSentences = (text: string): number =>
  text.split(/[.!?]+/).filter(s => s.trim().length > 0).length

export const countParagraphs = (text: string): number =>
  text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length

export function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '')
  if (!word) return 0
  if (word.length <= 3) return 1
  word = word.replace(/e$/, '')
  const matches = word.match(/[aeiouy]+/g)
  return Math.max(1, matches ? matches.length : 1)
}

export const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
  'with', 'by', 'from', 'is', 'it', 'as', 'be', 'was', 'are', 'were', 'been',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
  'may', 'might', 'shall', 'can', 'that', 'this', 'these', 'those', 'i', 'you',
  'he', 'she', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your',
  'his', 'its', 'our', 'their', 'not', 'no', 'so', 'if', 'than', 'then',
  'when', 'where', 'who', 'which', 'what', 'how', 'about', 'up', 'out', 'into',
  'just', 'more', 'also', 'some', 'any', 'all', 'both', 'each', 'few', 'same',
  'only', 'over', 'after', 'before', 'between', 'very', 'too', 'still', 'here',
  'there', 'get', 'go', 'like', 'well', 'even', 'back', 'now', 'own', 'right',
  'through', 'such', 'much', 'new', 'time', 'year', 'way', 'two', 'long',
  'use', 'used', 'state', 'put', 'first', 'old', 'high', 'low', 'good', 'last',
  'big', 'since', 'most', 'see', 'make', 'take', 'come', 'know', 'think',
  'said', 'off', 'one', 'other', 'then', 'their', 'its', 'been', 'had',
])

export interface KeywordItem {
  word: string
  count: number
  density: number
}

export function getKeywords(text: string, includeStopwords = false, limit = 20): KeywordItem[] {
  const allWords = text.toLowerCase().match(/\b[a-z']{2,}\b/g) || []
  const filtered = includeStopwords
    ? allWords
    : allWords.filter(w => !STOPWORDS.has(w))
  const freq = new Map<string, number>()
  for (const word of filtered) {
    freq.set(word, (freq.get(word) || 0) + 1)
  }
  const total = allWords.length || 1
  return Array.from(freq.entries())
    .map(([word, count]) => ({ word, count, density: (count / total) * 100 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export function getBigrams(text: string, includeStopwords = false, limit = 10): KeywordItem[] {
  const words = text.toLowerCase().match(/\b[a-z']{2,}\b/g) || []
  const filtered = includeStopwords ? words : words.filter(w => !STOPWORDS.has(w))
  // We need consecutive bigrams from original word sequence, but filtering stopwords
  const allWords = text.toLowerCase().match(/\b[a-z']{2,}\b/g) || []
  const bigramFreq = new Map<string, number>()
  for (let i = 0; i < allWords.length - 1; i++) {
    const w1 = allWords[i]
    const w2 = allWords[i + 1]
    if (!includeStopwords && (STOPWORDS.has(w1) || STOPWORDS.has(w2))) continue
    const bigram = `${w1} ${w2}`
    bigramFreq.set(bigram, (bigramFreq.get(bigram) || 0) + 1)
  }
  const total = filtered.length || 1
  return Array.from(bigramFreq.entries())
    .map(([word, count]) => ({ word, count, density: (count / total) * 100 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export function getTrigrams(text: string, includeStopwords = false, limit = 10): KeywordItem[] {
  const allWords = text.toLowerCase().match(/\b[a-z']{2,}\b/g) || []
  const filtered = includeStopwords ? allWords : allWords.filter(w => !STOPWORDS.has(w))
  const trigramFreq = new Map<string, number>()
  for (let i = 0; i < allWords.length - 2; i++) {
    const w1 = allWords[i]
    const w2 = allWords[i + 1]
    const w3 = allWords[i + 2]
    if (!includeStopwords && (STOPWORDS.has(w1) || STOPWORDS.has(w2) || STOPWORDS.has(w3))) continue
    const trigram = `${w1} ${w2} ${w3}`
    trigramFreq.set(trigram, (trigramFreq.get(trigram) || 0) + 1)
  }
  const total = filtered.length || 1
  return Array.from(trigramFreq.entries())
    .map(([word, count]) => ({ word, count, density: (count / total) * 100 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export interface ReadabilityStats {
  fleschEase: number
  fkGrade: number
  gunningFog: number
  colemanLiau: number
  smogGrade: number | null
  avgWordsPerSentence: number
  avgSyllablesPerWord: number
  totalSyllables: number
  complexWords: number
  polysyllables: number
}

export function computeReadability(text: string): ReadabilityStats | null {
  const wordCount = countWords(text)
  const sentenceCount = countSentences(text)
  if (wordCount === 0 || sentenceCount === 0) return null

  const words = text.trim().split(/\s+/)
  const totalSyllables = words.reduce((sum, w) => sum + countSyllables(w), 0)
  const complexWords = words.filter(w => countSyllables(w) >= 3).length
  const polysyllables = complexWords

  const avgWordsPerSentence = wordCount / sentenceCount
  const avgSyllablesPerWord = totalSyllables / wordCount

  const fleschEase = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord
  const fkGrade = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59

  const gunningFog = 0.4 * (avgWordsPerSentence + 100 * (complexWords / wordCount))

  const letters = text.replace(/[^a-zA-Z]/g, '').length
  const L = (letters / wordCount) * 100
  const S = (sentenceCount / wordCount) * 100
  const colemanLiau = 0.0588 * L - 0.296 * S - 15.8

  const smogGrade =
    sentenceCount >= 30
      ? 3 + Math.sqrt(polysyllables * (30 / sentenceCount))
      : null

  return {
    fleschEase: Math.max(0, Math.min(100, fleschEase)),
    fkGrade: Math.max(0, fkGrade),
    gunningFog: Math.max(0, gunningFog),
    colemanLiau: Math.max(0, colemanLiau),
    smogGrade,
    avgWordsPerSentence,
    avgSyllablesPerWord,
    totalSyllables,
    complexWords,
    polysyllables,
  }
}

export const PLATFORMS = [
  { id: 'twitter', name: 'Twitter/X', limit: 280 },
  { id: 'instagram-caption', name: 'Instagram Caption', limit: 2200 },
  { id: 'instagram-bio', name: 'Instagram Bio', limit: 150 },
  { id: 'linkedin-post', name: 'LinkedIn Post', limit: 3000 },
  { id: 'linkedin-bio', name: 'LinkedIn Bio', limit: 220 },
  { id: 'youtube-title', name: 'YouTube Title', limit: 100 },
  { id: 'youtube-description', name: 'YouTube Description', limit: 5000 },
  { id: 'tiktok-caption', name: 'TikTok Caption', limit: 2200 },
  { id: 'sms', name: 'SMS', limit: 160 },
  { id: 'meta-title', name: 'Meta Title', limit: 60 },
  { id: 'meta-description', name: 'Meta Description', limit: 160 },
] as const

export type PlatformId = (typeof PLATFORMS)[number]['id']
