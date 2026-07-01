'use client'

import dynamic from 'next/dynamic'

const ReadingTimeTool = dynamic(
  () => import('./ReadingTimeTool'),
  { ssr: false }
)

export default function ReadingTimeWrapper() {
  return <ReadingTimeTool />
}
