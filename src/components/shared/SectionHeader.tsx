import { motion } from 'motion/react';

const F = "inherit";

interface SectionHeaderProps {
  /** Small-caps label above heading (e.g. "DỊCH VỤ") */
  label: string;
  /** Main part of the h2 heading */
  headingMain: string;
  /** Italic dim part of the heading (appended after headingMain with a space) */
  headingEm?: string;
  /** Gray description text below heading */
  description?: string;
  /** Text alignment — defaults to 'center' */
  align?: 'left' | 'center';
  /** Controls fade-in animation (tie to useInView) — defaults to true */
  inView?: boolean;
  /** Animation delay in seconds */
  delay?: number;
  /** Bottom margin override */
  mb?: string;
}

export function SectionHeader({
  label,
  headingMain,
  headingEm,
  description,
  align = 'center',
  inView = true,
  delay = 0,
  mb = 'clamp(32px, 5vw, 56px)',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      style={{ marginBottom: mb, textAlign: isCenter ? 'center' : 'left' }}
    >
      {/* Label row */}
      <div style={{
        display: isCenter ? 'inline-flex' : 'flex',
        alignItems: 'center', gap: '10px', marginBottom: '18px',
      }}>
        <div style={{ width: '20px', height: '1px', background: 'var(--sc-accent)' }} />
        <span style={{
          fontFamily: F, fontSize: '10px', letterSpacing: '0.22em',
          color: 'var(--sc-accent)', fontWeight: 700,
        }}>
          {label}
        </span>
        {isCenter && <div style={{ width: '20px', height: '1px', background: 'var(--sc-accent)' }} />}
      </div>

      {/* Heading */}
      <h2 style={{
        fontSize: 'clamp(28px, 4.5vw, 64px)',
        fontWeight: 800, color: 'var(--sc-text)',
        letterSpacing: '-0.04em',
        margin: description ? '0 0 16px' : 0,
        lineHeight: 1.1,
      }}>
        {headingMain}
        {headingEm && (
          <>
            {' '}
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--sc-text-45)' }}>
              {headingEm}
            </em>
          </>
        )}
      </h2>

      {/* Description */}
      {description && (
        <p style={{
          fontFamily: F, fontSize: '14px',
          color: 'var(--sc-text-45)', lineHeight: 1.75,
          maxWidth: isCenter ? '440px' : 'none',
          margin: isCenter ? '0 auto' : 0,
        }}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
