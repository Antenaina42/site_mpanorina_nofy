'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { defaultSiteContent } from '@/lib/defaultContent';

export default function CTASection() {
  const [ctaData, setCtaData] = useState(defaultSiteContent.home.cta);

  useEffect(() => {
    async function fetchCTA() {
      try {
        const res = await fetch('/api/content?section=home');
        const data = await res.json();
        if (data.success && data.data?.cta) {
          setCtaData(data.data.cta);
        }
      } catch (err) {}
    }
    fetchCTA();
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-dark">
      <div className="absolute inset-0 z-0">
        <Image
          src={ctaData.bgImage || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90'}
          alt="Votre oeuvre"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/60" />
      </div>

      <div className="relative z-10 container mx-auto px-8 md:px-16 text-left max-w-5xl">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.35em] uppercase">
              VOTRE HERITAGE COMMENCE ICI
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[0.9] tracking-tight uppercase mb-6">
            VOTRE NOM<br />
            SERA GRAVE<br />
            <span className="text-gold-500">DANS LA PIERRE.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed mb-12 font-inter">
            Dans 100 ans, ce que vous construisez aujourd&apos;hui sera encore debout.
            C&apos;est la seule forme d&apos;immortalite accessible a l&apos;homme.
            Alors batissez quelque chose qui merite de durer.
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start gap-5"
        >
          <a
            href={ctaData.btnHref || '/contact'}
            className="group relative inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-400 text-black font-bold text-sm tracking-widest uppercase px-10 py-5 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">
              {ctaData.btnText || 'Demarrer mon oeuvre'}
            </span>
            <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <a
            href="/services"
            className="group inline-flex items-center gap-3 text-white/50 hover:text-white text-sm tracking-widest uppercase transition-colors duration-300 py-5"
          >
            <span className="w-6 h-[1px] bg-white/30 group-hover:w-10 group-hover:bg-white transition-all duration-300" />
            Découvrir nos services
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
    </section>
  );
}
