import type { Metadata } from 'next';
import AProposClient from './AProposClient';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'À Propos — Expertise BTP & Gros Œuvre à Madagascar',
  description:
    'Découvrez l\'histoire, l\'ambition et l\'excellence de MPANORINA NOFY. Entreprise spécialisée dans le gros œuvre et la construction de bâtiments de haute qualité à Madagascar.',
  keywords: [
    'À propos MPANORINA NOFY',
    'histoire BTP Madagascar',
    'entreprise BTP Antananarivo',
    'gros oeuvre Madagascar',
    'expert construction Madagascar',
    'équipe BTP Madagascar',
  ],
  alternates: {
    canonical: `${siteConfig.url}/a-propos`,
  },
  openGraph: {
    title: 'À Propos de MPANORINA NOFY | Construction Madagascar',
    description:
      'Spécialiste du gros œuvre et de la construction durable à Madagascar. Découvrez nos valeurs, nos engagements et notre savoir-faire.',
    url: `${siteConfig.url}/a-propos`,
  },
};

export default function AboutPage() {
  return <AProposClient />;
}
