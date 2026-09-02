'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { defaultSiteContent } from '@/lib/defaultContent';

export default function VideoSection() {
  const [videoData, setVideoData] = useState(defaultSiteContent.home.video);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const res = await fetch('/api/content?section=home');
        const data = await res.json();
        if (data.success && data.data?.video) {
          setVideoData(data.data.video);
        }
      } catch (err) {
        // fallback
      }
    }
    fetchVideo();
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.6, 0.8], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.3, 0.8], [0, -50]);

  return (
    <section className="py-16 md:py-24 bg-light overflow-hidden" ref={containerRef}>
      <div className="mx-4 md:mx-8 lg:mx-16 h-[60vh] md:h-[80vh] relative rounded-2xl overflow-hidden flex items-center justify-center shadow-xl">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y, scale }}
        >
          <Image
            src={videoData.bgImage || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80'}
            alt="Vision"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-dark/50" />
        </motion.div>

        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl"
          style={{ opacity: textOpacity, y: textY }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold text-white leading-tight">
            {videoData.title || 'CHAQUE PROJET COMMENCE PAR UNE VISION.'}
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
