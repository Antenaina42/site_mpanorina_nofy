import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contactez ${siteConfig.name} pour vos projets de construction à Madagascar. Devis gratuit.`,
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
