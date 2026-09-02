import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'À Propos',
  description: `Découvrez l'histoire et les valeurs de ${siteConfig.name}, entreprise de construction à Madagascar.`,
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
