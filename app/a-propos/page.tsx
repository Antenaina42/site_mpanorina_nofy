'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedText from '@/components/ui/AnimatedText';
import Button from '@/components/ui/Button';
import { defaultSiteContent } from '@/lib/defaultContent';
import { Shield, Users, Award, Compass, Target, Eye } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Qualité & Solidité',
    description:
      'Chaque construction est réalisée avec des matériaux de premier choix et des techniques éprouvées pour garantir durabilité et excellence.',
  },
  {
    icon: Compass,
    title: 'Vision & Innovation',
    description:
      'Nous intégrons les dernières avancées techniques et architecturales pour créer des bâtiments modernes et fonctionnels.',
  },
  {
    icon: Users,
    title: 'Équipe Experte',
    description:
      'Notre équipe de professionnels qualifiés apporte son savoir-faire et sa passion à chaque projet.',
  },
  {
    icon: Award,
    title: 'Engagement Total',
    description:
      'Du premier contact à la remise des clés, nous nous engageons à respecter les délais, le budget et vos exigences.',
  },
];

const timeline = [
  {
    year: 'Les Débuts',
    title: 'La Fondation',
    description:
      'MPANORINA NOFY naît de la volonté de transformer le secteur de la construction à Madagascar, avec une approche moderne et un engagement qualité sans compromis.',
  },
  {
    year: 'Croissance',
    title: 'Les Premiers Projets',
    description:
      'Les premiers chantiers confirment notre expertise : constructions résidentielles, bâtiments commerciaux et travaux de gros œuvre de grande envergure.',
  },
  {
    year: "Aujourd'hui",
    title: 'Une Référence',
    description:
      "Aujourd'hui, MPANORINA NOFY est reconnue pour la qualité de ses réalisations, son professionnalisme et sa capacité à mener des projets ambitieux.",
  },
];

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(defaultSiteContent.about);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch('/api/content?section=about');
        const data = await res.json();
        if (data.success && data.data) {
          setAboutData(data.data);
        }
      } catch (err) {
        // fallback
      }
    }
    fetchAbout();
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const heroTitle = aboutData?.hero?.title || "L'AMBITION DE CONSTRUIRE";

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src={aboutData?.hero?.bgImage || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80'}
            alt="MPANORINA NOFY - À propos"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 overlay-gradient" />
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative h-full flex items-center justify-center text-center"
        >
          <div className="container-custom">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block text-gold-400 text-sm tracking-[0.3em] uppercase mb-6"
            >
              {aboutData?.hero?.subtitle || 'Notre Histoire'}
            </motion.span>
            <AnimatedText
              key={heroTitle}
              text={heroTitle}
              tag="h1"
              className="text-hero font-display text-white justify-center"
              delay={0.5}
            />
          </div>
        </motion.div>
      </section>

      {/* Introduction Story */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <span className="text-gold-500 text-sm tracking-[0.2em] uppercase font-semibold">
                  Qui Sommes-Nous
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className="text-section font-bold text-dark mt-4 mb-8">
                  {aboutData?.story?.title || "Une entreprise bâtie sur l'excellence"}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-muted text-lg leading-relaxed mb-6">
                  {aboutData?.story?.p1 || "Fondée avec la volonté de redéfinir les standards de la construction à Madagascar, MPANORINA NOFY s'est imposée comme un acteur de référence dans le secteur du bâtiment et des travaux de gros œuvre."}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="text-muted leading-relaxed mb-6">
                  {aboutData?.story?.p2 || 'Notre nom, qui signifie "Bâtisseur de Rêves", incarne notre mission fondamentale : transformer les aspirations architecturales de nos clients en structures solides, durables et élégantes.'}
                </p>
              </ScrollReveal>
              {aboutData?.story?.p3 && (
                <ScrollReveal delay={0.35}>
                  <p className="text-muted leading-relaxed mb-8">
                    {aboutData.story.p3}
                  </p>
                </ScrollReveal>
              )}
              <ScrollReveal delay={0.4}>
                <div className="line-accent" />
              </ScrollReveal>
            </div>
            <ScrollReveal direction="right" className="relative">
              <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src={aboutData?.story?.image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'}
                  alt="Construction MPANORINA NOFY"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold-500/10 rounded-2xl -z-10" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-light-gray border-y border-border-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-border-light shadow-sm h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-dark mb-4">
                    {aboutData?.vision?.visionTitle || 'Notre Vision'}
                  </h3>
                  <p className="text-muted leading-relaxed text-base">
                    {aboutData?.vision?.visionText || 'Devenir le partenaire de référence pour la construction durable et moderne à Madagascar, en alliant innovation technique, respect des normes internationales et valorisation des compétences locales.'}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-border-light shadow-sm h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center mb-6">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-dark mb-4">
                    {aboutData?.vision?.missionTitle || 'Notre Mission'}
                  </h3>
                  <p className="text-muted leading-relaxed text-base">
                    {aboutData?.vision?.missionText || 'Bâtir des structures d’excellence qui traversent le temps, en offrant à nos clients un accompagnement personnalisé, une transparence totale et une rigueur sans compromis.'}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <ScrollReveal className="text-center mb-16">
            <span className="text-gold-500 text-sm tracking-[0.2em] uppercase font-semibold">
              Nos Valeurs
            </span>
            <h2 className="text-section font-bold text-dark mt-4">
              Ce qui nous guide
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <motion.div
                  className="bg-white p-8 rounded-xl border border-border-light shadow-sm hover:border-teal-300 transition-colors duration-300"
                  whileHover={{ y: -5 }}
                >
                  <value.icon className="w-8 h-8 text-teal-500 mb-5" />
                  <h3 className="font-bold text-dark mb-3">{value.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-light-gray">
        <div className="container-narrow">
          <ScrollReveal className="text-center mb-20">
            <span className="text-gold-500 text-sm tracking-[0.2em] uppercase font-semibold">
              Notre Parcours
            </span>
            <h2 className="text-section font-bold text-dark mt-4">
              L&apos;histoire de MPANORINA NOFY
            </h2>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-border-light -translate-x-1/2 hidden md:block" />
            {timeline.map((item, i) => (
              <ScrollReveal
                key={item.title}
                delay={i * 0.15}
                direction={i % 2 === 0 ? 'left' : 'right'}
                className={`relative mb-16 last:mb-0 md:w-1/2 ${
                  i % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:ml-auto'
                }`}
              >
                <div className={`absolute top-2 hidden md:block w-4 h-4 rounded-full bg-teal-500 border-4 border-light ${i % 2 === 0 ? 'right-0 translate-x-[calc(50%+1px)]' : 'left-0 -translate-x-[calc(50%+1px)]'}`} />
                <span className="text-gold-500 text-sm font-medium tracking-wide">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold text-dark mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed">{item.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal-500">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à construire avec nous ?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons le
              concrétiser.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Button href="/contact" variant="secondary" size="lg">
              Parlons de votre projet
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
