export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Nos services', href: '/services' },
  { label: 'Nos réalisations', href: '/realisations' },
  { label: 'Contact', href: '/contact' },
];

export const ctaButton = {
  label: 'Demander un devis',
  href: '/contact',
};
