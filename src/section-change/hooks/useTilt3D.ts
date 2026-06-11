import { useRef, useCallback } from 'react';

export function useTilt3D(strength = 14, perspective = 800) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transition = 'transform 0.08s linear';
      el.style.transform = `perspective(${perspective}px) rotateY(${x * strength * 2}deg) rotateX(${-y * strength}deg) scale3d(1.025, 1.025, 1.025)`;
    },
    [strength, perspective]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    el.style.transform = `perspective(${perspective}px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
  }, [perspective]);

  return { ref, onMouseMove, onMouseLeave };
}
