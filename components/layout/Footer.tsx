'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { contactInfo } from '@/data/contact';
import { siteConfig } from '@/data/site';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-gray border-t border-border-light">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Logo & Description */}
          <ScrollReveal className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.jpg"
                  alt={siteConfig.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg text-dark tracking-wide">
                MPANORINA NOFY
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              {siteConfig.tagline}
            </p>
            <div className="line-accent" />
          </ScrollReveal>

          {/* Navigation */}
          <ScrollReveal delay={0.1}>
            <h4 className="font-bold text-dark mb-6 tracking-wide">NAVIGATION</h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-teal-500 transition-colors duration-300 text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal delay={0.2}>
            <h4 className="font-bold text-dark mb-6 tracking-wide">CONTACT</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                <a href={`tel:${contactInfo.phone}`} className="text-muted hover:text-teal-500 transition-colors text-sm">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="text-muted hover:text-teal-500 transition-colors text-sm">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                <span className="text-muted text-sm">{contactInfo.fullAddress}</span>
              </li>
            </ul>
          </ScrollReveal>

          {/* Social */}
          <ScrollReveal delay={0.3}>
            <h4 className="font-bold text-dark mb-6 tracking-wide">SUIVEZ-NOUS</h4>
            <div className="flex gap-4">
              <motion.a
                href={contactInfo.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={contactInfo.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={contactInfo.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            © {currentYear} {siteConfig.name}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted">
            <span>Construire aujourd&apos;hui les projets de demain.</span>
            <span>•</span>
            <Link href="/admin" className="text-teal-600 hover:text-teal-700 font-semibold transition-colors">
              Espace Administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
