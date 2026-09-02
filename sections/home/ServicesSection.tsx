'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { services } from '@/data/services';

export default function ServicesSection() {
  const fallbackServices = [
    {
      id: '1',
      title: 'Construction Résidentielle',
      description: 'Maisons individuelles et complexes résidentiels conçus avec précision.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
    },
    {
      id: '2',
      title: 'Bâtiments Commerciaux',
      description: 'Espaces de travail modernes, bureaux et centres commerciaux.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
    },
    {
      id: '3',
      title: 'Rénovation & Restauration',
      description: 'Donnez une nouvelle vie à vos espaces existants avec notre expertise.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80'
    }
  ];

  const displayServices = services || fallbackServices;

  return (
    <section className="py-20 md:py-32 bg-[#F2F2EE]">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Title */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <ScrollReveal>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-widest uppercase text-gold-500 mb-3">
                CE QUE NOUS FAISONS
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-dark">
                NOS SERVICES
              </h2>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <Button href="/services" variant="outline" className="hidden md:flex">
              Tous nos services
            </Button>
          </ScrollReveal>
        </div>

        {/* Services List */}
        <div className="flex flex-col border-t border-dark/10">
          {displayServices.map((service, index) => (
            <motion.div 
              key={service.id || index}
              initial="initial"
              whileHover="hover"
              className="group relative border-b border-dark/10 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center py-10 md:py-16 px-4 md:px-8">
                
                {/* Number & Text Content */}
                <div className="w-full md:w-1/2 flex items-start gap-6 md:gap-12 z-20">
                  <span className="text-5xl md:text-6xl font-display font-bold text-dark/10 group-hover:text-gold-500/30 transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-dark mb-4 group-hover:text-teal-700 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted font-inter max-w-md">
                      {service.description}
                    </p>
                    
                    {/* Hover indicator */}
                    <div className="mt-6 flex items-center text-gold-500 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      <span className="text-sm font-bold uppercase tracking-wider mr-2">Découvrir</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Image Reveal on Desktop */}
                <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-end">
                  <div className="relative w-full md:w-[80%] aspect-[4/3] rounded-sm overflow-hidden hidden md:block">
                    <motion.div
                      variants={{
                        initial: { scale: 1, opacity: 0 },
                        hover: { scale: 1.05, opacity: 1 }
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>
                  
                  {/* Mobile image always visible */}
                  <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden md:hidden block">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

              </div>
              
              {/* Animated Accent Line */}
              <motion.div 
                className="absolute bottom-0 left-0 h-[2px] bg-gold-500 z-20"
                variants={{
                  initial: { width: 0 },
                  hover: { width: '100%' }
                }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Mobile CTA */}
        <div className="mt-12 flex justify-center md:hidden">
          <Button href="/services" variant="outline">
            Tous nos services
          </Button>
        </div>

      </div>
    </section>
  );
}
