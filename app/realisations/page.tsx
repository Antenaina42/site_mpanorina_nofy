import type { Metadata } from 'next';
import RealisationsClient from './RealisationsClient';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Réalisations & Chantiers de Construction à Madagascar',
  description:
    'Découvrez notre portfolio de projets et réalisations de chantiers à Madagascar : immeubles, villas modernes, ouvrages de gros œuvre et complexes commerciaux.',
  keywords: [
    'réalisations BTP Madagascar',
    'projets construction Antananarivo',
    'chantiers gros oeuvre Madagascar',
    'portfolio bâtiment Madagascar',
    'villas construits Madagascar',
    'immeubles Madagascar MPANORINA NOFY',
  ],
  alternates: {
    canonical: `${siteConfig.url}/realisations`,
  },
  openGraph: {
    title: 'Nos Réalisations & Projets de Construction | MPANORINA NOFY Madagascar',
    description:
      'Consultez nos derniers chantiers de gros œuvre et bâtiments livrés à Madagascar. La preuve par l\'image et l\'excellence.',
    url: `${siteConfig.url}/realisations`,
  },
};

export default function RealisationsPage() {
  return <RealisationsClient />;
}
