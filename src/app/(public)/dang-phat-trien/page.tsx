"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const F = "'Plus Jakarta Sans', sans-serif";
const MONO = "'Courier New', monospace";

/* ── HUD corners (gold) ── */
function GCorner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const S = 28;
  const rots = { tl: 0, tr: 90, bl: 270, br: 180 };
  const pos2: Record<string, React.CSSProperties> = {
    tl: { top: 16, left: 16 }, tr: { top: 16, right: 16 },
    bl: { bottom: 16, left: 16 }, br: { bottom: 16, right: 16 },
  };
  return (
    <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }} style={{ position: 'absolute', zIndex: 20, transform: `rotate(${rots[pos]}deg)`, ...pos2[pos] }}>
      <svg width={S + 4} height={S + 4} viewBox={`0 0 ${S + 4} ${S + 4}`} fill="none">
        <path d={`M 2 ${S + 2} L 2 2 L ${S + 2} 2`} stroke="rgba(200,162,97,0.55)" strokeWidth="1.5" strokeLinecap="square" />
        <circle cx="2" cy="2" r="2" fill="#C8A261" />
      </svg>
    </motion.div>
  );
}

/* ── Mission progress steps ── */
const STEPS = [
  { label: 'YÊU CẦU',       done: true  },
  { label: 'THIẾT KẾ',      done: true  },
  { label: 'LẬP TRÌNH',     done: false },
  { label: 'KIỂM THỬ',      done: false },
  { label: 'TRIỂN KHAI',    done: false },
];

function MissionSteps() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 260 }}>
      {STEPS.map((s, i) => (
        <motion.div key={s.label}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: s.done ? 'rgba(200,162,97,0.15)' : 'rgba(255,255,255,0.04)',
            border: s.done ? '1px solid rgba(200,162,97,0.5)' : '1px solid rgba(255,255,255,0.1)',
          }}>
            {s.done
              ? <svg width="10" height="10" viewBox="0 0 10 10"><polyline points="2 5 4 7.5 8 2.5" stroke="#C8A261" strokeWidth="1.5" strokeLinecap="round" /></svg>
              : i === STEPS.findIndex(x => !x.done)
                ? <motion.div animate={{ scale: [0.7, 1.2, 0.7] }} transition={{ duration: 1.2, repeat: Infinity }}
                    style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(200,162,97,0.6)' }} />
                : <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
            }
          </div>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.18em', color: s.done ? 'rgba(200,162,97,0.8)' : i === STEPS.findIndex(x => !x.done) ? 'rgba(200,162,97,0.5)' : 'rgba(255,255,255,0.2)' }}>
            {s.label}
          </span>
          {!s.done && i === STEPS.findIndex(x => !x.done) && (
            <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.1em', color: 'rgba(200,162,97,0.4)', marginLeft: 'auto' }}>ĐANG CHẠY</span>
          )}
          {s.done && (
            <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.1em', color: 'rgba(200,162,97,0.3)', marginLeft: 'auto' }}>HOÀN TẤT</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ── Live data side strip ── */
function DataStrip({ side }: { side: 'left' | 'right' }) {
  const [vals, setVals] = useState(() => Array.from({ length: 10 }, () => Math.random().toString(16).slice(2, 6).toUpperCase()));
  useEffect(() => {
    const t = setInterval(() => {
      setVals(prev => [Math.random().toString(16).slice(2, 6).toUpperCase(), ...prev.slice(0, 9)]);
    }, 250);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
      style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [side]: 'clamp(14px,2.5vw,36px)', zIndex: 9, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {vals.map((v, i) => (
        <span key={i} style={{ fontFamily: MONO, fontSize: 8, color: `rgba(200,162,97,${0.06 + (9 - i) * 0.025})`, letterSpacing: '0.08em' }}>{v}</span>
      ))}
    </motion.div>
  );
}

/* ── Central orbital construction SVG ── */
function ConstructionOrbit() {
  return (
    <svg width="480" height="480" viewBox="0 0 480 480" fill="none" overflow="visible">
      <defs>
        <radialGradient id="coreG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#C8A261" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C8A261" stopOpacity="0" />
        </radialGradient>
        <filter id="gG">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="gGsoft">
          <feGaussianBlur stdDeviation="10" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer tick ring (72 ticks) */}
      {Array.from({ length: 72 }, (_, i) => {
        const a = (360 / 72) * i;
        const rad = (a * Math.PI) / 180;
        const major = i % 9 === 0;
        const R = 210; const rIn = major ? 197 : 203;
        return (
          <line key={i}
            x1={240 + Math.cos(rad) * rIn} y1={240 + Math.sin(rad) * rIn}
            x2={240 + Math.cos(rad) * R} y2={240 + Math.sin(rad) * R}
            stroke={major ? 'rgba(200,162,97,0.5)' : 'rgba(200,162,97,0.18)'}
            strokeWidth={major ? 1.5 : 0.75} />
        );
      })}
      <circle cx="240" cy="240" r="210" stroke="rgba(200,162,97,0.14)" strokeWidth="1" />

      {/* Mid orbit — forward */}
      <motion.circle cx="240" cy="240" r="160" stroke="rgba(200,162,97,0.2)" strokeWidth="1"
        strokeDasharray="6 5" fill="none"
        animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '240px', originY: '240px' }} />
      {/* Mid glow arc */}
      <motion.circle cx="240" cy="240" r="160" stroke="#C8A261" strokeWidth="2.5"
        strokeDasharray="50 960" strokeLinecap="round" fill="none" filter="url(#gG)"
        animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '240px', originY: '240px' }} />

      {/* Inner orbit — reverse */}
      <motion.circle cx="240" cy="240" r="110" stroke="rgba(200,162,97,0.25)" strokeWidth="1"
        strokeDasharray="3 4" fill="none"
        animate={{ rotate: -360 }} transition={{ duration: 13, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '240px', originY: '240px' }} />
      {/* Inner glow arc */}
      <motion.circle cx="240" cy="240" r="110" stroke="#D4AF37" strokeWidth="2"
        strokeDasharray="30 665" strokeLinecap="round" fill="none" filter="url(#gG)"
        animate={{ rotate: -360 }} transition={{ duration: 13, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '240px', originY: '240px' }} />

      {/* Crosshairs */}
      {[0, 90].map(a => (
        <line key={a}
          x1={a === 0 ? 30 : 240} y1={a === 0 ? 240 : 30}
          x2={a === 0 ? 450 : 240} y2={a === 0 ? 240 : 450}
          stroke="rgba(200,162,97,0.07)" strokeWidth="0.75" strokeDasharray="4 8" />
      ))}

      {/* Orbital dot on mid orbit */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ originX: '240px', originY: '240px' }}>
        <circle cx="240" cy="80" r="5" fill="#C8A261" filter="url(#gG)" />
        <circle cx="240" cy="80" r="10" stroke="rgba(200,162,97,0.3)" strokeWidth="1" fill="none" />
      </motion.g>

      {/* Orbital dot on inner orbit (counter) */}
      <motion.g animate={{ rotate: -360 }} transition={{ duration: 13, repeat: Infinity, ease: 'linear' }} style={{ originX: '240px', originY: '240px' }}>
        <circle cx="240" cy="130" r="3.5" fill="#D4AF37" filter="url(#gG)" />
      </motion.g>

      {/* Wrench icon in core */}
      <motion.g animate={{ rotate: [0, -6, 6, -3, 3, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }} style={{ originX: '240px', originY: '240px' }}>
        <circle cx="240" cy="240" r="52" fill="rgba(200,162,97,0.04)" stroke="rgba(200,162,97,0.3)" strokeWidth="1" />
        <circle cx="240" cy="240" r="52" fill="url(#coreG)" />
        {/* Wrench path */}
        <path
          d="M 240 218 C 230 218 222 226 222 236 C 222 241 224 246 228 249 L 216 261 C 214 263 214 266 216 268 C 218 270 221 270 223 268 L 235 256 C 237.5 257.5 239.5 258 242 258 C 252 258 260 250 260 240 C 260 238 259.5 236 259 234 L 249 244 L 244 244 L 244 239 L 254 229 C 252 227 249 226.5 247 226.5 L 247 218 Z"
          fill="none" stroke="#C8A261" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>

      {/* Core glow */}
      <motion.circle cx="240" cy="240" r="28" fill="url(#coreG)"
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ originX: '240px', originY: '240px' }} />
      <circle cx="240" cy="240" r="5" fill="#D4AF37" filter="url(#gGsoft)" />

      {/* Degree labels */}
      {[0, 90, 180, 270].map(deg => {
        const r2 = ((deg - 90) * Math.PI) / 180;
        const mx = 240 + Math.cos(r2) * 226;
        const my = 240 + Math.sin(r2) * 226;
        return <text key={deg} x={mx} y={my + 3.5} textAnchor="middle" fontFamily={MONO} fontSize="8" fill="rgba(200,162,97,0.35)">{deg}°</text>;
      })}
    </svg>
  );
}

/* ── Animated progress bar ── */
function ProgressBar({ pct, label }: { pct: number; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(200,162,97,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ fontFamily: MONO, fontSize: 9, color: '#C8A261', fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: 2, background: 'rgba(200,162,97,0.1)', borderRadius: 99, overflow: 'hidden', position: 'relative' }}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '100%', background: 'linear-gradient(90deg, rgba(200,162,97,0.5), #D4AF37)', boxShadow: '0 0 8px rgba(200,162,97,0.6)', borderRadius: 99 }} />
      </div>
    </div>
  );
}

/* ── Status ticker ── */
function StatusTicker() {
  const msgs = ['COMPILING ASSETS...', 'OPTIMIZING PIPELINE...', 'RUNNING TESTS...', 'STAGING DEPLOYMENT...'];
  const [i, setI] = useState(0);
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const t = setInterval(() => { setVis(false); setTimeout(() => { setI(x => (x + 1) % msgs.length); setVis(true); }, 280); }, 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.span animate={{ opacity: vis ? 1 : 0 }} transition={{ duration: 0.28 }}
      style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(200,162,97,0.4)', letterSpacing: '0.12em' }}>
      {msgs[i]}
    </motion.span>
  );
}

/* ── Page ── */
function DevContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const featureName = searchParams.get('feature') || 'Tính năng này';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020202', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,162,97,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,162,97,0.025) 1px, transparent 1px)', backgroundSize: '44px 44px', pointerEvents: 'none' }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 72% 72% at 50% 50%, transparent 50%, rgba(0,0,0,0.72) 100%)', pointerEvents: 'none' }} />
      {/* Ambient */}
      <motion.div animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 52% 42% at 50% 52%, rgba(200,162,97,0.055) 0%, transparent 70%)', pointerEvents: 'none' }} />
      {/* Scanline */}
      <motion.div animate={{ y: ['-55vh', '65vh'] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
        style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,162,97,0.25) 50%, transparent)', pointerEvents: 'none', zIndex: 5 }} />

      {/* Letterbox */}
      {(['top', 'bottom'] as const).map(s => (
        <motion.div key={s} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', [s]: 0, left: 0, right: 0, height: 52, background: '#000', zIndex: 18, transformOrigin: s }} />
      ))}

      {/* Corners */}
      {(['tl', 'tr', 'bl', 'br'] as const).map(p => <GCorner key={p} pos={p} />)}

      {/* Side strips */}
      <DataStrip side="left" />
      <DataStrip side="right" />

      {/* Top bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ position: 'absolute', top: 52, left: 0, right: 0, zIndex: 15, display: 'flex', justifyContent: 'space-between', padding: '7px clamp(16px,3vw,48px)', borderBottom: '1px solid rgba(200,162,97,0.07)' }}>
        {['LOOPS::STUDIO', 'OPS::IN_PROGRESS', 'BUILD::v2.0'].map(t => (
          <span key={t} style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(200,162,97,0.35)', letterSpacing: '0.16em' }}>{t}</span>
        ))}
      </motion.div>

      {/* Bottom bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ position: 'absolute', bottom: 52, left: 0, right: 0, zIndex: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px clamp(16px,3vw,48px)', borderTop: '1px solid rgba(200,162,97,0.07)' }}>
        <StatusTicker />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#C8A261', boxShadow: '0 0 6px rgba(200,162,97,0.9)' }} />
          <span style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(200,162,97,0.4)', letterSpacing: '0.14em' }}>LIVE</span>
        </div>
      </motion.div>

      {/* ── Main grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', maxWidth: 1100, padding: '0 clamp(16px,4vw,60px)', position: 'relative', zIndex: 10, gap: 'clamp(20px,4vw,48px)', alignItems: 'center' }}>

        {/* LEFT — Text content */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

          {/* Badge */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, padding: '5px 14px', width: 'fit-content', borderRadius: 2, border: '1px solid rgba(200,162,97,0.28)', background: 'rgba(200,162,97,0.06)' }}>
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8A261', boxShadow: '0 0 8px rgba(200,162,97,0.9)' }} />
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,162,97,0.75)', fontWeight: 600 }}>NHIỆM VỤ::ĐANG THỰC HIỆN</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.22, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: F, fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 900, color: '#EDE8E1', lineHeight: 1.1, letterSpacing: '-0.035em', margin: '0 0 8px' }}>
            {featureName}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(200,162,97,0.5)', letterSpacing: '0.1em', margin: '0 0 28px' }}>
            THỜI GIAN DỰ KIẾN: SẮP HOÀN THÀNH™
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
            style={{ fontFamily: F, fontSize: 14, lineHeight: 1.85, color: 'rgba(237,232,225,0.45)', maxWidth: 360, margin: '0 0 32px' }}>
            Đội ngũ LOOPS đang dốc toàn lực xây dựng tính năng này. Chúng tôi muốn trao tặng bạn trải nghiệm hoàn hảo nhất — không phải vội vã.
          </motion.p>

          {/* Progress bars */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
            <ProgressBar pct={82} label="Thiết kế" />
            <ProgressBar pct={61} label="Lập trình" />
            <ProgressBar pct={24} label="Kiểm thử" />
          </motion.div>

          {/* Mission steps */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            style={{ marginBottom: 36 }}>
            <div style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(200,162,97,0.35)', letterSpacing: '0.18em', marginBottom: 12 }}>TIẾN TRÌNH</div>
            <MissionSteps />
          </motion.div>

          {/* Actions */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(237,232,225,0.5)', fontFamily: MONO, fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.1em', transition: 'all 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#EDE8E1'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(237,232,225,0.5)'; }}>
              [QUAY LẠI]
            </button>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 24px', borderRadius: 4, background: 'linear-gradient(135deg, #C8A261, #D4AF37)', boxShadow: '0 6px 22px rgba(200,162,97,0.28)', color: '#020202', fontFamily: MONO, fontSize: 11, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.1em', transition: 'all 0.22s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 36px rgba(200,162,97,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 6px 22px rgba(200,162,97,0.28)'; e.currentTarget.style.transform = 'none'; }}>
              [TRANG CHỦ]
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT — Orbital illustration */}
        <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20 }}>
          <ConstructionOrbit />
        </motion.div>
      </div>
    </div>
  );
}

export default function DevelopmentPage() {
  return <Suspense><DevContent /></Suspense>;
}
