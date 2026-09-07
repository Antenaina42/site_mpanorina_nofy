'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-0 overflow-hidden bg-dark">
      <div className="relative h-[70vh] md:h-[90vh] w-full flex items-center justify-center">
        <motion.div className="absolute inset-0 will-change-transform" style={{ y, scale }}>
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90"
            alt="Impact de la construction"
            fill
            className="object-cover"
            quality={95}
          />
          <div className="absolute inset-0 bg-dark/75" />
        </motion.div>

        <motion.div
          className="relative z-10 text-center px-8 max-w-5xl mx-auto"
          style={{ opacity }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[2px] bg-gold-500 mx-auto mb-10 origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[1.05] tracking-tight uppercase"
          >
            <span className="text-gold-500">&ldquo;</span>
            Un peuple qui batit
            <br />
            est un peuple qui
            <br />
            <span className="text-gold-500">croit en son avenir.</span>
            <span className="text-gold-500">&rdquo;</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white/30 text-sm tracking-[0.3em] uppercase mt-10 font-inter"
          >
            La philosophie de MPANORINA NOFY
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
