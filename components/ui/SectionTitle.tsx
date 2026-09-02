'use client';

import ScrollReveal from './ScrollReveal';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  label?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  label,
  align = 'left',
  light = false,
  className = '',
}: SectionTitleProps) {
  return (
    <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      {label && (
        <ScrollReveal>
          <span className={`inline-block text-sm font-medium tracking-[0.2em] uppercase mb-4 ${light ? 'text-gold-400' : 'text-gold-500'}`}>
            {label}
          </span>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.1}>
        <h2
          className={`text-section font-bold tracking-tight ${
            light ? 'text-white' : 'text-dark'
          }`}
        >
          {title}
        </h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal delay={0.2}>
          <p
            className={`mt-5 text-subtitle max-w-2xl ${
              align === 'center' ? 'mx-auto' : ''
            } ${light ? 'text-white/70' : 'text-muted'}`}
          >
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
