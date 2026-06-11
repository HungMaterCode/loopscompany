import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useSiteData } from '@/legacy-app/SiteDataContext';

const F = "'Be Vietnam Pro', sans-serif";

const pillars = [
  { num: '01', title: 'Không gian sáng tạo', body: 'Mỗi đột phá đều bắt đầu tại giao điểm của chiến lược kỷ luật và tầm nhìn sáng tạo vượt trội. Chúng tôi biến tư duy táo bạo thành kết quả hữu hình.' },
  { num: '02', title: 'Định hình tương lai',  body: 'Công việc tốt nhất xuất hiện khi sự tò mò gặp sự kiên định. Quy trình của chúng tôi chuyển hóa cơ hội ẩn thành trải nghiệm còn vang vọng mãi.' },
  { num: '03', title: 'Dữ liệu & Cảm xúc',   body: 'Chúng tôi kết hợp phân tích dữ liệu chính xác với cảm xúc thương hiệu sâu sắc để tạo ra những chiến lược vừa đo được vừa cảm được.' },
];

export function CreativeVisionSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { config } = useSiteData();

  return (
    <section ref={ref} style={{
      position: 'relative', overflow: 'hidden',
      backgroundColor: 'var(--sc-bg-1)',
      paddingTop: 'clamp(80px,10vw,160px)', paddingBottom: 'clamp(80px,10vw,160px)',
      paddingLeft: '24px', paddingRight: '24px',
      transition: 'background-color 0.38s ease',
    }}>
      {config.creativeVision.bgUrl && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${config.creativeVision.bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none' }} />
      )}

      {/* BG: grid + orbs */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--sc-grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--sc-grid-line) 1px,transparent 1px)',
        backgroundSize: '60px 60px', pointerEvents: 'none',
        transition: 'opacity 0.38s ease',
      }} />
      <div className="orb" style={{ width: '700px', height: '700px', top: '-200px', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle,rgba(0,207,255,0.07) 0%,transparent 70%)' }} />
      <div className="orb" style={{ width: '350px', height: '350px', bottom: '0', right: '10%', background: 'radial-gradient(circle,rgba(123,97,255,0.10) 0%,transparent 70%)' }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section title */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px,7vw,80px)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <div style={{ width: '20px', height: '1px', background: 'var(--sc-accent)' }} />
            <span style={{ fontFamily: F, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--sc-accent)', fontWeight: 700 }}>TRIẾT LÝ CỦA CHÚNG TÔI</span>
            <div style={{ width: '20px', height: '1px', background: 'var(--sc-accent)' }} />
          </div>
          <h2 style={{
            fontFamily: F, fontSize: 'clamp(36px,6vw,80px)', fontWeight: 800,
            color: 'var(--sc-text)', letterSpacing: '-0.04em', lineHeight: 1.05, margin: 0,
          }}>
            Sáng tạo <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--sc-text-45)' }}>× Tầm nhìn</em>
          </h2>
        </motion.div>

        {/* Two-col: video + pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(24px,4vw,48px)', alignItems: 'start' }}>

          {/* Video with glass frame */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: 0.1 }}
            style={{
              borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3', position: 'relative',
              background: 'var(--sc-card-bg)',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid var(--sc-card-border)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.10)',
            }}>
            <video src={config.creativeVision.videoUrl} muted autoPlay loop playsInline preload="auto"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,207,255,0.05) 0%, transparent 50%)' }} />
          </motion.div>

          {/* Pillar cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pillars.map((p, i) => (
              <motion.div key={p.num}
                initial={{ opacity: 0, x: 50, y: 20 }} animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
                whileHover={{ scale: 1.02, x: 6 } as any}
                style={{
                  borderRadius: '18px', padding: 'clamp(18px,2.5vw,28px)',
                  background: 'var(--sc-card-bg)',
                  backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid var(--sc-card-border)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.08)',
                  transition: 'background 0.38s ease, border-color 0.38s ease',
                }}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: F, fontSize: '10px', color: 'var(--sc-accent)', fontWeight: 700, letterSpacing: '0.14em', flexShrink: 0, marginTop: '3px' }}>{p.num}</div>
                  <div>
                    <h3 style={{ fontFamily: F, fontSize: 'clamp(14px,1.5vw,17px)', fontWeight: 700, color: 'var(--sc-text)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>{p.title}</h3>
                    <p style={{ fontFamily: F, fontSize: '13px', color: 'var(--sc-text-45)', lineHeight: 1.7, margin: 0 }}>{p.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
