'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { approachSteps } from '@/data/process';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ApproachSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const current = approachSteps[activeStep] || approachSteps[0];

  // Optional subtle auto-advance every 6 seconds if not hovered/interacting
  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % approachSteps.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoplay]);

  const handleNext = () => {
    setIsAutoplay(false);
    setActiveStep((prev) => (prev + 1) % approachSteps.length);
  };

  const handlePrev = () => {
    setIsAutoplay(false);
    setActiveStep((prev) => (prev - 1 + approachSteps.length) % approachSteps.length);
  };

  const handleSelect = (index: number) => {
    setIsAutoplay(false);
    setActiveStep(index);
  };

  return (
    <section 
      className="py-20 md:py-32 bg-[#F2F2EE] relative overflow-hidden"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <ScrollReveal>
            <div>
              <span className="inline-block text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-gold-500 mb-3">
                COMMENT NOUS TRAVAILLONS
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-dark">
                NOTRE APPROCHE
              </h2>
            </div>
          </ScrollReveal>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Étape précédente"
              className="w-12 h-12 rounded-full border border-dark/20 bg-white hover:bg-teal-500 hover:text-white hover:border-teal-500 flex items-center justify-center transition-all duration-300 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Étape suivante"
              className="w-12 h-12 rounded-full border border-dark/20 bg-white hover:bg-teal-500 hover:text-white hover:border-teal-500 flex items-center justify-center transition-all duration-300 shadow-sm"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {approachSteps.map((step, index) => {
            const isActive = index === activeStep;
            return (
              <button
                key={step.number}
                onClick={() => handleSelect(index)}
                className={`flex items-center gap-3 p-4 rounded-lg text-left transition-all duration-300 border ${
                  isActive
                    ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
                    : 'bg-white/60 border-border-light hover:bg-white hover:border-border-light/80'
                }`}
              >
                <span
                  className={`text-lg font-display font-bold transition-colors ${
                    isActive ? 'text-teal-600' : 'text-muted/60'
                  }`}
                >
                  {step.number}
                </span>
                <div className="truncate">
                  <span
                    className={`block text-xs uppercase tracking-wider font-semibold truncate ${
                      isActive ? 'text-dark' : 'text-muted'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Spotlight Card */}
        <div className="bg-white rounded-2xl p-6 md:p-12 shadow-xl border border-border-light relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Text description */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl md:text-5xl font-display font-black text-gold-500">
                    {current.number}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                    Étape {activeStep + 1} sur {approachSteps.length}
                  </span>
                </div>

                <h3 className="text-2xl md:text-4xl font-display font-bold text-dark mb-5">
                  {current.title}
                </h3>

                <p className="text-muted text-base md:text-lg leading-relaxed mb-8">
                  {current.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-border-light">
                  <div className="flex items-center gap-3 text-sm text-dark font-medium">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    <span>Engagement qualité et rigueur technique à chaque étape</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-dark font-medium">
                    <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0" />
                    <span>Accompagnement personnalisé et suivi rigoureux</span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Res Image with smooth zoom */}
              <div className="lg:col-span-6">
                <div className="relative w-full h-[320px] md:h-[420px] rounded-xl overflow-hidden shadow-inner group">
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <span className="text-xs tracking-widest uppercase font-semibold text-white/80">
                      MPANORINA NOFY — Savoir-faire
                    </span>
                    <span className="text-xs font-mono bg-white/20 backdrop-blur-md px-3 py-1 rounded">
                      0{activeStep + 1} / 05
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Visual Progress Line */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex-1 h-1.5 bg-dark/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 via-gold-400 to-gold-500"
              initial={{ width: '20%' }}
              animate={{ width: `${((activeStep + 1) / approachSteps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-xs font-mono text-muted uppercase">
            Étape {activeStep + 1} / {approachSteps.length}
          </span>
        </div>
      </div>
    </section>
  );
}
