'use client'

import dynamic from 'next/dynamic'

const KeywordDensityTool = dynamic(
  () => import('./KeywordDensityTool'),
  { ssr: false }
)

export default function KeywordDensityWrapper() {
  return <KeywordDensityTool />
}
