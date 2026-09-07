'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { defaultSiteContent } from '@/lib/defaultContent';

export default function IntroSection() {
  const [introData, setIntroData] = useState(defaultSiteContent.home.intro);

  useEffect(() => {
    async function fetchIntro() {
      try {
        const res = await fetch('/api/content?section=home');
        const data = await res.json();
        if (data.success && data.data?.intro) {
          setIntroData(data.data.intro);
        }
      } catch (err) {}
    }
    fetchIntro();
  }, []);

  const introImage = introData.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=90';

  return (
    <section className="bg-dark py-24 md:py-36 overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          <div className="lg:col-span-5 relative">
            <ScrollReveal delay={0.1}>
              <div className="relative w-full h-[500px] sm:h-[600px] overflow-hidden">
                <div className="relative w-[85%] h-full ml-auto overflow-hidden">
                  <Image
                    src={introImage}
                    alt="Le batisseur qui transforme Madagascar"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="w-8 h-[1px] bg-gold-500 mb-3" />
                    <p className="text-white/60 text-xs tracking-[0.25em] uppercase">
                      Le batisseur ne construit pas des murs.
                    </p>
                    <p className="text-white font-display font-bold text-base mt-1">
                      Il construit l&apos;avenir d&apos;une nation.
                    </p>
                  </div>
                </div>
                <div className="absolute top-8 left-0 w-[30%] h-[40%] bg-gold-500/10 border border-gold-500/20" />
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="absolute top-12 left-0 bg-white/5 backdrop-blur-sm border border-white/10 px-5 py-4"
                >
                  <div className="text-3xl font-display font-black text-gold-500">x3</div>
                  <div className="text-white/50 text-[10px] tracking-[0.2em] uppercase mt-1">
                    Impact economique<br/>indirect
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[1px] bg-gold-500" />
                <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-medium">
                  NOTRE CONVICTION
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white leading-[1] tracking-tight uppercase mb-6">
                {introData.title1 || 'CELUI QUI'}
                <br />
                <span className="text-gold-500">{introData.title2 || 'BATIT'}</span>
                <br />
                {'CHANGE LE MONDE.'}
              </h2>
            </ScrollReveal>

            <div className="w-16 h-[2px] bg-gold-500 mb-8" />

            <ScrollReveal delay={0.25}>
              <p className="text-white/60 text-lg leading-relaxed mb-6 max-w-xl font-inter">
                {introData.text ||
                  "Mohammed Al Mubarak n'a pas commande une tour. Il a decide de changer le regard du monde sur son pays. Aujourd'hui, le Burj Khalifa est la preuve vivante qu'un batiment peut redefnir une civilisation."}
              </p>
              <p className="text-white/40 text-base leading-relaxed max-w-xl font-inter">
                A Madagascar, MPANORINA NOFY porte cette meme conviction :
                chaque fondation posee est un acte de transformation sociale.
                Chaque mur erige est une promesse faite aux generations futures.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/10">
                {[
                  { number: 'inf', label: 'Generations impactees', sub: 'par chaque batiment construit' },
                  { number: '100%', label: 'Emplois locaux', sub: "main-d'oeuvre malgache qualifiee" },
                  { number: '50+', label: 'Familles logees', sub: 'par chaque projet residentiel' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="text-2xl md:text-3xl font-display font-black text-gold-500 mb-1">
                      {item.number}
                    </div>
                    <div className="text-white text-xs font-bold uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <div className="text-white/30 text-[11px] leading-tight">
                      {item.sub}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
