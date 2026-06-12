import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useSiteData } from '@/legacy-app/SiteDataContext';

const F = "'Be Vietnam Pro', sans-serif";

interface ProjectItem {
  num: string;
  title: string;
  cat: string;
  year: string;
  result: string;
  img: string;
  accent: string;
  url?: string;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  { num: '01', title: 'VinFast Toàn Cầu',     cat: 'WEB · STRATEGY',  year: '2024', result: '+340% traffic', img: 'https://images.unsplash.com/photo-1615829386703-e2bb66a7cb7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#C8A261' },
  { num: '02', title: 'Vista Residence',       cat: 'BRAND · UX',      year: '2024', result: 'Top 1 Google',   img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#7B61FF' },
  { num: '03', title: 'Pho Ha Noi Kitchen',    cat: 'SOCIAL · CONTENT', year: '2025', result: '2M+ impressions',img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#00D9A3' },
  { num: '04', title: 'Nova Fashion Week',     cat: 'VIDEO · ADS',      year: '2025', result: '8M views',       img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#FF6B6B' },
  { num: '05', title: 'TechViet Startup Hub',  cat: 'WEB APP · DESIGN', year: '2025', result: '500+ users/ngày',img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#FFB347' },
  { num: '06', title: 'GreenLeaf Organic',     cat: 'BRAND · PACKAGE',  year: '2026', result: '120% ROI',       img: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#00FF88' },
  { num: '07', title: 'SunHouse Real Estate',  cat: 'WEB · MARKETING',  year: '2026', result: '3× leads',       img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#00CFFF' },
  { num: '08', title: 'FoodieApp Vietnam',     cat: 'APP · CONTENT',    year: '2026', result: '50K downloads',  img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', accent: '#C8A261' },
];

function MarqueeCard({ p }: { p: ProjectItem }) {
  return (
    <div style={{
      flexShrink: 0, width: '280px', borderRadius: '16px', overflow: 'hidden',
      background: 'var(--sc-item-bg)',
      border: '1px solid var(--sc-item-border)',
      cursor: 'pointer', marginRight: '20px',
      transition: 'border-color 0.2s, transform 0.3s, background 0.38s ease',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = p.accent + '50'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--sc-item-border)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
    >
      {/* Image */}
      <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
        <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.65) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: p.accent }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px', fontFamily: F, fontSize: '9px', letterSpacing: '0.14em', color: p.accent, fontWeight: 700 }}>{p.num}</div>
        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowUpRight size={13} color="white" />
        </div>
        <div style={{ position: 'absolute', bottom: '10px', left: '12px' }}>
          <div style={{ fontFamily: F, fontSize: '8px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.75)', marginBottom: '3px' }}>{p.cat}</div>
          <div style={{ fontFamily: F, fontSize: '16px', color: 'white', fontWeight: 700 }}>{p.title}</div>
        </div>
      </div>
      {/* Footer */}
      <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: F, fontSize: '10px', color: 'var(--sc-text-35)', letterSpacing: '0.08em' }}>{p.year}</span>
        <span style={{ fontFamily: F, fontSize: '10px', color: p.accent, fontWeight: 600, background: p.accent + '18', borderRadius: '9999px', padding: '3px 10px' }}>{p.result}</span>
      </div>
    </div>
  );
}

export function ProjectMuseumSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { config } = useSiteData();

  const list = config.portfolio.projects && config.portfolio.projects.length > 0
    ? config.portfolio.projects
    : DEFAULT_PROJECTS;

  const doubled = [...list, ...list];

  return (
    <section id="portfolio" ref={ref} style={{
      backgroundColor: 'var(--sc-bg-3)',
      paddingTop: 'clamp(80px,10vw,140px)', paddingBottom: 'clamp(80px,10vw,140px)',
      overflow: 'hidden', borderTop: '1px solid var(--sc-border)',
      transition: 'background-color 0.38s ease',
      position: 'relative',
    }}>
      {config.portfolio.bgUrl && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${config.portfolio.bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none' }} />
      )}

      {/* Header — padded */}
      <div style={{ position: 'relative', zIndex: 1, paddingLeft: '24px', paddingRight: '24px', maxWidth: '1120px', margin: '0 auto clamp(32px,5vw,52px)' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '20px', height: '1px', background: 'var(--sc-accent)' }} />
              <span style={{ fontFamily: F, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--sc-accent)', fontWeight: 700 }}>
                {config.portfolio.subtitle || "DỰ ÁN ĐÃ THỰC HIỆN"}
              </span>
            </div>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(30px,5vw,64px)', fontWeight: 800, color: 'var(--sc-text)', letterSpacing: '-0.04em', margin: 0, lineHeight: 1.1 }}>
              {config.portfolio.titleRegular || "Bảo tàng"}{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--sc-text-45)' }}>
                {config.portfolio.titleItalic || "Dự án"}
              </em>
            </h2>
          </div>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: F, fontSize: '12px', color: 'var(--sc-text-35)', textDecoration: 'none', border: '1px solid var(--sc-border-h)', borderRadius: '9999px', padding: '8px 16px', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--sc-text)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--sc-border-m)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--sc-text-35)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--sc-border-h)'; }}
          ><ExternalLink size={12} /> Xem tất cả</a>
        </motion.div>
      </div>

      {/* Infinite marquee — full width */}
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
        {/* Row 1: left scroll */}
        <div style={{ overflow: 'hidden', paddingLeft: '24px', marginBottom: '20px' }}>
          <div className="marquee-track" style={{ animationDirection: 'normal' }}>
            {doubled.map((p, i) => <MarqueeCard key={`a-${i}`} p={p} />)}
          </div>
        </div>
        {/* Row 2: right scroll */}
        <div style={{ overflow: 'hidden', paddingLeft: '24px' }}>
          <div className="marquee-track" style={{ animationDirection: 'reverse' }}>
            {[...doubled].reverse().map((p, i) => <MarqueeCard key={`b-${i}`} p={p} />)}
          </div>
        </div>
      </motion.div>

      {/* Footer note */}
      <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.5 }}
        style={{ fontFamily: F, fontSize: '10px', color: 'var(--sc-text-20)', textAlign: 'center', marginTop: '36px', letterSpacing: '0.12em' }}>
        ↔ HOVER ĐỂ TẠM DỪNG · {list.length}+ DỰ ÁN ĐÃ HOÀN THÀNH
      </motion.p>
    </section>
  );
}
