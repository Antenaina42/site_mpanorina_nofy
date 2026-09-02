'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navigation, ctaButton } from '@/data/navigation';
import Button from '@/components/ui/Button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsMobileOpen(false);
    document.body.classList.remove('mobile-menu-open');
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-gradient-to-b from-dark/60 via-dark/20 to-transparent py-5'
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.jpg"
                alt="MPANORINA NOFY"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className={`font-bold text-lg tracking-wide transition-colors duration-300 hidden sm:block ${
                isScrolled ? 'text-dark' : 'text-white'
              }`}
            >
              MPANORINA NOFY
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group py-1 ${
                    isScrolled
                      ? isActive
                        ? 'text-teal-600 font-semibold'
                        : 'text-dark hover:text-teal-500'
                      : isActive
                      ? 'text-gold-400 font-semibold'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] bg-gold-500 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <Button href={ctaButton.href} variant={isScrolled ? 'primary' : 'secondary'} size="sm">
                {ctaButton.label}
              </Button>
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden relative z-10 p-2 transition-colors duration-300 ${
                isScrolled || isMobileOpen ? 'text-dark' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center px-8"
          >
            <div className="flex flex-col items-center gap-6">
              {navigation.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`text-2xl font-bold transition-colors ${
                        isActive
                          ? 'text-teal-600'
                          : 'text-dark hover:text-teal-500'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <Button
                  href={ctaButton.href}
                  variant="primary"
                  size="lg"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {ctaButton.label}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
