'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { getKeywords, getBigrams, getTrigrams, countWords, type KeywordItem } from '@/lib/textAnalysis'

type Tab = 'keywords' | 'bigrams' | 'trigrams'

export default function KeywordDensityTool() {
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [keywords, setKeywords] = useState<KeywordItem[]>([])
  const [bigrams, setBigrams] = useState<KeywordItem[]>([])
  const [trigrams, setTrigrams] = useState<KeywordItem[]>([])
  const [includeStopwords, setIncludeStopwords] = useState(false)
  const [targetKeyword, setTargetKeyword] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('keywords')
  const [isDragOver, setIsDragOver] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const autoResize = useCallback((ta: HTMLTextAreaElement) => {
    ta.style.height = 'auto'
    ta.style.height = `${Math.max(300, ta.scrollHeight)}px`
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    autoResize(e.target)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setWordCount(countWords(text))
      setKeywords(getKeywords(text, includeStopwords, 20))
      setBigrams(getBigrams(text, includeStopwords, 10))
      setTrigrams(getTrigrams(text, includeStopwords, 10))
    }, 300)
    return () => clearTimeout(timer)
  }, [text, includeStopwords])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (!file || (!file.type.includes('text') && !file.name.endsWith('.txt'))) return
    const reader = new FileReader()
    reader.onload = evt => {
      const content = (evt.target?.result as string) || ''
      setText(content)
      if (textareaRef.current) { textareaRef.current.value = content; autoResize(textareaRef.current) }
    }
    reader.readAsText(file)
  }

  // Target keyword analysis
  const targetAnalysis = (() => {
    if (!targetKeyword.trim() || !text.trim()) return null
    const kw = targetKeyword.trim().toLowerCase()
    const allWords = text.toLowerCase().match(/\b[a-z']+\b/g) || []
    const total = allWords.length
    const occurrences = allWords.filter(w => w === kw).length
    const density = total > 0 ? (occurrences / total) * 100 : 0
    const first100Words = text.toLowerCase().split(/\s+/).slice(0, 100).join(' ')
    const inFirst100 = first100Words.includes(kw)
    const ideal = density >= 0.5 && density <= 2.0
    return { occurrences, density, inFirst100, ideal }
  })()

  const activeItems =
    activeTab === 'bigrams' ? bigrams : activeTab === 'trigrams' ? trigrams : keywords
  const maxCount = activeItems[0]?.count || 1

  const TABS: { id: Tab; label: string }[] = [
    { id: 'keywords', label: 'Single Words' },
    { id: 'bigrams', label: '2-Word Phrases' },
    { id: 'trigrams', label: '3-Word Phrases' },
  ]

  return (
    <div className="space-y-6">
      {/* Textarea */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 dark:text-slate-500">{wordCount.toLocaleString()} words</span>
          {text && (
            <button
              onClick={() => { setText(''); if (textareaRef.current) textareaRef.current.style.height = '300px' }}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 hover:border-red-300 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <div
          onDragOver={e => { e.preventDefault(); setIsDragOver(true) }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`rounded-xl border-2 transition-colors ${isDragOver ? 'border-blue-400' : 'border-slate-200 dark:border-slate-600'}`}
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            placeholder="Paste your content here to analyze keyword density..."
            className="w-full rounded-xl px-5 py-4 bg-[#FAFAFA] dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none font-sans text-base"
            style={{ minHeight: 300, lineHeight: 1.7 }}
          />
        </div>
      </div>

      {/* Target keyword */}
      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3 flex-wrap">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 shrink-0">
            Target keyword:
          </label>
          <input
            type="text"
            value={targetKeyword}
            onChange={e => setTargetKeyword(e.target.value)}
            placeholder="e.g. content marketing"
            className="flex-1 min-w-0 px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {targetAnalysis && (
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-xl font-bold text-slate-900 dark:text-white">{targetAnalysis.occurrences}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Occurrences</div>
            </div>
            <div className="text-center">
              <div className={`text-xl font-bold ${targetAnalysis.ideal ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                {targetAnalysis.density.toFixed(2)}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Density</div>
            </div>
            <div className="text-center">
              <div className={`text-xl font-bold ${targetAnalysis.ideal ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {targetAnalysis.ideal ? 'Ideal' : 'Adjust'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">0.5–2% target</div>
            </div>
            <div className="text-center">
              <div className={`text-xl font-bold ${targetAnalysis.inFirst100 ? 'text-green-600 dark:text-green-400' : 'text-slate-400 dark:text-slate-500'}`}>
                {targetAnalysis.inFirst100 ? 'Yes' : 'No'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">In first 100 words</div>
            </div>
          </div>
        )}
      </div>

      {/* Stopwords toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIncludeStopwords(v => !v)}
          className={[
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none',
            includeStopwords ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600',
          ].join(' ')}
        >
          <span
            className={[
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm',
              includeStopwords ? 'translate-x-6' : 'translate-x-1',
            ].join(' ')}
          />
        </button>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          Include stopwords (the, a, is…)
        </span>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex gap-1 mb-4 border-b border-slate-200 dark:border-slate-700">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={[
                'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeItems.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">
            Add text above to see keyword analysis
          </p>
        ) : (
          <div className="space-y-2">
            {activeItems.map((kw, i) => (
              <div key={kw.word} className="flex items-center gap-3">
                <span className="text-xs text-slate-400 dark:text-slate-500 w-5 text-right">{i + 1}</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-40 truncate">
                  {kw.word}
                </span>
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(kw.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 w-10 text-right">{kw.count}×</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 w-14 text-right font-medium">
                  {kw.density.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
