import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#2563EB',
          borderRadius: '7px',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            color: 'white',
            fontFamily: 'sans-serif',
            fontWeight: 900,
            fontSize: '18px',
            lineHeight: 1,
            paddingBottom: '2px',
            borderBottom: '2px solid rgba(255,255,255,0.8)',
          }}
        >
          W
        </div>
      </div>
    ),
    { ...size },
  )
}
