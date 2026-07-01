import { ImageResponse } from 'next/og'

export const size = { width: 48, height: 48 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #1d4ed8, #2563EB)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          padding: '0 8px',
        }}>
          {/* Three text lines of varying width */}
          <div style={{
            height: 3,
            width: 28,
            borderRadius: 2,
            background: 'white',
          }} />
          <div style={{
            height: 3,
            width: 22,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.8)',
          }} />
          <div style={{
            height: 3,
            width: 26,
            borderRadius: 2,
            background: 'white',
          }} />
          <div style={{
            height: 3,
            width: 16,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.6)',
          }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
