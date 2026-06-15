import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBreakpoint } from '../ui/useBreakpoint';
import { SectionHeader } from '../shared/SectionHeader';
import { useSiteData } from '@/features/legacy-core/SiteDataContext';

const F = "'Be Vietnam Pro', sans-serif";

const services = [
  {
    num: '01', label: 'Tạo Website',
    sub: 'Landing page, web app, thương mại điện tử chuyên nghiệp.',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    accent: '#C8A261',
    tags: ['Landing Page', 'Web App', 'E-commerce'],
    size: 'large',
    objectPosition: 'top',
    glassBg: 'rgba(15, 32, 67, 0.45)', // Deep blue-teal tint
  },
  {
    num: '02', label: 'Marketing',
    sub: 'Chiến lược digital, Google Ads, Meta Ads, tăng trưởng thực.',
    img: 'https://images.unsplash.com/photo-1683721003111-070bcc053d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    accent: '#D4AF37',
    tags: ['Google Ads', 'Meta Ads', 'SEO'],
    size: 'small',
    glassBg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)', // Purple-pink to blue gradient
  },
  {
    num: '03', label: 'Content',
    sub: 'Copywriting, bài viết blog, kịch bản thương hiệu chất lượng cao.',
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    accent: '#DAA520',
    tags: ['Copywriting', 'Blog', 'Script'],
    size: 'small',
    glassBg: 'rgba(184, 134, 11, 0.3)', // Bronze/gold tint
  },
  {
    num: '04', label: 'Media & Video',
    sub: 'Ảnh thương mại, video quảng cáo, reels viral chất lượng điện ảnh.',
    img: 'https://images.unsplash.com/photo-1497015289639-54688650d173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    accent: '#B8860B',
    tags: ['Video Ads', 'Reels', 'Photography'],
    size: 'large',
    glassBg: 'rgba(139, 69, 19, 0.3)', // Bronze/brown tint
  },
  {
    num: '05', label: 'Thương hiệu',
    sub: 'Logo, bộ nhận diện thương hiệu đồng bộ, design system.',
    img: 'https://images.unsplash.com/photo-1779261320306-8885b83599ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    accent: '#E8D4A8',
    tags: ['Logo', 'Brand Kit', 'Design System'],
    size: 'small',
    glassBg: 'rgba(13, 148, 136, 0.3)', // Blue/teal tint
  },
  {
    num: '06', label: 'Analytics',
    sub: 'Đo lường hiệu quả, báo cáo ROI, tối ưu chiến dịch liên tục.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    accent: '#C8A261',
    tags: ['Dashboard', 'ROI Report', 'A/B Test'],
    size: 'small',
    glassBg: 'rgba(4, 120, 87, 0.3)', // Green/teal tint
  },
  {
    num: '07', label: 'Vận hành & Bảo trì',
    sub: 'Bảo mật, tối ưu tốc độ, nâng cấp hệ thống trơn tru 24/7.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    accent: '#D4AF37',
    tags: ['Hosting', 'Security', 'Speed'],
    size: 'small',
    glassBg: 'rgba(200, 162, 97, 0.25)', // Gold/grey tint
  },
];

function ServiceCard({
  svc, delay, inView, forceSingleCol,
}: {
  svc: typeof services[0];
  delay: number;
  inView: boolean;
  forceSingleCol: boolean;
}) {
  const isLarge = svc.size === 'large' && !forceSingleCol;
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.02, y: -6 }}
      onClick={() => router.push('/coming-soon')}
      style={{
        gridColumn: isLarge ? 'span 2' : 'span 1',
        borderRadius: '20px', overflow: 'hidden',
        cursor: 'pointer', position: 'relative',
        minHeight: isLarge ? '340px' : '260px',
        display: 'flex', flexDirection: 'column',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Image filling the entire card */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src={svc.img} alt={svc.label}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: svc.objectPosition || 'center', display: 'block', transition: 'transform 0.6s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)', pointerEvents: 'none' }} />
      </div>

      {/* Top right icon */}
      <div style={{ position: 'absolute', top: '16px', right: '16px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, transition: 'background 0.3s ease' }}>
        <ArrowUpRight size={18} color="#fff" />
      </div>

      {/* Number badge at top left */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', fontFamily: F, fontSize: '12px', letterSpacing: '0.18em', color: '#fff', fontWeight: 800, textShadow: '0 2px 8px rgba(0,0,0,0.5)', zIndex: 2 }}>{svc.num}</div>

      {/* Content area: Liquid glass floating at the bottom */}
      <div className="premium-glass" style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        right: '12px',
        padding: 'clamp(14px,2vw,20px)',
        zIndex: 2,
        borderRadius: '16px',
        display: 'flex', flexDirection: 'column', gap: '8px'
      }}>
        {/* Colorful glass tint overlay */}
        {svc.glassBg && (
          <div style={{ position: 'absolute', inset: 0, background: svc.glassBg, zIndex: -1, pointerEvents: 'none', borderRadius: '16px' }} />
        )}
        
        <h3 style={{ fontFamily: F, fontSize: 'clamp(16px,1.8vw,20px)', color: '#ffffff', fontWeight: 700, margin: 0, letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{svc.label}</h3>
        <p style={{ fontFamily: F, fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>{svc.sub}</p>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
          {svc.tags.map(t => (
            <span key={t} style={{ fontFamily: F, fontSize: '10px', color: '#ffffff', border: `1px solid rgba(255, 255, 255, 0.2)`, borderRadius: '9999px', padding: '4px 12px', letterSpacing: '0.04em', fontWeight: 600, background: 'rgba(255, 255, 255, 0.1)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ServiceEcosystemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { isMobile } = useBreakpoint();
  const { config } = useSiteData();

  const gridCols = isMobile ? '1fr' : 'repeat(auto-fill,minmax(280px,1fr))';

  return (
    <section id="services" ref={ref} style={{
      backgroundColor: 'var(--sc-bg-2)',
      paddingTop: 'clamp(80px,10vw,140px)',
      paddingBottom: 'clamp(80px,10vw,140px)',
      paddingLeft: 'clamp(16px,5vw,24px)', paddingRight: 'clamp(16px,5vw,24px)',
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid var(--sc-border)',
      transition: 'background-color 0.38s ease',
    }}>
      {config.service.bgUrl && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${config.service.bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none' }} />
      )}
      {/* Diagonal mesh pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,var(--sc-grid-line) 0px,var(--sc-grid-line) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(-45deg,var(--sc-grid-line) 0px,var(--sc-grid-line) 1px,transparent 1px,transparent 40px)', pointerEvents: 'none' }} />
      {/* Pink glow removed as requested */}
      <div className="orb" style={{ width: '500px', height: '500px', bottom: '-150px', left: '-100px', background: 'var(--sc-orb-2-bg)' }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionHeader
          label="DỊCH VỤ"
          headingMain="Hệ sinh thái"
          headingEm="dịch vụ"
          description="Từ website đến marketing toàn diện — đồng hành cùng bạn ở mọi bước."
          inView={inView}
        />

        <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: 'clamp(12px,2vw,20px)', gridAutoRows: 'auto' }}>
          {services.map((svc, i) => (
            <ServiceCard key={svc.num} svc={svc} delay={i * 0.08} inView={inView} forceSingleCol={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
