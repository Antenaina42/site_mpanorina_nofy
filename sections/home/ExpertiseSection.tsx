'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, Target, Users, Award } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const expertisePoints = [
  {
    icon: Shield,
    title: 'Qualité Supérieure',
    description: 'Des matériaux de premier choix pour une durabilité exceptionnelle.'
  },
  {
    icon: Target,
    title: 'Précision',
    description: 'Une attention minutieuse aux détails à chaque étape du projet.'
  },
  {
    icon: Users,
    title: 'Équipe d\'Experts',
    description: 'Des professionnels passionnés et hautement qualifiés.'
  },
  {
    icon: Award,
    title: 'Respect des Engagements',
    description: 'Livraison dans les délais et budgets impartis.'
  }
];

export default function ExpertiseSection() {
  return (
    <section className="bg-light-gray section-padding overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center">
          
          <div className="w-full lg:w-1/2 order-2 lg:order-1 relative">
            <div className="relative h-[400px] w-full md:w-[80%] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
                alt="Expertise"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[300px] w-full md:w-[60%] md:absolute md:-bottom-16 md:-right-4 rounded-lg overflow-hidden shadow-xl mt-8 md:mt-0 z-10">
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80"
                alt="Chantier"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-dark mb-6 leading-tight">
                PLUS QU'UNE CONSTRUCTION.<br/>
                <span className="text-teal-700">UNE VISION QUI PREND FORME.</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-muted text-lg mb-10">
                Chez MPANORINA NOFY, nous repoussons les limites de la construction traditionnelle. 
                Notre approche allie savoir-faire artisanal et innovations technologiques pour créer des espaces 
                qui inspirent et perdurent.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {expertisePoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <ScrollReveal key={index} delay={0.3 + index * 0.1}>
                    <div className="flex flex-col">
                      <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-4 text-teal-700">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-playfair font-bold text-dark mb-2">{point.title}</h3>
                      <p className="text-muted text-sm">{point.description}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
