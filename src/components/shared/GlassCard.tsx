import { CSSProperties, ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  /** Gold-tinted glass variant for warm sections */
  warm?: boolean;
  /** Border radius in px — defaults to 20 */
  radius?: number;
  /** Extra glow color (hex or rgba) added to box-shadow */
  glow?: string;
  onClick?: () => void;
}

/**
 * Glassmorphism card — backdrop-blur with subtle border and inner highlight.
 * Drop it anywhere as a replacement for a plain <div> container.
 */
export function GlassCard({
  children,
  style,
  className,
  warm = false,
  radius = 20,
  glow,
  onClick,
}: GlassCardProps) {
  const glowShadow = glow ? `, 0 0 60px ${glow}` : '';
  const bg = warm ? 'rgba(200,162,97,0.05)' : 'rgba(255,255,255,0.04)';
  const border = warm
    ? '1px solid rgba(200,162,97,0.14)'
    : '1px solid rgba(255,255,255,0.09)';
  const shadow = warm
    ? `0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(200,162,97,0.1)${glowShadow}`
    : `0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)${glowShadow}`;

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: bg,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border,
        boxShadow: shadow,
        borderRadius: `${radius}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
