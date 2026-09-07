import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Services BTP, Gros Œuvre & Construction à Madagascar',
  description:
    'Nos services de construction BTP à Madagascar : gros œuvre, construction résidentielle et commerciale, rénovation lourd, études techniques et génie civil. Excellence garantie.',
  keywords: [
    'services BTP Madagascar',
    'gros oeuvre Antananarivo',
    'construction résidentielle Madagascar',
    'bâtiment commercial Madagascar',
    'rénovation bâtiment Madagascar',
    'génie civil Madagascar',
    'devis travaux Madagascar',
  ],
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: 'Services de Construction & Gros Œuvre | MPANORINA NOFY Madagascar',
    description:
      'Gros œuvre, rénovation, bâtiments commerciaux et résidentiels. Solutions complètes de construction à Madagascar.',
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
