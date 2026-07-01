'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  countWords,
  countSentences,
  countParagraphs,
  computeReadability,
  getKeywords,
  PLATFORMS,
  type KeywordItem,
  type ReadabilityStats,
} from '@/lib/textAnalysis'

interface ExtStats {
  paragraphs: number
  readingTime: number
  speakingTime: number
  uniqueWords: number
}

const PLATFORM_LIST = PLATFORMS

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string
  value: string | number
  sub?: string
  color?: string
}) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
      <div className={`text-2xl font-bold truncate ${color ?? 'text-slate-900 dark:text-white'}`}>
        {value}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-tight">{label}</div>
      {sub && <div className={`text-xs mt-1 font-medium ${color ?? 'text-slate-500 dark:text-slate-400'}`}>{sub}</div>}
    </div>
  )
}

function gradeLabel(grade: number): string {
  if (grade <= 6) return 'Elementary'
  if (grade <= 8) return 'Middle School'
  if (grade <= 10) return '9–10th Grade'
  if (grade <= 12) return 'High School'
  if (grade <= 14) return 'College'
  return 'Graduate'
}

function fleschLabel(score: number): string {
  if (score >= 70) return 'Easy'
  if (score >= 60) return 'Standard'
  if (score >= 50) return 'Fairly Difficult'
  if (score >= 30) return 'Difficult'
  return 'Very Difficult'
}

function fleschColor(score: number): string {
  if (score >= 60) return 'text-green-600 dark:text-green-400'
  if (score >= 30) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

function progressColor(pct: number): string {
  if (pct < 80) return 'bg-green-500'
  if (pct <= 100) return 'bg-yellow-500'
  return 'bg-red-500'
}

export default function WordCounterTool() {
  const [text, setText] = useState('')
  const [isMonospace, setIsMonospace] = useState(false)
  const [selectedPlatformId, setSelectedPlatformId] = useState<string | null>(null)
  const [wordGoal, setWordGoal] = useState(0)
  const [wordGoalInput, setWordGoalInput] = useState('')
  const [showKeywords, setShowKeywords] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [extStats, setExtStats] = useState<ExtStats>({
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0,
    uniqueWords: 0,
  })
  const [readability, setReadability] = useState<ReadabilityStats | null>(null)
  const [keywords, setKeywords] = useState<KeywordItem[]>([])

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Load word goal from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wordcountertool-goal')
      if (saved) {
        const n = parseInt(saved, 10)
        if (n > 0) {
          setWordGoal(n)
          setWordGoalInput(String(n))
        }
      }
    } catch {}
  }, [])

  // Instant stats
  const wordCount = useMemo(() => countWords(text), [text])
  const charsWithSpaces = text.length
  const charsWithoutSpaces = useMemo(() => text.replace(/\s/g, '').length, [text])
  const sentences = useMemo(() => (text.trim() ? countSentences(text) : 0), [text])

  // Debounced expensive stats
  useEffect(() => {
    const timer = setTimeout(() => {
      const paragraphs = text.trim() ? countParagraphs(text) : 0
      const wc = countWords(text)
      const readingTime = wc === 0 ? 0 : Math.ceil(wc / 200)
      const speakingTime = wc === 0 ? 0 : Math.ceil(wc / 130)
      const words = text.toLowerCase().match(/\b[a-z']+\b/g) || []
      const uniqueWords = new Set(words).size
      setExtStats({ paragraphs, readingTime, speakingTime, uniqueWords })
      setReadability(computeReadability(text))
      setKeywords(getKeywords(text, false, 10))
    }, 300)
    return () => clearTimeout(timer)
  }, [text])

  const autoResize = useCallback((ta: HTMLTextAreaElement) => {
    ta.style.height = 'auto'
    ta.style.height = `${Math.max(300, ta.scrollHeight)}px`
  }, [])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    autoResize(e.target)
  }

  const handleClear = () => {
    setText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = '300px'
      textareaRef.current.focus()
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => setIsDragOver(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (!file) return
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const reader = new FileReader()
      reader.onload = evt => {
        const content = (evt.target?.result as string) || ''
        setText(content)
        if (textareaRef.current) {
          textareaRef.current.value = content
          autoResize(textareaRef.current)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const n = parseInt(wordGoalInput, 10)
    const goal = isNaN(n) || n <= 0 ? 0 : n
    setWordGoal(goal)
    try {
      if (goal > 0) {
        localStorage.setItem('wordcountertool-goal', String(goal))
      } else {
        localStorage.removeItem('wordcountertool-goal')
      }
    } catch {}
  }

  const selectedPlatform = selectedPlatformId
    ? PLATFORM_LIST.find(p => p.id === selectedPlatformId) ?? null
    : null
  const platformPct = selectedPlatform
    ? (charsWithSpaces / selectedPlatform.limit) * 100
    : 0
  const goalPct = wordGoal > 0 ? Math.min(100, (wordCount / wordGoal) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Textarea section */}
      <div className="relative">
        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setIsMonospace(v => !v)}
            className={[
              'text-xs px-3 py-1.5 rounded-lg border transition-colors font-medium',
              isMonospace
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400',
            ].join(' ')}
          >
            Monospace
          </button>
          <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto">
            Drop a .txt file to load
          </span>
          {text && (
            <button
              onClick={handleClear}
              aria-label="Clear text"
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </div>

        {/* Platform progress bar */}
        {selectedPlatform && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {selectedPlatform.name}
              </span>
              <span
                className={`text-xs font-bold ${
                  platformPct > 100
                    ? 'text-red-600 dark:text-red-400'
                    : platformPct >= 80
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {charsWithSpaces.toLocaleString()} / {selectedPlatform.limit.toLocaleString()} chars
                {platformPct > 100 && ' — Over limit!'}
              </span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-150 rounded-full ${progressColor(platformPct)}`}
                style={{ width: `${Math.min(100, platformPct)}%` }}
              />
            </div>
          </div>
        )}

        {/* Textarea */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={[
            'relative rounded-xl border-2 transition-colors',
            isDragOver
              ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
              : 'border-slate-200 dark:border-slate-600',
          ].join(' ')}
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder="Start typing or paste your text here..."
            spellCheck
            className={[
              'w-full rounded-xl px-5 py-4 bg-[#FAFAFA] dark:bg-slate-800 text-slate-800 dark:text-slate-100',
              'placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none',
              'leading-relaxed transition-colors',
              isMonospace ? 'font-mono text-sm' : 'font-sans text-base',
            ].join(' ')}
            style={{ minHeight: 300, lineHeight: 1.7 }}
          />
          {isDragOver && (
            <div className="absolute inset-0 rounded-xl flex items-center justify-center pointer-events-none">
              <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg">
                Drop file to load
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Dashboard */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Stats
        </h2>

        {/* Row 1 — instant */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          <StatCard label="Words" value={wordCount.toLocaleString()} />
          <StatCard label="Characters (with spaces)" value={charsWithSpaces.toLocaleString()} />
          <StatCard label="Characters (no spaces)" value={charsWithoutSpaces.toLocaleString()} />
          <StatCard label="Sentences" value={sentences.toLocaleString()} />
        </div>

        {/* Row 2 — debounced */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          <StatCard label="Paragraphs" value={extStats.paragraphs.toLocaleString()} />
          <StatCard
            label="Reading time"
            value={extStats.readingTime === 0 ? '—' : `${extStats.readingTime} min`}
            sub="at 200 WPM"
          />
          <StatCard
            label="Speaking time"
            value={extStats.speakingTime === 0 ? '—' : `${extStats.speakingTime} min`}
            sub="at 130 WPM"
          />
          <StatCard label="Unique words" value={extStats.uniqueWords.toLocaleString()} />
        </div>

        {/* Row 3 — readability */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            label="Flesch Reading Ease"
            value={readability ? readability.fleschEase.toFixed(1) : '—'}
            sub={readability ? fleschLabel(readability.fleschEase) : undefined}
            color={readability ? fleschColor(readability.fleschEase) : undefined}
          />
          <StatCard
            label="Flesch-Kincaid Grade"
            value={readability ? `Grade ${readability.fkGrade.toFixed(1)}` : '—'}
            sub={readability ? gradeLabel(readability.fkGrade) : undefined}
          />
          <StatCard
            label="Avg words / sentence"
            value={readability ? readability.avgWordsPerSentence.toFixed(1) : '—'}
          />
          <StatCard
            label="Avg syllables / word"
            value={readability ? readability.avgSyllablesPerWord.toFixed(2) : '—'}
          />
        </div>
      </div>

      {/* Platform Limits */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Platform Character Limits
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PLATFORM_LIST.map(platform => {
            const isSelected = selectedPlatformId === platform.id
            const pct = (charsWithSpaces / platform.limit) * 100
            const isOver = pct > 100
            return (
              <button
                key={platform.id}
                onClick={() =>
                  setSelectedPlatformId(isSelected ? null : platform.id)
                }
                className={[
                  'flex-shrink-0 flex flex-col items-center px-4 py-2 rounded-xl border text-xs font-medium transition-all',
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : isOver
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:border-red-400'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:text-blue-600',
                ].join(' ')}
              >
                <span>{platform.name}</span>
                <span
                  className={`text-xs mt-0.5 font-normal ${
                    isSelected ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {platform.limit.toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Keyword Density accordion */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowKeywords(v => !v)}
          className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <span>Top Keywords</span>
          <svg
            className={`w-4 h-4 text-slate-400 transition-transform ${showKeywords ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showKeywords && (
          <div className="px-5 pb-5 animate-fade-in">
            {keywords.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-4">
                Type some text to see keyword analysis
              </p>
            ) : (
              <div className="space-y-2">
                {keywords.map(kw => (
                  <div key={kw.word} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-28 truncate">
                      {kw.word}
                    </span>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${Math.min(100, (kw.density / (keywords[0]?.density || 1)) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 w-20 text-right">
                      {kw.density.toFixed(1)}% ({kw.count})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Word Goal Tracker */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-5">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 shrink-0">
            Word Goal
          </span>
          <form onSubmit={handleGoalSubmit} className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={wordGoalInput}
              onChange={e => setWordGoalInput(e.target.value)}
              placeholder="e.g. 1000"
              className="w-28 px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Set
            </button>
            {wordGoal > 0 && (
              <button
                type="button"
                onClick={() => {
                  setWordGoal(0)
                  setWordGoalInput('')
                  try { localStorage.removeItem('wordcountertool-goal') } catch {}
                }}
                className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 hover:border-red-300 transition-colors"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {wordGoal > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>
                {wordCount.toLocaleString()} / {wordGoal.toLocaleString()} words
              </span>
              <span className="font-semibold">{goalPct.toFixed(1)}%</span>
            </div>
            <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  goalPct >= 100
                    ? 'bg-green-500'
                    : goalPct >= 80
                    ? 'bg-blue-500'
                    : 'bg-blue-400'
                }`}
                style={{ width: `${goalPct}%` }}
              />
            </div>
            {goalPct >= 100 && (
              <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                Goal reached!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
