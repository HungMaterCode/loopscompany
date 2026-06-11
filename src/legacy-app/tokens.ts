import type { CSSProperties } from "react";

export const BG       = "var(--vw-bg)";
export const RED      = "var(--vw-accent)";
export const RED_DIM  = "rgba(var(--vw-accent-rgb),0.12)";
export const RED_MED  = "rgba(var(--vw-accent-rgb),0.22)";
export const TEXT     = "var(--vw-text)";
export const TEXT60   = "var(--vw-text-60)";
export const TEXT35   = "var(--vw-text-35)";
export const BORDER   = "var(--vw-border)";
export const BORDER_M = "var(--vw-border-m)";
export const EASE: [number,number,number,number] = [0.16,1,0.3,1];

export const GLASS: CSSProperties = {
  background:           "var(--vw-glass-bg)",
  backdropFilter:       "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border:               "1px solid var(--vw-glass-border)",
  boxShadow:            "var(--vw-glass-shadow)",
};

export const GLASS_LIGHT: CSSProperties = {
  background:           "var(--vw-glass-light-bg)",
  backdropFilter:       "blur(28px) saturate(200%)",
  WebkitBackdropFilter: "blur(28px) saturate(200%)",
  border:               "1px solid var(--vw-glass-border)",
  boxShadow:            "var(--vw-glass-shadow)",
};

export const GLOBAL_CSS = `
@keyframes kbZoom    { from{transform:scale(1)} to{transform:scale(1.1)} }
@keyframes float     { 0%,100%{transform:translateY(0px) rotate(-1.5deg)} 50%{transform:translateY(-14px) rotate(-1.5deg)} }
@keyframes float2    { 0%,100%{transform:translateY(0px) rotate(1.5deg)}  50%{transform:translateY(-10px) rotate(1.5deg)} }
@keyframes vwMarq    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes scrollL   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes scrollR   { from{transform:translateX(-50%)} to{transform:translateX(0)} }
@keyframes pulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.92)} }
@keyframes floatOrb  { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(30px,-40px) scale(1.08)} 70%{transform:translate(-20px,20px) scale(0.94)} }
@keyframes floatOrb2 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(-25px,35px) scale(0.95)} 70%{transform:translate(20px,-20px) scale(1.06)} }
@keyframes glowPulse { 0%,100%{box-shadow:0 0 20px rgba(var(--vw-accent-rgb),0.3),0 8px 32px rgba(0,0,0,0.5)} 50%{box-shadow:0 0 40px rgba(var(--vw-accent-rgb),0.55),0 8px 48px rgba(0,0,0,0.6)} }
@keyframes teamCard  { from{opacity:0;transform:translateY(32px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }

.hero-kb   { animation:kbZoom 7s ease-out forwards; width:100%; height:100%; object-fit:cover; }
.mockup-f1 { animation:float  5s ease-in-out infinite; }
.mockup-f2 { animation:float2 5.8s ease-in-out infinite; }
.vwTrack   { animation:vwMarq 35s linear infinite; display:flex; width:max-content; }
.port-row1 { animation:scrollL 55s linear infinite; display:flex; width:max-content; }
.port-row2 { animation:scrollR 55s linear infinite; display:flex; width:max-content; }
.port-row1:hover,.port-row2:hover { animation-play-state:paused; }
.glow-card { animation:glowPulse 3s ease-in-out infinite; }

.port-item:hover .port-overlay { opacity:1!important; }
.port-item:hover .port-img     { transform:scale(1.06)!important; }
.port-item:hover .port-text    { opacity:1!important; transform:translateY(0)!important; }
.svc-img   { transition:transform 0.6s ease; }
.svc-card:hover .svc-img { transform:scale(1.07)!important; }
.svc-card:hover { box-shadow:0 0 30px rgba(var(--vw-accent-rgb),0.18),0 24px 64px rgba(0,0,0,0.6)!important; }
.team-card:hover .team-overlay { opacity:1!important; }
.team-card:hover img { transform:scale(1.06)!important; }

/* Nav */
.nav-links   { display:flex; }
.nav-cta-btn { display:flex; }
.hamburger   { display:none; }

/* Responsive */
@media(max-width:900px) {
  .nav-links   { display:none!important; }
  .nav-cta-btn { display:none!important; }
  .hamburger   { display:flex!important; }
  .hero-mockup  { display:none!important; }
  .why-grid     { grid-template-columns:1fr!important; }
  .contact-grid { grid-template-columns:1fr!important; }
  .process-arrow{ display:none!important; }
  .team-grid    { grid-template-columns:repeat(2,1fr)!important; }
}
@media(max-width:768px) {
  .hero-grid    { grid-template-columns:1fr!important; }
  .footer-grid  { grid-template-columns:1fr 1fr!important; }
  .plans-grid   { grid-template-columns:repeat(2,1fr)!important; }
}
@media(max-width:560px) {
  .team-grid  { grid-template-columns:1fr!important; }
  .hero-ctas  { flex-direction:column!important; align-items:flex-start!important; }
  .hero-stats { gap:20px!important; }
  .plans-grid { grid-template-columns:1fr!important; }
  .port-item  { width:220px!important; height:140px!important; }
}
`;
