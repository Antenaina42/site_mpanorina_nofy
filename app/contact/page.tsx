import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact & Devis Gratuit Construction Madagascar',
  description:
    'Besoin d\'une étude ou d\'un devis pour votre projet de construction ou gros œuvre à Madagascar ? Contactez l\'équipe MPANORINA NOFY. Réponse rapide.',
  keywords: [
    'contact MPANORINA NOFY',
    'devis gratuit construction Madagascar',
    'devis gros oeuvre Antananarivo',
    'prix construction bâtiment Madagascar',
    'contact entreprise BTP Antananarivo',
    'étude de projet construction Madagascar',
  ],
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: 'Contact & Demande de Devis Construction | MPANORINA NOFY Madagascar',
    description:
      'Discutons de votre projet de bâtiment à Madagascar. Demandez votre devis personnalisé gratuit.',
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
