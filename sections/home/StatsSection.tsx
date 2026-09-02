'use client';

import React, { useState, useEffect } from 'react';
import CountUp from '@/components/ui/CountUp';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { defaultSiteContent } from '@/lib/defaultContent';

export default function StatsSection() {
  const [statsData, setStatsData] = useState(defaultSiteContent.stats.items);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/content?section=stats');
        const data = await res.json();
        if (data.success && Array.isArray(data.data?.items)) {
          setStatsData(data.data.items);
        }
      } catch (err) {
        // fallback
      }
    }
    fetchStats();
  }, []);

  return (
    <section className="bg-teal-700 py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsData.map((stat: any, index: number) => (
            <ScrollReveal 
              key={index} 
              delay={index * 0.1}
              className="flex flex-col items-center justify-center text-center p-6 border-b lg:border-b-0 lg:border-r border-white/10 last:border-0"
            >
              <div className="flex items-baseline mb-2">
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-display">
                  <CountUp end={stat.value} duration={2} prefix={stat.prefix || ''} />
                </span>
                {stat.suffix && (
                  <span className="text-3xl md:text-4xl text-white/80 ml-1 font-bold">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="text-sm uppercase tracking-widest text-white/60 font-inter font-medium mt-2">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
