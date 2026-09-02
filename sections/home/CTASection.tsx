'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function CTASection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
          alt="Bâtiment"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-dark/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <ScrollReveal>
          <AnimatedText 
            text="PRÊT À CONSTRUIRE VOTRE PROJET ?" 
            tag="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 justify-center"
          />
          <p className="text-xl md:text-2xl text-white/80 mb-10 font-inter max-w-2xl mx-auto">
            Transformons votre vision en réalité.
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            href="/contact" 
            variant="primary" 
            className="bg-gold-500 hover:bg-gold-400 text-dark font-semibold px-8 py-4 rounded-md transition-all duration-300 transform hover:scale-105"
          >
            Demander un devis
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
