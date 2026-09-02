'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedText from '@/components/ui/AnimatedText';
import Button from '@/components/ui/Button';
import { defaultSiteContent } from '@/lib/defaultContent';
import { CheckCircle } from 'lucide-react';

export default function ServicesPage() {
  const [servicesData, setServicesData] = useState(defaultSiteContent.services);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/content?section=services');
        const data = await res.json();
        if (data.success && data.data) {
          setServicesData(data.data);
        }
      } catch (err) {
        // fallback
      }
    }
    fetchServices();
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const items = servicesData?.items || defaultSiteContent.services.items;
  const heroTitle = servicesData?.hero?.title || 'NOTRE SAVOIR-FAIRE';

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[450px] overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src={servicesData?.hero?.bgImage || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80'}
            alt="Nos Services"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 overlay-gradient" />
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="container-custom">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block text-gold-400 text-sm tracking-[0.3em] uppercase mb-6"
            >
              {servicesData?.hero?.subtitle || 'Ce Que Nous Faisons'}
            </motion.span>
            <AnimatedText
              key={heroTitle}
              text={heroTitle}
              tag="h1"
              className="text-hero font-display text-white justify-center"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-light">
        <div className="container-wide max-w-7xl mx-auto">
          {items.map((service: any, i: number) => (
            <ScrollReveal key={service.id || i} delay={0.1}>
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 last:mb-0"
              >
                {/* Image */}
                <div className={`${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <motion.div
                    className="relative h-[350px] lg:h-[450px] overflow-hidden rounded-2xl shadow-xl border-4 border-white"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="text-[6rem] font-black text-white/20 leading-none">
                        {service.number}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className={`${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <span className="text-gold-500 text-xs font-bold tracking-[0.2em] uppercase">
                    Service {service.number}
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-display font-bold text-dark mt-3 mb-6">
                    {service.title}
                  </h2>
                  <p className="text-muted leading-relaxed mb-8 text-base md:text-lg">
                    {service.longDescription || service.description}
                  </p>

                  {Array.isArray(service.features) && service.features.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature: string) => (
                        <div key={feature} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                          <span className="text-sm text-dark font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button href="/contact" showArrow>
                    Demander un devis
                  </Button>
                </div>
              </div>

              {i < items.length - 1 && (
                <div className="border-t border-border-light mb-24" />
              )}
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
          alt="Construire avec MPANORINA NOFY"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-dark/65" />
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="container-custom">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Un projet en tête ?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Discutons de votre projet et trouvons ensemble la meilleure solution.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Button href="/contact" variant="secondary" size="lg" showArrow>
                Parlons de votre projet
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
