'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedText from '@/components/ui/AnimatedText';
import Button from '@/components/ui/Button';
import { defaultSiteContent } from '@/lib/defaultContent';
import { Phone, Mail, MapPin, Send, Home, Building2, CheckCircle2 } from 'lucide-react';

export default function ContactClient() {
  const [contactData, setContactData] = useState(defaultSiteContent.contact);

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await fetch('/api/content?section=contact');
        const data = await res.json();
        if (data.success && data.data) {
          setContactData(data.data);
        }
      } catch (err) {
        // fallback
      }
    }
    fetchContact();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    landSurface: '',
    buildingType: "Villa d'habitation",
    villaBedrooms: '3 chambres',
    villaFloors: 'R+1 (1 étage)',
    apartmentDetails: '',
    buildingFloors: 'R+3',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          location: '',
          landSurface: '',
          buildingType: "Villa d'habitation",
          villaBedrooms: '3 chambres',
          villaFloors: 'R+1 (1 étage)',
          apartmentDetails: '',
          buildingFloors: 'R+3',
          message: '',
        });
      } else {
        setErrorMsg(data.error || 'Une erreur est survenue lors de la soumission.');
      }
    } catch (err) {
      setErrorMsg('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const phone = contactData.phone || '+261 34 31 221 82';
  const email = contactData.email || 'mpanorinanofy@gmail.com';
  const fullAddress = contactData.fullAddress || 'Antananarivo, Madagascar';

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[45vh] min-h-[380px] overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
            alt="Contact MPANORINA NOFY"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-dark/75" />
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="container mx-auto px-4">
            <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-bold block mb-3">
              VOTRE PROJET SUR MESURE
            </span>
            <AnimatedText
              text="PARLONS DE VOTRE PROJET."
              tag="h1"
              className="text-4xl md:text-6xl font-display font-black text-white justify-center uppercase tracking-tight"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-[#FAFAF8]">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Left Column: Contact Info */}
            <div className="lg:col-span-5">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-[1px] bg-gold-500" />
                  <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-bold">
                    CONTACT DIRECT
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-dark uppercase mb-6 leading-tight">
                  CONSTRUISEZ VOTRE RÊVE AVEC DES EXPERTS.
                </h2>
                <p className="text-muted text-base leading-relaxed mb-10 font-inter">
                  Remplissez ce questionnaire détaillé pour recevoir une étude personnalisée et un devis adapté aux spécificités de votre projet à Madagascar.
                </p>
              </ScrollReveal>

              <div className="space-y-6">
                <ScrollReveal delay={0.1}>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-border-light shadow-sm hover:border-gold-500 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-600 flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wide">Téléphone & WhatsApp</p>
                      <p className="text-dark font-bold text-base">{phone}</p>
                    </div>
                  </a>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-border-light shadow-sm hover:border-gold-500 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wide">Email</p>
                      <p className="text-dark font-bold text-base">{email}</p>
                    </div>
                  </a>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-border-light shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-600 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wide">Adresse</p>
                      <p className="text-dark font-bold text-base">{fullAddress}</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={0.4}>
                <div className="mt-10 pt-8 border-t border-border-light flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white shadow-sm p-1 border border-border-light flex-shrink-0">
                    <Image
                      src="/logo.jpg"
                      alt="MPANORINA NOFY"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-dark block">MPANORINA NOFY</span>
                    <span className="text-xs text-muted">Excellence & Gros Œuvre à Madagascar</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Questionnaire Form */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.15}>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl p-10 md:p-14 text-center border border-border-light shadow-lg"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-dark mb-3">
                      Demande transmise avec succès !
                    </h3>
                    <p className="text-muted mb-8 text-base max-w-md mx-auto">
                      Merci pour votre confiance. Vos réponses ont été transmises directement à notre équipe technique. Nous vous recontacterons dans les plus brefs délais.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="primary">
                      Envoyer une autre demande
                    </Button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl p-8 md:p-12 border border-border-light shadow-lg space-y-6"
                  >
                    <div className="border-b border-border-light pb-4">
                      <h3 className="text-xl font-display font-bold text-dark uppercase tracking-tight">
                        Questionnaire de Projet
                      </h3>
                      <p className="text-xs text-muted mt-1">
                        Veuillez renseigner les caractéristiques de votre chantier
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {errorMsg}
                      </div>
                    )}

                    {/* Section 1: Informations Personnelles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-dark uppercase tracking-wide mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-[#F4F6F8] border border-border-light rounded-xl text-dark text-sm focus:outline-none focus:border-gold-500 transition-colors"
                          placeholder="Votre nom et prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-dark uppercase tracking-wide mb-2">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-[#F4F6F8] border border-border-light rounded-xl text-dark text-sm focus:outline-none focus:border-gold-500 transition-colors"
                          placeholder="+261 34 31 221 82"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-dark uppercase tracking-wide mb-2">
                        Adresse Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F4F6F8] border border-border-light rounded-xl text-dark text-sm focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>

                    {/* Section 2: Localisation & Surface */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-dark uppercase tracking-wide mb-2">
                          Lieu du projet (Fokontany et Région) *
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-[#F4F6F8] border border-border-light rounded-xl text-dark text-sm focus:outline-none focus:border-gold-500 transition-colors"
                          placeholder="Ex: Fokontany Anosibe, Région Analamanga"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-dark uppercase tracking-wide mb-2">
                          Surface du terrain (m²) *
                        </label>
                        <input
                          type="text"
                          name="landSurface"
                          value={formData.landSurface}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-[#F4F6F8] border border-border-light rounded-xl text-dark text-sm focus:outline-none focus:border-gold-500 transition-colors"
                          placeholder="Ex: 500 m²"
                        />
                      </div>
                    </div>

                    {/* Section 3: Choice of Building Type */}
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-dark uppercase tracking-wide mb-3">
                        Type de construction *
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, buildingType: "Villa d'habitation" })}
                          className={`flex items-center justify-center gap-3 p-4 rounded-xl border text-sm font-bold transition-all duration-300 ${
                            formData.buildingType === "Villa d'habitation"
                              ? 'bg-gold-500 text-black border-gold-500 shadow-md scale-[1.02]'
                              : 'bg-[#F4F6F8] text-dark/70 border-border-light hover:border-gold-500/50'
                          }`}
                        >
                          <Home className="w-5 h-5" />
                          <span>Villa d&apos;habitation</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, buildingType: 'Immeuble' })}
                          className={`flex items-center justify-center gap-3 p-4 rounded-xl border text-sm font-bold transition-all duration-300 ${
                            formData.buildingType === 'Immeuble'
                              ? 'bg-gold-500 text-black border-gold-500 shadow-md scale-[1.02]'
                              : 'bg-[#F4F6F8] text-dark/70 border-border-light hover:border-gold-500/50'
                          }`}
                        >
                          <Building2 className="w-5 h-5" />
                          <span>Immeuble</span>
                        </button>
                      </div>
                    </div>

                    {/* Section 4: Conditional Questionnaire */}
                    <AnimatePresence mode="wait">
                      {formData.buildingType === "Villa d'habitation" ? (
                        <motion.div
                          key="villa-section"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="bg-[#F8F9FA] p-5 rounded-xl border border-border-light space-y-4"
                        >
                          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                            Spécifications de la Villa
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-dark uppercase tracking-wide mb-1.5">
                                Nombre de chambres *
                              </label>
                              <select
                                name="villaBedrooms"
                                value={formData.villaBedrooms}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-border-light rounded-lg text-dark text-sm focus:outline-none focus:border-gold-500"
                              >
                                <option value="1 chambre">1 chambre</option>
                                <option value="2 chambres">2 chambres</option>
                                <option value="3 chambres">3 chambres</option>
                                <option value="4 chambres">4 chambres</option>
                                <option value="5 chambres">5 chambres</option>
                                <option value="6 chambres ou plus">6 chambres ou plus</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-dark uppercase tracking-wide mb-1.5">
                                Nombre d&apos;étages *
                              </label>
                              <select
                                name="villaFloors"
                                value={formData.villaFloors}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-border-light rounded-lg text-dark text-sm focus:outline-none focus:border-gold-500"
                              >
                                <option value="Plain-pied (RDC uniquement)">Plain-pied (RDC uniquement)</option>
                                <option value="R+1 (1 étage)">R+1 (1 étage)</option>
                                <option value="R+2 (2 étages)">R+2 (2 étages)</option>
                                <option value="R+3 (3 étages ou plus)">R+3 (3 étages ou plus)</option>
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="building-section"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="bg-[#F8F9FA] p-5 rounded-xl border border-border-light space-y-4"
                        >
                          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                            Spécifications de l&apos;Immeuble
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-dark uppercase tracking-wide mb-1.5">
                                Appartements &amp; chambres par appartement *
                              </label>
                              <input
                                type="text"
                                name="apartmentDetails"
                                value={formData.apartmentDetails}
                                onChange={handleChange}
                                required={formData.buildingType === 'Immeuble'}
                                className="w-full px-4 py-3 bg-white border border-border-light rounded-lg text-dark text-sm focus:outline-none focus:border-gold-500"
                                placeholder="Ex: 4 appartements de 3 chambres"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-dark uppercase tracking-wide mb-1.5">
                                Niveau d&apos;étages (R + X) *
                              </label>
                              <select
                                name="buildingFloors"
                                value={formData.buildingFloors}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-border-light rounded-lg text-dark text-sm focus:outline-none focus:border-gold-500"
                              >
                                <option value="R+1">R+1</option>
                                <option value="R+2">R+2</option>
                                <option value="R+3">R+3</option>
                                <option value="R+4">R+4</option>
                                <option value="R+5">R+5</option>
                                <option value="R+6 ou plus">R+6 ou plus</option>
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Section 5: Remarques */}
                    <div>
                      <label className="block text-xs font-bold text-dark uppercase tracking-wide mb-2">
                        Remarques ou détails complémentaires
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-[#F4F6F8] border border-border-light rounded-xl text-dark text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none"
                        placeholder="Précisions sur les délais, contraintes du terrain ou demandes particulières..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-sm uppercase tracking-widest py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <span>Envoi en cours...</span>
                      ) : (
                        <>
                          <span>Envoyer le questionnaire</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
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
