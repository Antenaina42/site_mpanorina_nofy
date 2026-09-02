'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedText from '@/components/ui/AnimatedText';
import Button from '@/components/ui/Button';
import { contactInfo } from '@/data/contact';
import { siteConfig } from '@/data/site';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', phone: '', email: '', projectType: '', budget: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
            alt="Contact"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 overlay-gradient" />
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="container-custom">
            <AnimatedText
              text={siteConfig.contactTitle}
              tag="h1"
              className="text-hero font-display text-white justify-center"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-light">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <span className="text-gold-500 text-sm tracking-[0.2em] uppercase font-medium">
                  Contactez-nous
                </span>
                <h2 className="text-3xl font-bold text-dark mt-3 mb-6">
                  Discutons de votre projet
                </h2>
                <p className="text-muted leading-relaxed mb-10">
                  N&apos;hésitez pas à nous contacter pour toute question ou pour discuter de votre
                  projet de construction. Notre équipe est à votre écoute.
                </p>
              </ScrollReveal>

              <div className="space-y-6">
                <ScrollReveal delay={0.1}>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center group-hover:bg-teal-500 transition-colors duration-300">
                      <Phone className="w-5 h-5 text-teal-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wide">Téléphone</p>
                      <p className="text-dark font-medium">{contactInfo.phone}</p>
                    </div>
                  </a>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300">
                      <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wide">WhatsApp</p>
                      <p className="text-dark font-medium">{contactInfo.phone}</p>
                    </div>
                  </a>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center group-hover:bg-teal-500 transition-colors duration-300">
                      <Mail className="w-5 h-5 text-teal-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wide">Email</p>
                      <p className="text-dark font-medium">{contactInfo.email}</p>
                    </div>
                  </a>
                </ScrollReveal>

                <ScrollReveal delay={0.25}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-teal-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wide">Adresse</p>
                      <p className="text-dark font-medium">{contactInfo.fullAddress}</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={0.3}>
                <div className="mt-10">
                  <div className="relative w-20 h-20">
                    <Image
                      src="/logo.jpg"
                      alt={siteConfig.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.1}>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-light-gray rounded-sm p-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-6">
                      <Send className="w-7 h-7 text-teal-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark mb-3">
                      Message envoyé !
                    </h3>
                    <p className="text-muted mb-6">
                      Merci pour votre message. Notre équipe vous contactera dans les plus
                      brefs délais.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Envoyer un autre message
                    </Button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="bg-light-gray rounded-sm p-8 md:p-10"
                  >
                    <h3 className="text-xl font-bold text-dark mb-8">
                      Envoyer ma demande
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="block text-xs text-muted uppercase tracking-wide mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-border-light rounded-sm text-dark text-sm focus:outline-none focus:border-teal-500 transition-colors"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted uppercase tracking-wide mb-2">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-border-light rounded-sm text-dark text-sm focus:outline-none focus:border-teal-500 transition-colors"
                          placeholder="+261 34 00 000 00"
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className="block text-xs text-muted uppercase tracking-wide mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-border-light rounded-sm text-dark text-sm focus:outline-none focus:border-teal-500 transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="block text-xs text-muted uppercase tracking-wide mb-2">
                          Type de projet
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-border-light rounded-sm text-dark text-sm focus:outline-none focus:border-teal-500 transition-colors appearance-none"
                        >
                          <option value="">Sélectionner</option>
                          {contactInfo.projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-muted uppercase tracking-wide mb-2">
                          Budget estimatif
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border border-border-light rounded-sm text-dark text-sm focus:outline-none focus:border-teal-500 transition-colors appearance-none"
                        >
                          <option value="">Sélectionner</option>
                          {contactInfo.budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-8">
                      <label className="block text-xs text-muted uppercase tracking-wide mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-white border border-border-light rounded-sm text-dark text-sm focus:outline-none focus:border-teal-500 transition-colors resize-none"
                        placeholder="Décrivez votre projet..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      showArrow
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                    </Button>
                  </form>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
