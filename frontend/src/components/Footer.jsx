import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: '#f5f7fb',
        borderTop: '1px solid #e1e4e8',
        padding: '1rem 0',
        marginTop: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#525f7f',
          fontSize: '0.9rem',
          textAlign: 'center',
        }}
      >
        <div>© {year} FlightBooker. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.85 }}>
            Terms
          </a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.85 }}>
            Privacy
          </a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.85 }}>
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
