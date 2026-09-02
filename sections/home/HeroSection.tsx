'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/site';
import Button from '@/components/ui/Button';

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const sentenceVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function HeroSection() {
  const title = 'NOUS CONSTRUISONS VOS RÊVES';
  const words = title.split(' ');

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-dark">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
          alt="Construction background"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/60 to-dark/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center text-center mt-20">
        <motion.div
          className="overflow-hidden mb-6"
          variants={sentenceVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-hero font-display text-white font-bold tracking-tight">
            {words.map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block mr-[0.2em]"
                variants={wordVariants}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        <motion.p
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mb-10 font-inter"
        >
          De la vision aux fondations. Des fondations à la réalité.
        </motion.p>

        <motion.div
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            href="/realisations"
            className="border-white text-white hover:bg-white hover:text-dark bg-transparent border-2"
          >
            Découvrir nos réalisations
          </Button>
          <Button
            href="/contact"
            className="bg-gold-500 text-white hover:bg-gold-600 border-2 border-gold-500 hover:border-gold-600"
          >
            Demander un devis
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-white/60 text-xs tracking-widest uppercase mb-3"
        >
          SCROLL TO EXPLORE
        </motion.span>
        <div className="h-[60px] w-[1px] bg-white/20 overflow-hidden relative">
          <motion.div
            initial={{ top: '-100%' }}
            animate={{ top: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="absolute left-0 w-full h-full bg-white"
          />
        </div>
      </div>
    </section>
  );
}
