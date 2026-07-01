import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #1d4ed8 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            color: 'white',
            marginBottom: 16,
            lineHeight: 1,
            borderBottom: '4px solid rgba(255,255,255,0.6)',
            paddingBottom: '8px',
          }}
        >
          W
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
            lineHeight: 1.2,
          }}
        >
          Count Words, Characters & More Instantly
        </div>
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.82)',
            textAlign: 'center',
            marginBottom: 40,
            lineHeight: 1.5,
            maxWidth: 800,
          }}
        >
          Free word counter with readability scores, keyword density, and platform limits.
          Private &amp; instant.
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Free', 'Private', 'Instant', 'No Signup'].map(pill => (
            <div
              key={pill}
              style={{
                background: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 999,
                padding: '10px 24px',
                color: 'white',
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
