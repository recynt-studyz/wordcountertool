'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { countWords, computeReadability, type ReadabilityStats } from '@/lib/textAnalysis'

function ScoreBar({ score, max = 100, label, colorClass }: {
  score: number; max?: number; label: string; colorClass: string
}) {
  const pct = Math.min(100, (score / max) * 100)
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className={`text-sm font-bold ${colorClass}`}>{score.toFixed(1)}</span>
      </div>
      <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function gradeColor(grade: number): string {
  if (grade <= 8) return 'text-green-600 dark:text-green-400'
  if (grade <= 12) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

function fleschColor(score: number): string {
  if (score >= 60) return 'text-green-600 dark:text-green-400'
  if (score >= 30) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

function fleschLabel(score: number): string {
  if (score >= 90) return 'Very Easy (5th grade)'
  if (score >= 70) return 'Easy (6th grade)'
  if (score >= 60) return 'Standard (7th grade)'
  if (score >= 50) return 'Fairly Difficult (10th grade)'
  if (score >= 30) return 'Difficult (College)'
  return 'Very Confusing (Graduate)'
}

function gradeLabel(grade: number): string {
  if (grade <= 5) return 'Elementary School'
  if (grade <= 8) return 'Middle School'
  if (grade <= 10) return '9–10th Grade'
  if (grade <= 12) return 'High School'
  if (grade <= 14) return 'College Level'
  return 'Graduate Level'
}

const GRADE_SCALE = [
  { label: 'Elementary', max: 6 },
  { label: 'Middle School', max: 9 },
  { label: 'High School', max: 12 },
  { label: 'College', max: 15 },
  { label: 'Academic', max: 20 },
]

export default function ReadabilityTool() {
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [stats, setStats] = useState<ReadabilityStats | null>(null)
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
      setStats(computeReadability(text))
    }, 300)
    return () => clearTimeout(timer)
  }, [text])

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

  // Grade indicator position for the scale
  const fkGrade = stats?.fkGrade ?? 0
  const scaleMax = 20
  const scalePct = Math.min(100, (fkGrade / scaleMax) * 100)

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
            placeholder="Paste your text here to check readability..."
            className="w-full rounded-xl px-5 py-4 bg-[#FAFAFA] dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none font-sans text-base"
            style={{ minHeight: 300, lineHeight: 1.7 }}
          />
        </div>
      </div>

      {!stats ? (
        <div className="text-center py-8 text-slate-400 dark:text-slate-500">
          Add at least a sentence to see readability scores
        </div>
      ) : (
        <>
          {/* Flesch Reading Ease */}
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700">
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Flesch Reading Ease</h3>
              <span className={`text-3xl font-black ${fleschColor(stats.fleschEase)}`}>
                {stats.fleschEase.toFixed(1)}
              </span>
            </div>
            <p className={`text-sm font-medium mb-3 ${fleschColor(stats.fleschEase)}`}>
              {fleschLabel(stats.fleschEase)}
            </p>
            <div className="h-3 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${stats.fleschEase >= 60 ? 'bg-green-500' : stats.fleschEase >= 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${stats.fleschEase}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0 Very Difficult</span>
              <span>100 Very Easy</span>
            </div>
          </div>

          {/* Grade Level scale */}
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700">
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Grade Level Scale</h3>
              <span className={`text-xl font-bold ${gradeColor(fkGrade)}`}>Grade {fkGrade.toFixed(1)}</span>
            </div>
            <p className={`text-sm font-medium mb-3 ${gradeColor(fkGrade)}`}>{gradeLabel(fkGrade)}</p>
            <div className="h-3 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden relative">
              <div
                className={`h-full rounded-full transition-all duration-500 ${fkGrade <= 8 ? 'bg-green-500' : fkGrade <= 12 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${scalePct}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              {GRADE_SCALE.map(s => <span key={s.label}>{s.label}</span>)}
            </div>
          </div>

          {/* All scores */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">All Readability Scores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700 space-y-4">
                <ScoreBar score={stats.fleschEase} max={100} label="Flesch Reading Ease (higher = easier)" colorClass={fleschColor(stats.fleschEase)} />
                <ScoreBar score={stats.fkGrade} max={20} label="Flesch-Kincaid Grade Level" colorClass={gradeColor(stats.fkGrade)} />
                <ScoreBar score={stats.gunningFog} max={20} label="Gunning Fog Index" colorClass={gradeColor(stats.gunningFog)} />
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700 space-y-4">
                <ScoreBar score={stats.colemanLiau} max={20} label="Coleman-Liau Index" colorClass={gradeColor(stats.colemanLiau)} />
                {stats.smogGrade !== null ? (
                  <ScoreBar score={stats.smogGrade} max={20} label="SMOG Grade" colorClass={gradeColor(stats.smogGrade)} />
                ) : (
                  <div className="text-xs text-slate-400 dark:text-slate-500 italic py-2">SMOG Grade requires 30+ sentences</div>
                )}
              </div>
            </div>
          </div>

          {/* Detail stats */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Text Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Avg words / sentence', value: stats.avgWordsPerSentence.toFixed(1) },
                { label: 'Avg syllables / word', value: stats.avgSyllablesPerWord.toFixed(2) },
                { label: 'Complex words (3+ syl)', value: stats.complexWords.toLocaleString() },
                { label: 'Total syllables', value: stats.totalSyllables.toLocaleString() },
              ].map(s => (
                <div key={s.label} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                  <div className="text-xl font-bold text-slate-900 dark:text-white">{s.value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="border border-blue-100 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-3">Improvement Suggestions</h3>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
              {stats.avgWordsPerSentence > 20 && (
                <li>Your average sentence is {stats.avgWordsPerSentence.toFixed(0)} words — aim for under 20 for better readability.</li>
              )}
              {stats.avgWordsPerSentence <= 20 && (
                <li>Good sentence length — averaging {stats.avgWordsPerSentence.toFixed(0)} words per sentence.</li>
              )}
              {stats.complexWords > 0 && (
                <li>{stats.complexWords} complex words (3+ syllables) found. Simplify where possible for wider audiences.</li>
              )}
              {stats.fleschEase < 60 && (
                <li>Your Flesch score is {stats.fleschEase.toFixed(0)}. Shorter sentences and simpler words will improve it.</li>
              )}
              {stats.fleschEase >= 60 && (
                <li>Your text is accessible — a Flesch score of {stats.fleschEase.toFixed(0)} means most adults can read it easily.</li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
