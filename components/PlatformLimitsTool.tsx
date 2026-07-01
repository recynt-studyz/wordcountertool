'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import { PLATFORMS } from '@/lib/textAnalysis'

function progressColor(pct: number): string {
  if (pct < 80) return 'bg-green-500'
  if (pct <= 100) return 'bg-yellow-500'
  return 'bg-red-500'
}

export default function PlatformLimitsTool() {
  const [text, setText] = useState('')
  const [selectedPlatformId, setSelectedPlatformId] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const charCount = text.length

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
    if (!file || (!file.type.includes('text') && !file.name.endsWith('.txt'))) return
    const reader = new FileReader()
    reader.onload = evt => {
      const content = (evt.target?.result as string) || ''
      setText(content)
      if (textareaRef.current) { textareaRef.current.value = content; autoResize(textareaRef.current) }
    }
    reader.readAsText(file)
  }

  const selectedPlatform = selectedPlatformId
    ? PLATFORMS.find(p => p.id === selectedPlatformId) ?? null
    : null
  const activePct = selectedPlatform ? (charCount / selectedPlatform.limit) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Textarea */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 dark:text-slate-500">{charCount.toLocaleString()} characters</span>
          {text && (
            <button
              onClick={() => { setText(''); if (textareaRef.current) textareaRef.current.style.height = '300px' }}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 hover:border-red-300 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Active platform progress */}
        {selectedPlatform && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{selectedPlatform.name}</span>
              <span className={`text-xs font-bold ${activePct > 100 ? 'text-red-600 dark:text-red-400' : activePct >= 80 ? 'text-yellow-600 dark:text-yellow-400' : 'text-slate-600 dark:text-slate-400'}`}>
                {charCount.toLocaleString()} / {selectedPlatform.limit.toLocaleString()}
                {activePct > 100 && ' — Over limit!'}
              </span>
            </div>
            <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-150 rounded-full ${progressColor(activePct)}`}
                style={{ width: `${Math.min(100, activePct)}%` }}
              />
            </div>
          </div>
        )}

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
            placeholder="Type or paste your content here to check platform character limits..."
            className="w-full rounded-xl px-5 py-4 bg-[#FAFAFA] dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none font-sans text-base"
            style={{ minHeight: 300, lineHeight: 1.7 }}
          />
        </div>
      </div>

      {/* Platform buttons */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Select a Platform</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PLATFORMS.map(platform => {
            const isSelected = selectedPlatformId === platform.id
            const pct = (charCount / platform.limit) * 100
            const isOver = pct > 100
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatformId(isSelected ? null : platform.id)}
                className={[
                  'flex-shrink-0 flex flex-col items-center px-4 py-2.5 rounded-xl border text-xs font-medium transition-all',
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : isOver
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300',
                ].join(' ')}
              >
                <span>{platform.name}</span>
                <span className={`text-xs mt-0.5 ${isSelected ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'}`}>
                  {platform.limit.toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* All platforms table */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          All Platform Limits
        </h2>
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <th className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-400">Platform</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-600 dark:text-slate-400">Limit</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-600 dark:text-slate-400">Your Count</th>
                <th className="px-4 py-3 text-center font-semibold text-slate-600 dark:text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {PLATFORMS.map(platform => {
                const pct = (charCount / platform.limit) * 100
                const ok = charCount <= platform.limit
                const isActive = selectedPlatformId === platform.id
                return (
                  <tr
                    key={platform.id}
                    onClick={() => setSelectedPlatformId(isActive ? null : platform.id)}
                    className={[
                      'cursor-pointer transition-colors',
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50',
                    ].join(' ')}
                  >
                    <td className={`px-4 py-3 font-medium ${isActive ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}>
                      {platform.name}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500 dark:text-slate-400">
                      {platform.limit.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-slate-700 dark:text-slate-300">
                      {charCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {charCount === 0 ? (
                        <span className="text-slate-300 dark:text-slate-600">—</span>
                      ) : ok ? (
                        <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          OK
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          {(charCount - platform.limit).toLocaleString()} over
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
