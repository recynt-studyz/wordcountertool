'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { PLATFORMS } from '@/lib/textAnalysis'

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
      <div className="text-2xl font-bold text-slate-900 dark:text-white truncate">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-tight">{label}</div>
    </div>
  )
}

function progressColor(pct: number): string {
  if (pct < 80) return 'bg-green-500'
  if (pct <= 100) return 'bg-yellow-500'
  return 'bg-red-500'
}

export default function CharacterCounterTool() {
  const [text, setText] = useState('')
  const [selectedPlatformId, setSelectedPlatformId] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const stats = useMemo(() => {
    const withSpaces = text.length
    const withoutSpaces = text.replace(/\s/g, '').length
    const bytes = new TextEncoder().encode(text).length
    const letters = text.replace(/[^a-zA-Z]/g, '').length
    const numbers = text.replace(/[^0-9]/g, '').length
    const special = text.replace(/[a-zA-Z0-9\s]/g, '').length
    const uppercase = text.replace(/[^A-Z]/g, '').length
    const lowercase = text.replace(/[^a-z]/g, '').length
    return { withSpaces, withoutSpaces, bytes, letters, numbers, special, uppercase, lowercase }
  }, [text])

  const autoResize = useCallback((ta: HTMLTextAreaElement) => {
    ta.style.height = 'auto'
    ta.style.height = `${Math.max(300, ta.scrollHeight)}px`
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    autoResize(e.target)
  }

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

  const selectedPlatform = selectedPlatformId
    ? PLATFORMS.find(p => p.id === selectedPlatformId) ?? null
    : null
  const platformPct = selectedPlatform ? (stats.withSpaces / selectedPlatform.limit) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Textarea */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 dark:text-slate-500">Drop a .txt file to load</span>
          {text && (
            <button
              onClick={() => {
                setText('')
                if (textareaRef.current) textareaRef.current.style.height = '300px'
              }}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 hover:border-red-300 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {selectedPlatform && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{selectedPlatform.name}</span>
              <span className={`text-xs font-bold ${platformPct > 100 ? 'text-red-600 dark:text-red-400' : platformPct >= 80 ? 'text-yellow-600 dark:text-yellow-400' : 'text-slate-600 dark:text-slate-400'}`}>
                {stats.withSpaces.toLocaleString()} / {selectedPlatform.limit.toLocaleString()} chars
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

        <div
          onDragOver={e => { e.preventDefault(); setIsDragOver(true) }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`relative rounded-xl border-2 transition-colors ${isDragOver ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-600'}`}
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            placeholder="Start typing or paste your text here..."
            spellCheck
            className="w-full rounded-xl px-5 py-4 bg-[#FAFAFA] dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none font-sans text-base leading-relaxed"
            style={{ minHeight: 300, lineHeight: 1.7 }}
          />
        </div>
      </div>

      {/* Stats */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Character Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Characters (with spaces)" value={stats.withSpaces.toLocaleString()} />
          <StatCard label="Characters (no spaces)" value={stats.withoutSpaces.toLocaleString()} />
          <StatCard label="Bytes (UTF-8)" value={stats.bytes.toLocaleString()} />
          <StatCard label="Letters only" value={stats.letters.toLocaleString()} />
          <StatCard label="Numbers only" value={stats.numbers.toLocaleString()} />
          <StatCard label="Special characters" value={stats.special.toLocaleString()} />
          <StatCard label="Uppercase letters" value={stats.uppercase.toLocaleString()} />
          <StatCard label="Lowercase letters" value={stats.lowercase.toLocaleString()} />
        </div>
      </div>

      {/* Platform limits */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Platform Character Limits</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PLATFORMS.map(platform => {
            const isSelected = selectedPlatformId === platform.id
            const pct = (stats.withSpaces / platform.limit) * 100
            const isOver = pct > 100
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatformId(isSelected ? null : platform.id)}
                className={[
                  'flex-shrink-0 flex flex-col items-center px-4 py-2 rounded-xl border text-xs font-medium transition-all',
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600'
                    : isOver
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300',
                ].join(' ')}
              >
                <span>{platform.name}</span>
                <span className={`text-xs mt-0.5 font-normal ${isSelected ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'}`}>
                  {platform.limit.toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
