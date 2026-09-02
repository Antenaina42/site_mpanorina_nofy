'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  wordDelay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function AnimatedText({
  text,
  className = '',
  once = true,
  delay = 0,
  wordDelay = 0.05,
  tag: Tag = 'h2',
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const words = typeof text === 'string' ? text.split(' ') : [];

  return (
    <Tag ref={ref} className={`${className} flex flex-wrap`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.35em] overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + i * wordDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
