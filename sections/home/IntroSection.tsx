'use client';

import React from 'react';
import Image from 'next/image';
import AnimatedText from '@/components/ui/AnimatedText';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { siteConfig } from '@/data/site';
import { ShieldCheck, Award } from 'lucide-react';

export default function IntroSection() {
  const introImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80';

  return (
    <section className="bg-[#FAFAF8] py-20 md:py-28 lg:py-32 px-5 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-8">
              <AnimatedText 
                text={siteConfig.introTitle?.[0] || "BÂTIR AUJOURD'HUI."} 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark mb-2"
              />
              <AnimatedText 
                text={siteConfig.introTitle?.[1] || "IMAGINER DEMAIN."} 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark text-opacity-70"
              />
            </div>
            
            <div className="w-20 h-1 bg-gold-500 mb-8 rounded-full" />
            
            <ScrollReveal>
              <p className="text-base sm:text-lg md:text-xl text-muted font-inter max-w-2xl leading-relaxed mb-8">
                {siteConfig?.introText || "MPANORINA NOFY est une entreprise de construction ambitieuse, fondée avec la conviction que chaque projet mérite excellence et engagement. Spécialisés dans le gros œuvre et la construction de bâtiments à Madagascar, nous transformons les visions architecturales en réalités solides et durables."}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border-light max-w-lg">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-sm">Gros Œuvre &amp; Solidité</h4>
                    <p className="text-xs text-muted mt-0.5">Normes de construction strictes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gold-50 text-gold-600 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-sm">Savoir-Faire Premium</h4>
                    <p className="text-xs text-muted mt-0.5">Équipe qualifiée &amp; rigueur</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Side: High-Impact Image Card */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal delay={0.15}>
              <div className="relative w-full h-[440px] sm:h-[500px] lg:h-[560px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-light-gray group">
                <Image 
                  src={introImage}
                  alt="Architecture et Construction MPANORINA NOFY"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Subtle dark gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent opacity-60" />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/40 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-gold-600 font-bold block">
                      MPANORINA NOFY
                    </span>
                    <span className="text-sm font-bold text-dark">
                      Excellence &amp; Gros Œuvre à Madagascar
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>

              {/* Decorative accent element behind the image */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold-500/10 rounded-2xl -z-10 hidden sm:block" />
            </ScrollReveal>
          </div>
          
        </div>
      </div>
    </section>
  );
}
