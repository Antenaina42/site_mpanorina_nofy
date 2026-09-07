'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

const IMPACTS = [
  {
    number: '01',
    title: 'Vous transformez une ville',
    description:
      "Chaque batiment que vous construisez modifie le paysage urbain. Il attire d'autres investisseurs, cree de nouvelles routes, genere de nouvelles activites economiques autour de lui.",
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  },
  {
    number: '02',
    title: 'Vous creez des emplois durables',
    description:
      "Un chantier de gros oeuvre mobilise des centaines de familles malgaches : macons, ingenieurs, techniciens, fournisseurs. Votre projet devient leur source de vie et d'emancipation.",
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    number: '03',
    title: 'Vous laissez un heritage',
    description:
      "Dans 50 ans, vos enfants montreront ce batiment. Dans 100 ans, des histoires seront racontees sur celui qui a eu le courage de construire. Ce n'est pas du beton. C'est votre nom grave dans le temps.",
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  },
];

export default function ExpertiseSection() {
  return (
    <section className="bg-[#F2F2EE] py-24 md:py-36 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-bold">
              L&apos;IMPACT REEL
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-dark leading-[1] tracking-tight uppercase mb-4">
            CE QUE VOUS<br />
            <span className="text-teal-700">CONSTRUISEZ VRAIMENT</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mt-4 mb-16 md:mb-24 font-inter">
            Construire un batiment de gros oeuvre, c&apos;est bien plus qu&apos;une structure.
            C&apos;est un acte qui transforme des vies, des quartiers, des generations.
          </p>
        </ScrollReveal>

        <div className="flex flex-col gap-0">
          {IMPACTS.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                initial="rest"
                whileHover="hover"
                className="group grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-dark/10 py-12 lg:py-16 items-center"
              >
                <div className="lg:col-span-1 mb-4 lg:mb-0">
                  <span className="text-6xl font-display font-black text-dark/[0.08] group-hover:text-gold-500/20 transition-colors duration-500">
                    {item.number}
                  </span>
                </div>
                <div className="lg:col-span-6 lg:pr-12">
                  <h3 className="text-2xl md:text-3xl font-display font-black text-dark uppercase mb-4 group-hover:text-teal-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted text-base md:text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="lg:col-span-5 mt-8 lg:mt-0">
                  <motion.div
                    variants={{
                      rest: { opacity: 0.7, scale: 0.98 },
                      hover: { opacity: 1, scale: 1 },
                    }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full aspect-[16/9] overflow-hidden"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F2F2EE]/80 via-transparent to-transparent" />
                  </motion.div>
                </div>
                <motion.div
                  variants={{
                    rest: { scaleX: 0 },
                    hover: { scaleX: 1 },
                  }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-12 h-[1px] bg-gold-500 origin-left mt-8 hidden lg:block"
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
        <div className="border-t border-dark/10" />
      </div>
    </section>
  );
}
