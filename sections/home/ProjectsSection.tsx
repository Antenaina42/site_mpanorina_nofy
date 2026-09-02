'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects as defaultProjects, type Project } from '@/data/projects';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Button from '@/components/ui/Button';

export default function ProjectsSection() {
  const [projectList, setProjectList] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjectList(data.projects);
        }
      } catch (err) {
        // keep default projects
      }
    }
    loadProjects();
  }, []);

  const displayProjects = projectList.slice(0, 4);

  return (
    <section className="bg-light section-padding">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl">
        <ScrollReveal>
          <div className="mb-12 md:mb-16">
            <span className="text-gold-500 font-inter text-xs md:text-sm font-semibold tracking-wider uppercase mb-2 block">
              PORTFOLIO
            </span>
            <h2 className="text-3xl md:text-5xl font-display text-dark font-bold">
              NOS RÉALISATIONS
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
          {displayProjects.map((project, index) => {
            const isFirst = index === 0;
            return (
              <motion.div
                key={project.id || project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative group overflow-hidden rounded-xl cursor-pointer shadow-md ${
                  isFirst ? 'md:col-span-2 lg:col-span-2 row-span-2' : ''
                }`}
              >
                <Link href={`/realisations/${project.slug}`} className="block w-full h-full">
                  <Image
                    src={project.mainImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                    <div className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-1.5">
                      {project.category}
                    </div>
                    <h3 className={`text-white font-display font-bold mb-2 ${isFirst ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                      {project.title}
                    </h3>
                    <div className="text-white/80 text-xs flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{project.location}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <Button href="/realisations" variant="outline">
            Voir tous les projets
          </Button>
        </div>
      </div>
    </section>
  );
}
