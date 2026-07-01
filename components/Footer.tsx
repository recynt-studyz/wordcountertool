'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [showEmail, setShowEmail] = useState(false)

  const handleContact = () => {
    const parts = ['recyntstudyz', 'gmail', 'com']
    window.location.href = `mailto:${parts[0]}@${parts[1]}.${parts[2]}`
  }

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-8">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center mb-4">
          Free online word counter, character counter, readability checker, and keyword density
          analyzer. No signup, no upload, completely private.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-400 dark:text-slate-500">
          <span>wordcountertool.app</span>
          <span className="hidden sm:inline">·</span>
          <Link href="/privacy" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            Privacy Policy
          </Link>
          <span>·</span>
          <Link href="/about" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            About
          </Link>
          <span>·</span>
          <button
            onClick={handleContact}
            className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  )
}
