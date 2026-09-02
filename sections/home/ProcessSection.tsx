'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { processSteps } from '@/data/process';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-light section-padding" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal className="text-center mb-20">
          <span className="text-gold-500 font-inter text-sm font-semibold tracking-wider uppercase mb-2 block">
            ÉTAPE PAR ÉTAPE
          </span>
          <h2 className="text-4xl md:text-5xl font-playfair text-dark font-bold">
            NOTRE PROCESSUS
          </h2>
        </ScrollReveal>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline central line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2">
            <motion.div 
              className="w-full bg-teal-500 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline line for mobile */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200">
            <motion.div 
              className="w-full bg-teal-500 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-16">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.number} className="relative flex items-center md:justify-between flex-col md:flex-row">
                  
                  {/* Step number indicator */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2 }}
                    className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-teal-500 bg-white z-10 flex items-center justify-center font-bold text-teal-700"
                  >
                    {step.number}
                  </motion.div>

                  {/* Desktop Layout */}
                  <div className={`hidden md:flex w-full items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-1/2 px-12 text-right flex flex-col items-end">
                      {isEven ? (
                        <>
                          <h3 className="text-2xl font-playfair font-bold text-dark mb-3">{step.title}</h3>
                          <p className="text-muted">{step.description}</p>
                        </>
                      ) : (
                        <div className="w-full h-48 relative rounded-lg overflow-hidden shadow-lg">
                          <Image src={step.image || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"} alt={step.title} fill className="object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="w-1/2 px-12 flex flex-col items-start">
                      {!isEven ? (
                        <>
                          <h3 className="text-2xl font-playfair font-bold text-dark mb-3">{step.title}</h3>
                          <p className="text-muted">{step.description}</p>
                        </>
                      ) : (
                        <div className="w-full h-48 relative rounded-lg overflow-hidden shadow-lg">
                          <Image src={step.image || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80"} alt={step.title} fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden flex flex-col w-full pl-24 pr-4">
                    <h3 className="text-xl font-playfair font-bold text-dark mb-2">{step.title}</h3>
                    <p className="text-muted mb-4">{step.description}</p>
                    <div className="w-full h-40 relative rounded-lg overflow-hidden shadow-md">
                      <Image src={step.image || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"} alt={step.title} fill className="object-cover" />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
