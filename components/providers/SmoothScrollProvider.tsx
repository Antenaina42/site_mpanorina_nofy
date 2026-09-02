'use client';

import { useEffect, useRef } from 'react';

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let lenisInstance: any = null;
    let rafId: number | null = null;

    const initLenis = async () => {
      try {
        const LenisModule = (await import('@studio-freight/lenis')).default;
        lenisInstance = new LenisModule({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
        });

        lenisRef.current = lenisInstance;

        const raf = (time: number) => {
          if (lenisInstance) {
            lenisInstance.raf(time);
            rafId = requestAnimationFrame(raf);
          }
        };

        rafId = requestAnimationFrame(raf);
      } catch (err) {
        console.warn('Lenis smooth scroll failed to initialize:', err);
      }
    };

    initLenis();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) {
        try {
          lenisInstance.destroy();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  return <>{children}</>;
}
