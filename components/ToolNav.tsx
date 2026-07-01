'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const tools = [
  { name: 'Word Counter', href: '/' },
  { name: 'Character Counter', href: '/character-counter' },
  { name: 'Reading Time', href: '/reading-time' },
  { name: 'Readability', href: '/readability' },
  { name: 'Keyword Density', href: '/keyword-density' },
  { name: 'Platform Limits', href: '/platform-limits' },
]

export default function ToolNav() {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleDark = () => {
    const html = document.documentElement
    const isDark = html.classList.toggle('dark')
    try {
      localStorage.setItem('wordcountertool-theme', isDark ? 'dark' : 'light')
    } catch {}
    setDark(isDark)
  }

  return (
    <nav className="flex items-center overflow-x-auto scrollbar-none border-b border-white/20 dark:border-slate-700/60">
      <div className="flex items-center min-w-max">
        {tools.map(tool => {
          const isActive = pathname === tool.href
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className={[
                'whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors border-b-2',
                isActive
                  ? 'border-white text-white'
                  : 'border-transparent text-white/70 hover:text-white hover:border-white/40',
              ].join(' ')}
            >
              {tool.name}
            </Link>
          )
        })}
      </div>
      <button
        onClick={toggleDark}
        aria-label="Toggle dark mode"
        className="ml-auto shrink-0 px-3 py-3 text-white/70 hover:text-white transition-colors text-lg"
      >
        {dark ? '☀' : '☽'}
      </button>
    </nav>
  )
}
