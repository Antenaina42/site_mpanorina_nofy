import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Nos Services',
  description: `Découvrez nos services de construction, gros œuvre, rénovation et conception. ${siteConfig.name} - Madagascar.`,
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
