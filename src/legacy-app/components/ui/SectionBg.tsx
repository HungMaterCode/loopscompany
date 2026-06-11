interface SectionBgProps {
  src: string;
  overlayOpacity?: number;
}

export function SectionBg({ src, overlayOpacity = 0.82 }: SectionBgProps) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.6)" }} />
      <div className="section-overlay" style={{ position: "absolute", inset: 0, backgroundColor: `rgba(2,2,2,${overlayOpacity})` }} />
    </div>
  );
}

interface OrbProps {
  size?: number;
  color?: string;
  opacity?: number;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  delay?: number;
}

export function Orb({ size = 500, color = "#D43B1F", opacity = 0.15, top, left, right, bottom, delay = 0 }: OrbProps) {
  return (
    <div style={{
      display: 'none',
      position: "absolute", width: size, height: size, borderRadius: "50%",
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity, pointerEvents: "none", zIndex: 0,
      top, left, right, bottom,
      animation: `floatOrb ${7 + delay}s ease-in-out ${delay}s infinite`,
    }} />
  );
}

export function GridPattern({ opacity: _opacity = 0.04 }: { opacity?: number }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage: `linear-gradient(var(--vw-gridline-color) 1px, transparent 1px), linear-gradient(90deg, var(--vw-gridline-color) 1px, transparent 1px)`,
      backgroundSize: "60px 60px",
    }} />
  );
}
