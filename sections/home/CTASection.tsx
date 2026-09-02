'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import Button from '@/components/ui/Button';
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
      } catch (err) {
        // fallback
      }
    }
    fetchCTA();
  }, []);

  const title = ctaData.title || 'PRÊT À CONSTRUIRE VOTRE PROJET ?';

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={ctaData.bgImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80'}
          alt="Bâtiment"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-dark/75" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <ScrollReveal>
          <AnimatedText 
            key={title}
            text={title} 
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 justify-center"
          />
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 font-inter max-w-2xl mx-auto">
            {ctaData.subtitle || 'Transformons votre vision en réalité.'}
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            href={ctaData.btnHref || '/contact'} 
            variant="primary" 
            className="bg-gold-500 hover:bg-gold-400 text-dark font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            {ctaData.btnText || 'Demander un devis'}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
