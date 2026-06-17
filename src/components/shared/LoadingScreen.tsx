"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const F = "'Plus Jakarta Sans', sans-serif";
const MONO = "'Courier New', monospace";
const GOLD = 'rgba(200,162,97,1)';
const GOLD_DIM = 'rgba(200,162,97,0.35)';
const GOLD_FAINT = 'rgba(200,162,97,0.08)';

/* ── Utility: random hex string ── */
const rHex = (len = 4) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
const rInt = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

/* ── HUD Corner brackets ── */
function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const size = 24;
  const w = 2;
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: 20, left: 20 },
    tr: { top: 20, right: 20 },
    bl: { bottom: 20, left: 20 },
    br: { bottom: 20, right: 20 },
  };
  const rotations = { tl: 0, tr: 90, bl: 270, br: 180 };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        position: 'absolute', zIndex: 12, ...styles[pos],
        transform: `rotate(${rotations[pos]}deg)`,
      }}
    >
      <svg width={size + 8} height={size + 8} viewBox={`0 0 ${size + 8} ${size + 8}`} fill="none">
        <path d={`M 4 ${size + 4} L 4 4 L ${size + 4} 4`} stroke="rgba(200,162,97,0.6)" strokeWidth={w} strokeLinecap="square" />
        <circle cx="4" cy="4" r="2" fill="#C8A261" />
      </svg>
    </motion.div>
  );
}

/* ── HUD data text block ── */
function DataBlock({ side }: { side: 'left' | 'right' }) {
  const [lines, setLines] = useState(() =>
    Array.from({ length: 8 }, () => ({ key: rHex(3), val: rHex(4) }))
  );

  useEffect(() => {
    const t = setInterval(() => {
      setLines(prev => prev.map((l, i) =>
        i === rInt(0, prev.length) ? { key: l.key, val: rHex(4) } : l
      ));
    }, 180);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      style={{
        position: 'absolute',
        top: '50%', transform: 'translateY(-50%)',
        [side]: 'clamp(24px,3vw,48px)',
        zIndex: 9,
        display: 'flex', flexDirection: 'column', gap: 6,
      }}
    >
      {lines.map((l, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontFamily: MONO, fontSize: 9, color: GOLD_DIM, letterSpacing: '0.1em' }}>{l.key}</span>
          <span style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(200,162,97,0.5)', letterSpacing: '0.08em' }}>{l.val}</span>
        </div>
      ))}
    </motion.div>
  );
}

/* ── Waveform bar ── */
function Waveform() {
  const [bars, setBars] = useState(() => Array.from({ length: 40 }, () => rInt(20, 80)));
  useEffect(() => {
    const t = setInterval(() => {
      setBars(prev => prev.map((v, i) =>
        i === rInt(0, prev.length) ? rInt(10, 90) : Math.max(10, Math.min(90, v + rInt(-8, 8)))
      ));
    }, 80);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 32 }}>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: 2, height: `${h}%`, borderRadius: 1,
            background: `rgba(200,162,97,${0.15 + h / 250})`,
            transition: 'height 80ms ease',
          }}
        />
      ))}
    </div>
  );
}

/* ── Central HUD reticle (SVG) ── */
function Reticle() {
  const TICKS = 72; // tick marks around the outer ring
  const R_OUTER = 210;
  const R_TICK_INNER = 200;
  const R_MID = 160;
  const R_INNER = 110;
  const R_CORE = 60;

  const ticks = Array.from({ length: TICKS }, (_, i) => {
    const angle = (360 / TICKS) * i;
    const rad = (angle * Math.PI) / 180;
    const major = i % 9 === 0;
    const rIn = major ? R_TICK_INNER - 10 : R_TICK_INNER;
    return {
      x1: 250 + Math.cos(rad) * rIn,
      y1: 250 + Math.sin(rad) * rIn,
      x2: 250 + Math.cos(rad) * R_OUTER,
      y2: 250 + Math.sin(rad) * R_OUTER,
      major,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', width: 500, height: 500 }}
    >
      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" overflow="visible">
        <defs>
          <radialGradient id="rgCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#C8A261" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C8A261" stopOpacity="0" />
          </radialGradient>
          <filter id="glowF" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glowSoft" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Radar sweep gradient */}
          <linearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(200,162,97,0)" />
            <stop offset="100%" stopColor="rgba(200,162,97,0.18)" />
          </linearGradient>
        </defs>

        {/* ── Tick ring ── */}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={t.major ? 'rgba(200,162,97,0.5)' : 'rgba(200,162,97,0.2)'}
            strokeWidth={t.major ? 1.5 : 0.75}
          />
        ))}

        {/* Outer ring */}
        <circle cx="250" cy="250" r={R_OUTER} stroke="rgba(200,162,97,0.15)" strokeWidth="1" />

        {/* Mid ring — rotating */}
        <motion.circle
          cx="250" cy="250" r={R_MID}
          stroke="rgba(200,162,97,0.25)" strokeWidth="1"
          strokeDasharray="8 4"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '250px', originY: '250px' }}
        />

        {/* Mid glowing arc */}
        <motion.circle
          cx="250" cy="250" r={R_MID}
          stroke="#C8A261" strokeWidth="2.5"
          strokeDasharray="60 950"
          strokeLinecap="round"
          fill="none"
          filter="url(#glowF)"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '250px', originY: '250px' }}
        />

        {/* Inner ring — counter */}
        <motion.circle
          cx="250" cy="250" r={R_INNER}
          stroke="rgba(200,162,97,0.3)" strokeWidth="1"
          strokeDasharray="3 5"
          fill="none"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '250px', originY: '250px' }}
        />

        {/* Inner glowing arc */}
        <motion.circle
          cx="250" cy="250" r={R_INNER}
          stroke="#D4AF37" strokeWidth="2"
          strokeDasharray="30 660"
          strokeLinecap="round"
          fill="none"
          filter="url(#glowF)"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '250px', originY: '250px' }}
        />

        {/* ── Radar sweep ── */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '250px', originY: '250px' }}
        >
          {/* Sweep wedge */}
          <path
            d={`M 250 250 L 250 ${250 - R_OUTER} A ${R_OUTER} ${R_OUTER} 0 0 1 ${250 + R_OUTER * Math.sin((40 * Math.PI) / 180)} ${250 - R_OUTER * Math.cos((40 * Math.PI) / 180)} Z`}
            fill="url(#radarGrad)"
            opacity="0.6"
          />
          {/* Leading edge line */}
          <line
            x1="250" y1="250"
            x2="250" y2={250 - R_OUTER}
            stroke="rgba(200,162,97,0.6)"
            strokeWidth="1"
          />
        </motion.g>

        {/* ── Crosshair lines ── */}
        {[0, 90].map(a => (
          <line
            key={a}
            x1={a === 0 ? 250 - R_OUTER - 16 : 250}
            y1={a === 0 ? 250 : 250 - R_OUTER - 16}
            x2={a === 0 ? 250 + R_OUTER + 16 : 250}
            y2={a === 0 ? 250 : 250 + R_OUTER + 16}
            stroke="rgba(200,162,97,0.1)"
            strokeWidth="0.75"
            strokeDasharray="4 8"
          />
        ))}

        {/* ── Target blip dots ── */}
        {[
          { angle: 37, r: 155 },
          { angle: 118, r: 175 },
          { angle: 212, r: 145 },
          { angle: 295, r: 165 },
        ].map((b, i) => {
          const rad = (b.angle * Math.PI) / 180;
          const x = 250 + Math.cos(rad) * b.r;
          const y = 250 + Math.sin(rad) * b.r;
          return (
            <motion.circle
              key={i}
              cx={x} cy={y} r="3"
              fill="#C8A261"
              filter="url(#glowF)"
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
              style={{ originX: `${x}px`, originY: `${y}px` }}
            />
          );
        })}

        {/* ── Core ── */}
        <circle cx="250" cy="250" r={R_CORE} fill="rgba(200,162,97,0.03)" stroke="rgba(200,162,97,0.35)" strokeWidth="1" />
        <motion.circle
          cx="250" cy="250" r={R_CORE}
          fill="url(#rgCore)"
          animate={{ scale: [0.9, 1.06, 0.9], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '250px', originY: '250px' }}
        />
        <circle cx="250" cy="250" r="5" fill="#D4AF37" filter="url(#glowSoft)" />

        {/* Degree labels */}
        {[0, 90, 180, 270].map((deg, i) => {
          const rad = ((deg - 90) * Math.PI) / 180;
          const r = R_OUTER + 22;
          const x = 250 + Math.cos(rad) * r;
          const y = 250 + Math.sin(rad) * r;
          return (
            <text key={i} x={x} y={y + 3.5} textAnchor="middle" fontFamily={MONO} fontSize="9" fill="rgba(200,162,97,0.4)">{deg}°</text>
          );
        })}
      </svg>
    </motion.div>
  );
}

/* ── Status line ── */
function StatusTicker() {
  const msgs = [
    'INITIALIZING SYSTEM MODULES...',
    'LOADING ASSET PIPELINE...',
    'ESTABLISHING SECURE CONNECTION...',
    'COMPILING RENDER TARGETS...',
    'SYNCING CONTENT DELIVERY...',
  ];
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % msgs.length); setVisible(true); }, 300);
    }, 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.span animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.3 }}
      style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(200,162,97,0.45)', letterSpacing: '0.12em' }}>
      {msgs[idx]}
    </motion.span>
  );
}

/* ── Main LoadingScreen ── */
interface LoadingScreenProps {
  isVisible?: boolean;
  text?: string;
}

export function LoadingScreen({ isVisible = true, text = 'Đang tải...' }: LoadingScreenProps) {
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isVisible) { setCounter(0); setPhase(0); return; }
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    let raf: ReturnType<typeof requestAnimationFrame>;
    const start = performance.now();
    const dur = 2800;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 2.5);
      setCounter(Math.round(e * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible]);

  const LETTERS = 'LOOPS'.split('');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="hud-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            backgroundColor: '#020202',
            overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* ── Cinematic letterbox ── */}
          {(['top', 'bottom'] as const).map(side => (
            <motion.div key={side}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', [side]: 0, left: 0, right: 0,
                height: 56, background: '#000', zIndex: 15,
                transformOrigin: side,
              }}
            />
          ))}

          {/* ── Grid background ── */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(200,162,97,0.03) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(200,162,97,0.03) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }} />

          {/* Radial vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 50%, rgba(0,0,0,0.7) 100%)',
          }} />

          {/* Ambient glow */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse 50% 40% at 50% 52%, rgba(200,162,97,0.06) 0%, transparent 70%)',
            }}
          />

          {/* ── HUD corners ── */}
          {(['tl', 'tr', 'bl', 'br'] as const).map(p => <Corner key={p} pos={p} />)}

          {/* ── Side data panels ── */}
          <DataBlock side="left" />
          <DataBlock side="right" />

          {/* ── Horizontal scan line ── */}
          <motion.div
            animate={{ y: ['-50vh', '60vh'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
            style={{
              position: 'absolute', left: 0, right: 0, top: '50%',
              height: 1, pointerEvents: 'none', zIndex: 5,
              background: 'linear-gradient(90deg, transparent 0%, rgba(200,162,97,0.2) 20%, rgba(200,162,97,0.5) 50%, rgba(200,162,97,0.2) 80%, transparent 100%)',
              boxShadow: '0 0 12px rgba(200,162,97,0.15)',
            }}
          />

          {/* ── Center assembly ── */}
          <div style={{ position: 'relative', zIndex: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Reticle */}
            <div style={{ position: 'relative' }}>
              <Reticle />

              {/* LOOPS wordmark centered on top of reticle */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 4,
              }}>
                <div style={{ display: 'flex', gap: 'clamp(4px,1vw,10px)' }}>
                  {LETTERS.map((l, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                      animate={phase >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                      transition={{ delay: 0.07 * i, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontFamily: F, fontSize: 'clamp(22px,4vw,38px)',
                        fontWeight: 900, letterSpacing: '-0.03em',
                        color: '#EDE8E1',
                        textShadow: '0 0 30px rgba(200,162,97,0.4)',
                        display: 'inline-block',
                      }}
                    >
                      {l}
                    </motion.span>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={phase >= 1 ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  style={{ height: 1, width: 80, background: 'linear-gradient(90deg, transparent, rgba(200,162,97,0.6), transparent)' }}
                />

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={phase >= 2 ? { opacity: 1 } : {}}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  style={{ fontFamily: MONO, fontSize: 8, letterSpacing: '0.3em', color: 'rgba(200,162,97,0.4)', textTransform: 'uppercase' }}
                >
                  Studio
                </motion.span>
              </div>
            </div>

            {/* ── Progress section ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{ width: 'clamp(200px,28vw,320px)', marginTop: -12, display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              {/* Status ticker */}
              <div style={{ textAlign: 'center', height: 14, overflow: 'hidden' }}>
                <StatusTicker />
              </div>

              {/* Bar track */}
              <div style={{ position: 'relative', height: 2, background: 'rgba(200,162,97,0.1)', borderRadius: 99, overflow: 'hidden' }}>
                <motion.div
                  animate={{ width: `${counter}%` }}
                  style={{
                    position: 'absolute', inset: 0, left: 0,
                    background: 'linear-gradient(90deg, rgba(200,162,97,0.5), #D4AF37)',
                    boxShadow: '0 0 10px rgba(200,162,97,0.7), 0 0 20px rgba(200,162,97,0.3)',
                    borderRadius: 99,
                    width: 0,
                  }}
                />
                {/* Cursor dot at leading edge */}
                <motion.div
                  animate={{ left: `calc(${counter}% - 4px)` }}
                  style={{
                    position: 'absolute', top: -3, width: 8, height: 8,
                    borderRadius: '50%', background: '#D4AF37',
                    boxShadow: '0 0 8px rgba(212,175,55,0.9)',
                  }}
                />
              </div>

              {/* Counter row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Waveform />
                <motion.span style={{
                  fontFamily: MONO, fontSize: 14, fontWeight: 700,
                  color: '#C8A261', letterSpacing: '0.04em',
                  textShadow: '0 0 12px rgba(200,162,97,0.5)',
                }}>
                  {String(counter).padStart(3, '0')}
                  <span style={{ fontSize: 9, color: GOLD_DIM, marginLeft: 2 }}>%</span>
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* ── Top HUD bar ── */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              position: 'absolute', top: 56, left: 0, right: 0,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px clamp(16px,3vw,40px)',
              borderBottom: '1px solid rgba(200,162,97,0.07)',
              zIndex: 12,
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(200,162,97,0.3)', letterSpacing: '0.18em' }}>SYS::BOOT</span>
            <span style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(200,162,97,0.3)', letterSpacing: '0.18em' }}>LOOPS v2.0</span>
            <span style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(200,162,97,0.3)', letterSpacing: '0.18em' }}>SEC::ACTIVE</span>
          </motion.div>

          {/* ── Bottom HUD bar ── */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              position: 'absolute', bottom: 56, left: 0, right: 0,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px clamp(16px,3vw,40px)',
              borderTop: '1px solid rgba(200,162,97,0.07)',
              zIndex: 12,
            }}
          >
            <div style={{ display: 'flex', gap: 16 }}>
              {['CPU 12%', 'MEM 340MB', 'NET OK'].map(s => (
                <span key={s} style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(200,162,97,0.3)', letterSpacing: '0.12em' }}>{s}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: '#C8A261', boxShadow: '0 0 6px rgba(200,162,97,0.9)' }}
              />
              <span style={{ fontFamily: MONO, fontSize: 9, color: 'rgba(200,162,97,0.4)', letterSpacing: '0.15em' }}>LIVE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
