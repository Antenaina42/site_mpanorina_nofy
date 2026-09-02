'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  showArrow?: boolean;
  type?: 'button' | 'submit';
}

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
  showArrow = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-400 ease-premium relative overflow-hidden group';

  const variants = {
    primary:
      'bg-teal-500 text-white hover:bg-teal-600 border border-teal-500',
    secondary:
      'bg-gold-500 text-white hover:bg-gold-600 border border-gold-500',
    outline:
      'bg-transparent text-teal-500 border-2 border-teal-500 hover:bg-teal-500 hover:text-white',
    ghost:
      'bg-transparent text-dark hover:text-teal-500 border border-transparent',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-9 py-4 text-base',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
      )}
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      )}
      {variant === 'secondary' && (
        <span className="absolute inset-0 bg-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      onClick={onClick}
      type={type}
    >
      {content}
    </motion.button>
  );
}
