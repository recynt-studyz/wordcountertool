import dynamic from 'next/dynamic'

const ReadabilityTool = dynamic(() => import('./ReadabilityTool'), { ssr: false })

export default function ReadabilityWrapper() {
  return <ReadabilityTool />
}
