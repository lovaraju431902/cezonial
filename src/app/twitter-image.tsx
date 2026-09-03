import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Cezonal Solutions Pvt Ltd - Mobile & Web App Development';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#090D16',
          backgroundImage:
            'radial-gradient(circle at 25% 25%, rgba(56, 189, 248, 0.18) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(134, 79, 254, 0.22) 0%, transparent 50%)',
          position: 'relative',
          padding: '48px',
        }}>
        {/* Inner Card Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '24px',
            padding: '40px 56px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          }}>
          {/* Top Row: Brand & Badge */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <svg width="46" height="46" viewBox="0 0 44 44" fill="none">
                <rect x="31" y="2" width="9" height="9" rx="1.5" fill="#22C55E" />
                <rect x="21" y="12" width="9" height="9" rx="1.5" fill="#3B82F6" />
                <path
                  d="M3 12C3 9.79086 4.79086 8 7 8H17V16H11V31H23V25H31V35C31 37.21 29.21 39 27 39H7C4.79086 39 3 37.21 3 35V12Z"
                  fill="#38BDF8"
                />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '32px',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    letterSpacing: '-0.5px',
                    lineHeight: '1',
                  }}>
                  Cezonal
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#38BDF8',
                    letterSpacing: '3px',
                    marginTop: '4px',
                  }}>
                  SOLUTIONS
                </span>
              </div>
            </div>

            {/* Rating / Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.35)',
                padding: '8px 20px',
                borderRadius: '9999px',
                color: '#4ADE80',
                fontSize: '16px',
                fontWeight: 600,
              }}>
              <span>★ 5.0 Rated App & Web Agency</span>
            </div>
          </div>

          {/* Center: Main Headline & Subtitle */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '960px',
              margin: 'auto 0',
            }}>
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: '1.2',
                margin: '0 0 14px 0',
                letterSpacing: '-1px',
              }}>
              Empowering Businesses With Scalable Web & Mobile Apps
            </h1>
            <p
              style={{
                fontSize: '20px',
                color: '#94A3B8',
                lineHeight: '1.5',
                margin: 0,
                fontWeight: 400,
              }}>
              Custom Software Development • iOS & Android Mobile Apps • Cloud & DevOps Architecture
            </p>
          </div>

          {/* Bottom Row: Feature pills & Website URL */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(148, 163, 184, 0.15)',
              paddingTop: '20px',
            }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span
                style={{
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  color: '#38BDF8',
                  padding: '6px 16px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                }}>
                Mobile Apps
              </span>
              <span
                style={{
                  backgroundColor: 'rgba(134, 79, 254, 0.12)',
                  border: '1px solid rgba(134, 79, 254, 0.25)',
                  color: '#A78BFA',
                  padding: '6px 16px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                }}>
                Web Apps
              </span>
              <span
                style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid rgba(34, 197, 94, 0.25)',
                  color: '#4ADE80',
                  padding: '6px 16px',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                }}>
                Enterprise Software
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#CBD5E1',
                fontSize: '18px',
                fontWeight: 600,
              }}>
              cezonialsolutions.netlify.app
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
