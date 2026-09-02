import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Nos Réalisations',
  description: `Découvrez les projets réalisés par ${siteConfig.name}. Construction, rénovation et gros œuvre à Madagascar.`,
};

export default function RealisationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
