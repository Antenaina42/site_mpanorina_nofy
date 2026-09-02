'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Calendar, Ruler, Clock } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';
import { projects as defaultProjects, type Project } from '@/data/projects';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<Project | null>(() => {
    return defaultProjects.find((p) => p.slug === params.slug) || null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.projects)) {
          const found = data.projects.find((p: Project) => p.slug === params.slug);
          if (found) {
            setProject(found);
          }
        }
      } catch (err) {
        // fallback to existing
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [params.slug]);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  if (!project && !loading) {
    notFound();
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src={project.mainImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 overlay-gradient" />
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative h-full flex items-end pb-16"
        >
          <div className="container-wide">
            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux réalisations
            </Link>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="block text-gold-400 text-sm tracking-[0.2em] uppercase mb-3"
            >
              {project.category}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            >
              {project.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 text-white/70 text-sm"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {project.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {project.year}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Project Details */}
      <section className="section-padding bg-light">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-dark mb-6">À propos du projet</h2>
                <p className="text-muted leading-relaxed text-lg mb-8">
                  {project.longDescription || project.description}
                </p>
                <div className="line-accent mb-12" />
              </ScrollReveal>

              {/* Gallery */}
              <ScrollReveal delay={0.2}>
                <h3 className="text-xl font-bold text-dark mb-6">Galerie</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(project.images || [project.mainImage]).map((image, i) => (
                    <motion.div
                      key={i}
                      className={`relative overflow-hidden rounded-sm ${
                        i === 0 ? 'md:col-span-2 h-[300px] md:h-[450px]' : 'h-[250px]'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={image}
                        alt={`${project.title} - Image ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ScrollReveal delay={0.1}>
                <div className="bg-light-gray rounded-sm p-8 sticky top-32">
                  <h3 className="font-bold text-dark mb-6 text-lg">
                    Informations du projet
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wide mb-1">
                          Localisation
                        </p>
                        <p className="text-dark font-medium text-sm">
                          {project.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Calendar className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wide mb-1">
                          Année
                        </p>
                        <p className="text-dark font-medium text-sm">{project.year}</p>
                      </div>
                    </div>

                    {project.details?.surface && (
                      <div className="flex items-start gap-4">
                        <Ruler className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wide mb-1">
                            Surface
                          </p>
                          <p className="text-dark font-medium text-sm">
                            {project.details.surface}
                          </p>
                        </div>
                      </div>
                    )}

                    {project.details?.duration && (
                      <div className="flex items-start gap-4">
                        <Clock className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wide mb-1">
                            Durée
                          </p>
                          <p className="text-dark font-medium text-sm">
                            {project.details.duration}
                          </p>
                        </div>
                      </div>
                    )}

                    {project.details?.type && (
                      <div className="border-t border-border-light pt-5 mt-5">
                        <p className="text-xs text-muted uppercase tracking-wide mb-1">
                          Type de projet
                        </p>
                        <p className="text-dark font-medium">{project.details.type}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8">
                    <Button href="/contact" variant="primary" className="w-full">
                      Projet similaire ?
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="py-16 bg-teal-500">
        <div className="container-custom text-center">
          <ScrollReveal>
            <p className="text-white/60 text-sm tracking-[0.2em] uppercase mb-4">
              Explorez plus
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Découvrir d&apos;autres réalisations
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Button href="/realisations" variant="secondary" size="lg" showArrow>
              Voir tous les projets
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
