import Link from 'next/link'
import ToolNav from './ToolNav'

export default function ToolHeader() {
  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-1">
        <Link
          href="/"
          className="inline-block text-white font-mono text-xs tracking-widest opacity-80 hover:opacity-100 transition-opacity"
        >
          wordcountertool.app
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <ToolNav />
      </div>
    </header>
  )
}
