'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 3 seconds total cinematic opening
    const duration = 2800; // time to reach 100%
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 200); // exactly 3.0s total
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FAFAF8]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center gap-8 max-w-sm px-6 text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-28 h-28"
            >
              <Image
                src="/logo.jpg"
                alt="MPANORINA NOFY"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Architectural Lines Cinematic Animation */}
            <div className="relative w-56 h-28">
              <svg viewBox="0 0 200 100" className="w-full h-full">
                {/* Foundation line */}
                <motion.line
                  x1="20" y1="90" x2="180" y2="90"
                  stroke="#1A5167" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: 'easeInOut' }}
                />
                {/* Left wall */}
                <motion.line
                  x1="45" y1="90" x2="45" y2="35"
                  stroke="#1A5167" strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: 'easeInOut' }}
                />
                {/* Right wall */}
                <motion.line
                  x1="155" y1="90" x2="155" y2="35"
                  stroke="#1A5167" strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: 'easeInOut' }}
                />
                {/* Center beam */}
                <motion.line
                  x1="45" y1="35" x2="155" y2="35"
                  stroke="#1A5167" strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 1.0, ease: 'easeInOut' }}
                />
                {/* Roof left (Gold) */}
                <motion.line
                  x1="40" y1="35" x2="100" y2="12"
                  stroke="#C8962C" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 1.3, ease: 'easeInOut' }}
                />
                {/* Roof right (Gold) */}
                <motion.line
                  x1="160" y1="35" x2="100" y2="12"
                  stroke="#C8962C" strokeWidth="2.5" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 1.3, ease: 'easeInOut' }}
                />
                {/* Window left */}
                <motion.rect
                  x="65" y="48" width="22" height="25" rx="1"
                  stroke="#1A5167" strokeWidth="1.5" fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.7 }}
                />
                {/* Window right */}
                <motion.rect
                  x="113" y="48" width="22" height="25" rx="1"
                  stroke="#1A5167" strokeWidth="1.5" fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.7 }}
                />
                {/* Entrance Door (Gold) */}
                <motion.rect
                  x="88" y="58" width="24" height="32" rx="1"
                  stroke="#C8962C" strokeWidth="1.5" fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 2.0 }}
                />
              </svg>
            </div>

            {/* Progress Bar & Percentage */}
            <div className="w-56 space-y-2">
              <div className="w-full h-[3px] bg-dark/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-500 via-gold-400 to-gold-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono text-muted">
                <span className="tracking-[0.2em] uppercase font-semibold text-teal-700">Chargement</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Company Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-1"
            >
              <h2 className="text-base font-bold tracking-[0.25em] text-dark font-display">
                MPANORINA NOFY
              </h2>
              <p className="text-xs text-muted font-medium">
                Bâtir aujourd&apos;hui. Imaginer demain.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
