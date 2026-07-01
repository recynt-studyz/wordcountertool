'use client'

import dynamic from 'next/dynamic'

const PlatformLimitsTool = dynamic(
  () => import('./PlatformLimitsTool'),
  { ssr: false }
)

export default function PlatformLimitsWrapper() {
  return <PlatformLimitsTool />
}
