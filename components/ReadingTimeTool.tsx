'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { countWords } from '@/lib/textAnalysis'

const SPEEDS = [
  { label: 'Slow reader', wpm: 150 },
  { label: 'Average reader', wpm: 200 },
  { label: 'Fast reader', wpm: 300 },
  { label: 'Speed reader', wpm: 450 },
]

const CONTENT_PRESETS = [
  { label: 'Blog Post', minWords: 800, maxWords: 2000 },
  { label: 'Novel Chapter', minWords: 3000, maxWords: 8000 },
  { label: 'Academic Paper', minWords: 4000, maxWords: 12000 },
  { label: 'Speech (5 min)', minWords: 650, maxWords: 750 },
  { label: 'Podcast Script', minWords: 1300, maxWords: 1500 },
]

function formatTime(minutes: number): string {
  if (minutes === 0) return '—'
  const wholeMin = Math.floor(minutes)
  const secs = Math.round((minutes - wholeMin) * 60)
  if (wholeMin === 0) return `${secs} sec`
  if (secs === 0) return `${wholeMin} min`
  return `${wholeMin} min ${secs} sec`
}

function TimeCard({ label, time, wpm }: { label: string; time: number; wpm?: number }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
      <div className="text-xl font-bold text-slate-900 dark:text-white">{formatTime(time)}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</div>
      {wpm && <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{wpm} WPM</div>}
    </div>
  )
}

export default function ReadingTimeTool() {
  const [text, setText] = useState('')
  const [customWpm, setCustomWpm] = useState(250)
  const [isDragOver, setIsDragOver] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const wordCount = useMemo(() => countWords(text), [text])

  const autoResize = useCallback((ta: HTMLTextAreaElement) => {
    ta.style.height = 'auto'
    ta.style.height = `${Math.max(300, ta.scrollHeight)}px`
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    autoResize(e.target)
  }

  const getTime = (wpm: number) => (wordCount === 0 ? 0 : wordCount / wpm)

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

  return (
    <div className="space-y-6">
      {/* Textarea */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {wordCount.toLocaleString()} words
          </span>
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
            placeholder="Paste your text here to calculate reading time..."
            className="w-full rounded-xl px-5 py-4 bg-[#FAFAFA] dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none font-sans text-base"
            style={{ minHeight: 300, lineHeight: 1.7 }}
          />
        </div>
      </div>

      {/* Reading speeds */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Reading Time by Speed
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SPEEDS.map(s => (
            <TimeCard key={s.wpm} label={s.label} time={getTime(s.wpm)} wpm={s.wpm} />
          ))}
        </div>
      </div>

      {/* Speaking / presentation */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Speaking &amp; Presentation
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <TimeCard label="Speaking time" time={getTime(130)} wpm={130} />
          <TimeCard label="Presentation (with pauses)" time={getTime(100)} wpm={100} />
          <TimeCard label="Your custom speed" time={getTime(customWpm)} wpm={customWpm} />
        </div>
      </div>

      {/* Custom WPM slider */}
      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            I read at {customWpm} WPM
          </span>
          <span className="text-sm text-blue-600 dark:text-blue-400 font-bold">
            {formatTime(getTime(customWpm))}
          </span>
        </div>
        <input
          type="range"
          min={100}
          max={600}
          step={10}
          value={customWpm}
          onChange={e => setCustomWpm(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-1">
          <span>100 WPM</span>
          <span>600 WPM</span>
        </div>
      </div>

      {/* Content presets */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Content Type Benchmarks
        </h2>
        <div className="space-y-3">
          {CONTENT_PRESETS.map(preset => {
            const inRange = wordCount >= preset.minWords && wordCount <= preset.maxWords
            const belowRange = wordCount < preset.minWords
            return (
              <div
                key={preset.label}
                className={[
                  'flex items-center gap-4 p-3 rounded-xl border text-sm',
                  inRange
                    ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                    : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800/50',
                ].join(' ')}
              >
                <span className="font-medium text-slate-700 dark:text-slate-300 w-36">{preset.label}</span>
                <span className="text-slate-400 dark:text-slate-500 text-xs">
                  {preset.minWords.toLocaleString()}–{preset.maxWords.toLocaleString()} words
                </span>
                <span
                  className={[
                    'ml-auto text-xs font-medium',
                    inRange
                      ? 'text-green-600 dark:text-green-400'
                      : belowRange
                      ? 'text-blue-500 dark:text-blue-400'
                      : 'text-slate-400 dark:text-slate-500',
                  ].join(' ')}
                >
                  {inRange ? 'In range' : belowRange ? `${(preset.minWords - wordCount).toLocaleString()} words short` : `${(wordCount - preset.maxWords).toLocaleString()} over`}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
