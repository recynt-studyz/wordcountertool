import dynamic from 'next/dynamic'

const CharacterCounterTool = dynamic(() => import('./CharacterCounterTool'), { ssr: false })

export default function CharacterCounterWrapper() {
  return <CharacterCounterTool />
}
