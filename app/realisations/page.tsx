'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedText from '@/components/ui/AnimatedText';
import { projects as defaultProjects, projectCategories, type ProjectCategory, type Project } from '@/data/projects';

export default function RealisationsPage() {
  const [projectList, setProjectList] = useState<Project[]>(defaultProjects);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Tous');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjectList(data.projects);
        }
      } catch (err) {
        // use default projects
      }
    }
    loadProjects();
  }, []);

  const filteredProjects =
    activeCategory === 'Tous'
      ? projectList
      : projectList.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[450px] overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80"
            alt="Nos Réalisations"
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
              Portfolio
            </motion.span>
            <AnimatedText
              text="NOS RÉALISATIONS"
              tag="h1"
              className="text-hero font-display text-white justify-center"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Filters + Gallery */}
      <section className="section-padding bg-light">
        <div className="container-wide">
          {/* Filters */}
          <ScrollReveal className="flex flex-wrap justify-center gap-3 mb-16">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 rounded-sm ${
                  activeCategory === category
                    ? 'bg-teal-500 text-white'
                    : 'bg-light-gray text-muted hover:text-dark hover:bg-border-light'
                }`}
              >
                {category}
              </button>
            ))}
          </ScrollReveal>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id || project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <Link href={`/realisations/${project.slug}`}>
                    <div
                      className={`relative overflow-hidden rounded-sm ${
                        i === 0 ? 'h-[400px] md:h-[600px]' : 'h-[300px] md:h-[350px]'
                      }`}
                    >
                      <Image
                        src={project.mainImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <motion.div
                          initial={{ y: 10 }}
                          whileHover={{ y: 0 }}
                          className="transform transition-transform duration-500"
                        >
                          <span className="inline-block text-gold-400 text-xs tracking-[0.2em] uppercase mb-2">
                            {project.category} — {project.year}
                          </span>
                          <h3
                            className={`font-bold text-white mb-1 ${
                              i === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                            }`}
                          >
                            {project.title}
                          </h3>
                          <p className="text-white/60 text-sm">{project.location}</p>
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
