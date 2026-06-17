"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const F = "'Plus Jakarta Sans', sans-serif";
const MONO = "'Courier New', monospace";

/* ── Glitch 404 with chromatic shift ── */
function GlitchHero({ text }: { text: string }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const fire = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 280 + Math.random() * 200);
    };
    const t = setInterval(fire, 1800 + Math.random() * 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block', userSelect: 'none', lineHeight: 1 }}>
      {/* Shadow text layers */}
      <motion.span
        animate={glitching ? { x: [-4, 3, -2, 4, 0], opacity: [0, 0.8, 0, 0.6, 0] } : { x: 0, opacity: 0 }}
        transition={{ duration: 0.28, ease: 'linear' }}
        style={{ position: 'absolute', inset: 0, color: '#FF2222', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit', pointerEvents: 'none' }}
      >{text}</motion.span>
      <motion.span
        animate={glitching ? { x: [3, -4, 3, -2, 0], opacity: [0, 0.5, 0, 0.7, 0] } : { x: 0, opacity: 0 }}
        transition={{ duration: 0.28, delay: 0.04, ease: 'linear' }}
        style={{ position: 'absolute', inset: 0, color: '#00FFEE', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit', pointerEvents: 'none' }}
      >{text}</motion.span>
      {/* Main */}
      <motion.span
        animate={glitching ? { skewX: [-1, 1, -0.5, 0] } : { skewX: 0 }}
        transition={{ duration: 0.25 }}
        style={{ position: 'relative', color: 'rgba(255,255,255,0.07)' }}
      >{text}</motion.span>
    </div>
  );
}

/* ── Broken radar reticle SVG ── */
function BrokenRadar() {
  const [scanAngle, setScanAngle] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setScanAngle(a => (a + 1.5) % 360), 16);
    return () => clearInterval(t);
  }, []);

  const rad = (scanAngle * Math.PI) / 180;
  const R = 180;
  const sweepX = 250 + Math.cos(rad) * R;
  const sweepY = 250 + Math.sin(rad) * R;

  // Blip positions (simulated radar contacts)
  const blips = [
    { angle: 42, r: 120, active: true },
    { angle: 137, r: 95, active: false },
    { angle: 218, r: 145, active: true },
    { angle: 305, r: 80, active: false },
  ];

  return (
    <svg width="500" height="500" viewBox="0 0 500 500" fill="none" overflow="visible">
      <defs>
        <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,40,40,0.06)" />
          <stop offset="100%" stopColor="rgba(255,40,40,0)" />
        </radialGradient>
        <filter id="redGlow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="redGlowSoft">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Radar sweep gradient */}
        <radialGradient id="sweepGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,50,50,0.25)" />
          <stop offset="100%" stopColor="rgba(255,50,50,0)" />
        </radialGradient>
      </defs>

      {/* Background fill */}
      <circle cx="250" cy="250" r={R} fill="url(#radarBg)" />

      {/* Concentric rings — some broken */}
      {[60, 100, 140, 180].map((r, i) => (
        <React.Fragment key={r}>
          {i === 1 ? (
            // Broken ring
            <>
              <motion.circle cx="250" cy="250" r={r} stroke="rgba(255,70,70,0.3)" strokeWidth="1"
                strokeDasharray={`${r * 0.8} ${r * 0.4} ${r * 1.2} ${r * 0.1}`}
                fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                style={{ originX: '250px', originY: '250px' }} />
              {/* Gap fragment */}
              <motion.path d={`M ${250 + r} 250 A ${r} ${r} 0 0 1 ${250 + r * 0.5} ${250 - r * 0.866}`}
                stroke="rgba(255,70,70,0.7)" strokeWidth="1.5" fill="none" filter="url(#redGlow)"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity }} />
            </>
          ) : (
            <circle cx="250" cy="250" r={r}
              stroke={`rgba(255,70,70,${i === 3 ? 0.25 : 0.15})`}
              strokeWidth={i === 3 ? 1 : 0.75}
              strokeDasharray={i === 3 ? undefined : '3 6'}
              fill="none" />
          )}
        </React.Fragment>
      ))}

      {/* Cross-hair */}
      {[0, 90].map(a => (
        <line key={a}
          x1={a === 0 ? 60 : 250} y1={a === 0 ? 250 : 60}
          x2={a === 0 ? 440 : 250} y2={a === 0 ? 250 : 440}
          stroke="rgba(255,70,70,0.12)" strokeWidth="0.75" strokeDasharray="4 8" />
      ))}

      {/* Diagonal cross — glitchy */}
      <motion.line x1="100" y1="100" x2="400" y2="400"
        stroke="rgba(255,70,70,0.08)" strokeWidth="0.5" strokeDasharray="2 12"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 2.5, repeat: Infinity }} />

      {/* Radar sweep sector */}
      <motion.path
        d={`M 250 250 L ${sweepX} ${sweepY}`}
        stroke="rgba(255,70,70,0.6)" strokeWidth="1.5" filter="url(#redGlow)" />
      <motion.path
        d={`M 250 250 L ${250 + Math.cos((scanAngle - 40) * Math.PI / 180) * R} ${250 + Math.sin((scanAngle - 40) * Math.PI / 180) * R}`}
        stroke="rgba(255,70,70,0.08)" strokeWidth="1" />
      {/* Sweep fill wedge */}
      <path
        d={`M 250 250 L ${sweepX} ${sweepY} A ${R} ${R} 0 0 0 ${250 + Math.cos((scanAngle - 35) * Math.PI / 180) * R} ${250 + Math.sin((scanAngle - 35) * Math.PI / 180) * R} Z`}
        fill="rgba(255,40,40,0.06)" />

      {/* Target blips */}
      {blips.map((b, i) => {
        const br = (b.angle * Math.PI) / 180;
        const bx = 250 + Math.cos(br) * b.r;
        const by = 250 + Math.sin(br) * b.r;
        return (
          <motion.g key={i}
            animate={{ opacity: b.active ? [0.4, 1, 0.4] : [0.1, 0.3, 0.1] }}
            transition={{ duration: 1.6, delay: i * 0.4, repeat: Infinity }}>
            <circle cx={bx} cy={by} r={b.active ? 4 : 2.5} fill={b.active ? '#FF4646' : 'rgba(255,70,70,0.4)'} filter="url(#redGlow)" />
            {b.active && (
              <motion.circle cx={bx} cy={by} r="8"
                stroke="rgba(255,70,70,0.5)" strokeWidth="1" fill="none"
                animate={{ scale: [0.5, 2], opacity: [0.8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }} />
            )}
          </motion.g>
        );
      })}

      {/* Center — broken "X" */}
      <motion.g animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.2, repeat: Infinity }}>
        <line x1="243" y1="243" x2="257" y2="257" stroke="#FF4646" strokeWidth="2" filter="url(#redGlow)" />
        <line x1="257" y1="243" x2="243" y2="257" stroke="#FF4646" strokeWidth="2" filter="url(#redGlow)" />
        <circle cx="250" cy="250" r="14" stroke="rgba(255,70,70,0.4)" strokeWidth="1" fill="rgba(255,40,40,0.05)" />
      </motion.g>

      {/* SIGNAL LOST text */}
      <motion.text x="250" y="258" textAnchor="middle" fontFamily={MONO} fontSize="6"
        fill="rgba(255,100,100,0.7)" letterSpacing="3"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, times: [0, 0.1, 0.8, 1] }}>
        MẤT TÍN HIỆU
      </motion.text>

      {/* Degree markers */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
        const r2 = (( deg - 90) * Math.PI) / 180;
        const mx = 250 + Math.cos(r2) * (R + 16);
        const my = 250 + Math.sin(r2) * (R + 16);
        return <text key={deg} x={mx} y={my + 3} textAnchor="middle" fontFamily={MONO} fontSize="7" fill="rgba(255,70,70,0.3)">{deg}</text>;
      })}
    </svg>
  );
}

/* ── HUD corner bracket ── */
function HCorner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const S = 28;
  const rots = { tl: 0, tr: 90, bl: 270, br: 180 };
  const pos2: Record<string, React.CSSProperties> = {
    tl: { top: 16, left: 16 }, tr: { top: 16, right: 16 },
    bl: { bottom: 16, left: 16 }, br: { bottom: 16, right: 16 },
  };
  return (
    <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      style={{ position: 'absolute', zIndex: 20, transform: `rotate(${rots[pos]}deg)`, ...pos2[pos] }}>
      <svg width={S + 4} height={S + 4} viewBox={`0 0 ${S + 4} ${S + 4}`} fill="none">
        <path d={`M 2 ${S + 2} L 2 2 L ${S + 2} 2`} stroke="rgba(255,70,70,0.5)" strokeWidth="1.5" strokeLinecap="square" />
        <circle cx="2" cy="2" r="2" fill="#FF4646" />
      </svg>
    </motion.div>
  );
}

/* ── Scrolling hex data stream ── */
function HexStream({ side }: { side: 'left' | 'right' }) {
  const [rows, setRows] = useState(() => Array.from({ length: 12 }, () => Array.from({ length: 4 }, () => Math.random().toString(16).slice(2, 6).toUpperCase()).join(' ')));
  useEffect(() => {
    const t = setInterval(() => {
      setRows(prev => [
        Array.from({ length: 4 }, () => Math.random().toString(16).slice(2, 6).toUpperCase()).join(' '),
        ...prev.slice(0, 11),
      ]);
    }, 220);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
      style={{
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        [side]: 'clamp(16px, 2.5vw, 40px)', zIndex: 9,
        display: 'flex', flexDirection: 'column', gap: 5,
      }}>
      {rows.map((r, i) => (
        <div key={i} style={{ fontFamily: MONO, fontSize: 8, color: `rgba(255,70,70,${0.08 + (11 - i) * 0.02})`, letterSpacing: '0.08em' }}>{r}</div>
      ))}
    </motion.div>
  );
}

/* ── Main ── */
export function ErrorState({
  title = '404', subtitle = 'Trang không tồn tại',
  message = 'Đường dẫn bạn truy cập không tồn tại, đã bị di chuyển hoặc xóa vĩnh viễn.',
  onRetry, fullScreen = false,
}: { title?: string; subtitle?: string; message?: string; onRetry?: () => void; fullScreen?: boolean }) {
  const router = useRouter();

  const inner = (
    <div style={{
      minHeight: fullScreen ? '100vh' : '100vh',
      backgroundColor: '#020202',
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,50,50,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,50,50,0.025) 1px, transparent 1px)', backgroundSize: '44px 44px', pointerEvents: 'none' }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 50%, rgba(0,0,0,0.75) 100%)', pointerEvents: 'none' }} />
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(255,40,40,0.055) 0%, transparent 70%)', pointerEvents: 'none' }} />
      {/* Scanline */}
      <motion.div animate={{ y: ['-60vh', '70vh'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
        style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,70,70,0.3) 50%, transparent)', pointerEvents: 'none', zIndex: 5 }} />

      {/* Letterbox */}
      {(['top', 'bottom'] as const).map(s => (
        <motion.div key={s} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', [s]: 0, left: 0, right: 0, height: 52, background: '#000', zIndex: 18, transformOrigin: s }} />
      ))}

      {/* HUD Corners */}
      {(['tl', 'tr', 'bl', 'br'] as const).map(p => <HCorner key={p} pos={p} />)}

      {/* Side hex streams */}
      <HexStream side="left" />
      <HexStream side="right" />

      {/* Top bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ position: 'absolute', top: 52, left: 0, right: 0, zIndex: 15, display: 'flex', justifyContent: 'space-between', padding: '7px clamp(16px,3vw,48px)', borderBottom: '1px solid rgba(255,50,50,0.08)' }}>
        {['SYS::ERROR', 'CODE:' + title, 'STATUS::CRITICAL'].map(t => (
          <span key={t} style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(255,70,70,0.4)', letterSpacing: '0.16em' }}>{t}</span>
        ))}
      </motion.div>
      {/* Bottom bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ position: 'absolute', bottom: 52, left: 0, right: 0, zIndex: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px clamp(16px,3vw,48px)', borderTop: '1px solid rgba(255,50,50,0.08)' }}>
        <span style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(255,70,70,0.25)', letterSpacing: '0.12em' }}>LOOPS Studio © 2026</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF4646', boxShadow: '0 0 8px rgba(255,70,70,0.9)' }} />
          <span style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(255,70,70,0.45)', letterSpacing: '0.14em' }}>ALERT</span>
        </div>
      </motion.div>

      {/* ── Main content — 2-column ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', maxWidth: 1100, padding: '0 clamp(16px,4vw,60px)', position: 'relative', zIndex: 10, gap: 'clamp(20px, 4vw, 60px)', alignItems: 'center' }}>

        {/* LEFT: text */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          {/* Giant 404 */}
          <div style={{ fontFamily: F, fontSize: 'clamp(100px,16vw,180px)', fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 0.85, marginBottom: 24 }}>
            <GlitchHero text={title} />
          </div>

          {/* Badge */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, padding: '5px 14px', borderRadius: 2, border: '1px solid rgba(255,70,70,0.3)', background: 'rgba(255,40,40,0.07)' }}>
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.7, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF4646', boxShadow: '0 0 8px rgba(255,70,70,1)' }} />
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FF7070', fontWeight: 600 }}>LỖI HỆ THỐNG</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
            style={{ fontFamily: F, fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 800, color: '#EDE8E1', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 14px' }}>
            {subtitle}
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: F, fontSize: 14, lineHeight: 1.85, color: 'rgba(237,232,225,0.45)', maxWidth: 360, margin: '0 0 36px' }}>
            {message}
          </motion.p>

          {/* Terminal snippet */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            style={{ padding: '12px 16px', borderRadius: 4, background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,50,50,0.15)', marginBottom: 32 }}>
            <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
            </div>
            {[
              { t: `$ curl -I localhost/${title}`, c: 'rgba(255,255,255,0.4)' },
              { t: `HTTP/1.1 ${title} Not Found`, c: 'rgba(255,80,80,0.85)' },
              { t: 'Connection: keep-alive', c: 'rgba(255,255,255,0.2)' },
              { t: '> suggest: GET /', c: 'rgba(200,162,97,0.7)' },
            ].map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.65 + i * 0.1 }}
                style={{ fontFamily: MONO, fontSize: 11, color: l.c, lineHeight: 1.8 }}>{l.t}</motion.div>
            ))}
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
              style={{ display: 'inline-block', width: 7, height: 13, background: 'rgba(200,162,97,0.7)', verticalAlign: 'middle', marginTop: 2 }} />
          </motion.div>

          {/* Actions */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {onRetry && (
              <button onClick={onRetry} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 4, border: '1px solid rgba(255,70,70,0.3)', background: 'rgba(255,40,40,0.1)', color: '#FF8080', fontFamily: MONO, fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.1em', transition: 'all 0.18s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,40,40,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,40,40,0.1)'; }}>
                [THỬ LẠI]
              </button>
            )}
            <button onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', color: 'rgba(237,232,225,0.5)', fontFamily: MONO, fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.1em', transition: 'all 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#EDE8E1'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(237,232,225,0.5)'; }}>
              [QUAY LẠI]
            </button>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 22px', borderRadius: 4, background: 'linear-gradient(135deg, #C8A261, #D4AF37)', boxShadow: '0 6px 24px rgba(200,162,97,0.3)', color: '#020202', fontFamily: MONO, fontSize: 11, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.1em', transition: 'all 0.22s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 36px rgba(200,162,97,0.55)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(200,162,97,0.3)'; e.currentTarget.style.transform = 'none'; }}>
              [TRANG CHỦ]
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT: radar */}
        <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <BrokenRadar />
        </motion.div>
      </div>

      <style>{`@media(max-width:768px){.err404-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );

  return inner;
}
