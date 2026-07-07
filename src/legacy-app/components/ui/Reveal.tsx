import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "../../../features/legacy-core/tokens";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  direction?: "up" | "left" | "right" | "scale" | "none";
}

export function Reveal({ children, delay = 0, className = "", style = {}, direction = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const initial = {
    opacity: 0,
    y:     direction === "up"    ? 36 : 0,
    x:     direction === "left"  ? -40 : direction === "right" ? 40 : 0,
    scale: direction === "scale" ? 0.90 : 1,
    rotateX: direction === "up"  ? 6  : 0,
  };
  return (
    <motion.div ref={ref} className={className} style={{ ...style, transformPerspective: 800 }}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0 } : {}}
      transition={{ delay, duration: 0.72, ease: EASE }}>
      {children}
    </motion.div>
  );
}

interface RevealTextProps {
  text: string;
  className?: string;
  color?: string;
}

export function RevealText({ text, className = "", color }: RevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const chars = text.split("");
  return (
    <p ref={ref} className={className} style={{ color, lineHeight: 1.75, margin: 0 }}>
      {chars.map((c, i) => (
        <motion.span key={i}
          initial={{ opacity: 0.12 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: i * 0.009, duration: 0.3, ease: "easeOut" }}>
          {c}
        </motion.span>
      ))}
    </p>
  );
}
