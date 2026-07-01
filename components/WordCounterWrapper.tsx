import dynamic from 'next/dynamic'

const WordCounterTool = dynamic(() => import('./WordCounterTool'), { ssr: false })

export default function WordCounterWrapper() {
  return <WordCounterTool />
}
