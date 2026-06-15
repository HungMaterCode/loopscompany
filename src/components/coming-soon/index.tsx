"use client";

import Link from 'next/link';
import { ArrowLeft, HardHat } from 'lucide-react';

export default function ComingSoonPage() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--sc-bg, #0f172a)',
      color: 'var(--sc-text, #f8fafc)',
      padding: '2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(200, 162, 97, 0.15) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ 
          marginBottom: '2rem', 
          display: 'flex', 
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '24px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <HardHat size={56} color="#C8A261" strokeWidth={1.5} />
        </div>
        
        <h1 style={{ 
          fontFamily: "'Be Vietnam Pro', sans-serif", 
          fontSize: 'clamp(28px, 4vw, 48px)', 
          fontWeight: 700, 
          marginBottom: '1rem',
          background: 'linear-gradient(90deg, #C8A261, #D4AF37)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2
        }}>
          Tính năng đang được phát triển
        </h1>
        
        <p style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '16px',
          color: 'rgba(255, 255, 255, 0.7)',
          maxWidth: '500px',
          lineHeight: 1.6,
          marginBottom: '2.5rem'
        }}>
          Chúng tôi đang nỗ lực hoàn thiện giao diện và chức năng này để mang đến trải nghiệm tốt nhất cho bạn. Vui lòng quay lại sau nhé!
        </p>
        
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 28px',
          backgroundColor: '#C8A261',
          color: '#000',
          borderRadius: '9999px',
          textDecoration: 'none',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontWeight: 600,
          fontSize: '15px',
          transition: 'transform 0.2s ease, opacity 0.2s ease',
          boxShadow: '0 4px 14px rgba(200, 162, 97, 0.3)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <ArrowLeft size={18} />
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
}
