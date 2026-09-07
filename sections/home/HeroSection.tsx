'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { defaultSiteContent } from '@/lib/defaultContent';

// Cinematic phrases that rotate — like a manifesto
const CINEMATIC_LINES = [
  'UNE ŒUVRE.',
  'UN HÉRITAGE.',
  'UNE LÉGENDE.',
];

export default function HeroSection() {
  const [heroData, setHeroData] = useState(defaultSiteContent.home.hero);
  const [lineIndex, setLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: image moves slower than scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    async function fetchHero() {
      try {
        const res = await fetch('/api/content?section=home');
        const data = await res.json();
        if (data.success && data.data?.hero) {
          setHeroData(data.data.hero);
        }
      } catch (err) {}
    }
    fetchHero();
  }, []);

  // Rotate cinematic lines every 2.2s
  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % CINEMATIC_LINES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const cursor = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(cursor);
  }, []);

  const bgImage =
    heroData?.bgImage ||
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90';

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* ─────────────────── BACKGROUND IMAGE with parallax ─────────────────── */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: bgY, scale: 1.08 }}
      >
        <Image
          src={bgImage}
          alt="Architecture MPANORINA NOFY"
          fill
          priority
          className="object-cover"
          quality={95}
        />
      </motion.div>

      {/* ─────────────────── LAYERED CINEMATIC OVERLAYS ─────────────────── */}
      <div className="absolute inset-0 z-10 bg-black/55" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

      {/* ─────────────────── MAIN CONTENT ─────────────────── */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col justify-between px-8 md:px-16 lg:px-24 pt-36 pb-16"
        style={{ y: contentY, opacity }}
      >
        {/* TOP: Manifesto label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4"
        >
          <div className="w-8 h-[1px] bg-yellow-400" />
          <span className="text-yellow-400 text-xs tracking-[0.35em] uppercase font-medium">
            MPANORINA NOFY — Madagascar
          </span>
        </motion.div>

        {/* CENTER: Main hero text */}
        <div className="flex flex-col gap-0 max-w-5xl">
          {/* Eyebrow line */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/50 text-sm md:text-base tracking-[0.2em] uppercase mb-6"
          >
            Ce que vous construisez ne disparaît jamais.
          </motion.p>

          {/* Huge cinematic title — static part */}
          <div className="overflow-hidden mb-0">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.5rem,9vw,8.5rem)] font-display font-black text-white leading-[0.88] tracking-tight uppercase"
            >
              BÂTIR
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.5rem,9vw,8.5rem)] font-display font-black text-white leading-[0.88] tracking-tight uppercase"
            >
              {"C'EST"}
            </motion.h1>
          </div>

          {/* Animated rotating word — the emotional hook */}
          <div className="overflow-hidden mb-8">
            <AnimatePresence mode="wait">
              <motion.h1
                key={lineIndex}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-110%', opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3.5rem,9vw,8.5rem)] font-display font-black leading-[0.88] tracking-tight uppercase text-yellow-400"
              >
                {CINEMATIC_LINES[lineIndex]}
                <span
                  className="text-yellow-300"
                  style={{
                    opacity: showCursor ? 1 : 0,
                    transition: 'opacity 0.1s',
                  }}
                >
                  |
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Sub-manifesto */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/60 text-base md:text-lg font-inter max-w-lg leading-relaxed"
          >
            Un bâtiment n&apos;est pas du béton. C&apos;est une mémoire.
            C&apos;est l&apos;histoire que les générations liront dans vos murs.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-8"
          >
            {/* Primary CTA */}
            <a
              href={heroData?.btnPrimaryHref || '/contact'}
              className="group relative inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">
                {heroData?.btnPrimaryText || 'Démarrer votre œuvre'}
              </span>
              <svg
                className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </a>

            {/* Secondary ghost CTA */}
            <a
              href={heroData?.btnSecondaryHref || '/realisations'}
              className="group inline-flex items-center gap-3 text-white/60 hover:text-white text-sm tracking-widest uppercase transition-colors duration-300"
            >
              <span className="w-6 h-[1px] bg-white/40 group-hover:w-10 group-hover:bg-white transition-all duration-300" />
              {heroData?.btnSecondaryText || 'Voir nos réalisations'}
            </a>
          </motion.div>
        </div>

        {/* BOTTOM ROW: stat strip + scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.0 }}
          className="flex items-end justify-between"
        >
          {/* Stat strip */}
          <div className="flex items-center gap-10">
            {[
              { value: '100+', label: 'Projets livrés' },
              { value: '15+', label: "Années d'expérience" },
              { value: '100%', label: 'Engagement qualité' },
            ].map((stat, i) => (
              <div key={i} className="hidden sm:block">
                <div className="text-2xl md:text-3xl font-display font-black text-white">
                  {stat.value}
                </div>
                <div className="text-white/40 text-xs tracking-widest uppercase mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-[1px] h-14 bg-white/20 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full bg-yellow-400"
                animate={{ height: ['0%', '100%'] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
              />
            </div>
            <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">
              Défiler
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ─────────────────── VERTICAL TEXT DECORATION ─────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/2 right-8 md:right-14 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-4"
      >
        <span
          className="text-white/15 text-[10px] tracking-[0.4em] uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          Architecture · Construction · Héritage
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/15 to-transparent" />
      </motion.div>
    </section>
  );
}

