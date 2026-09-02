export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  image: string;
}

export const services: Service[] = [
  {
    id: 'gros-oeuvre',
    number: '01',
    title: 'GROS ŒUVRE',
    description:
      'Réalisation complète des structures porteuses de vos bâtiments avec rigueur et précision.',
    longDescription:
      'Notre expertise en gros œuvre couvre l\'ensemble des travaux de structure : fondations, élévation des murs porteurs, dalles, poteaux, poutres et toitures. Nous garantissons la solidité et la durabilité de chaque construction grâce à des techniques éprouvées et des matériaux de qualité.',
    features: [
      'Fondations et terrassement',
      'Élévation des murs porteurs',
      'Dalles et planchers',
      'Structures en béton armé',
      'Charpente et toiture',
      'Assainissement',
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    id: 'construction-batiments',
    number: '02',
    title: 'CONSTRUCTION DE BÂTIMENTS',
    description:
      'Construction clé en main de bâtiments résidentiels, commerciaux et industriels.',
    longDescription:
      'De la première pierre à la remise des clés, nous prenons en charge la construction complète de vos bâtiments. Résidences, immeubles commerciaux, bâtiments industriels — chaque projet bénéficie de notre savoir-faire et de notre engagement qualité.',
    features: [
      'Bâtiments résidentiels',
      'Immeubles commerciaux',
      'Bâtiments industriels',
      'Constructions publiques',
      'Villas et maisons individuelles',
      'Immeubles collectifs',
    ],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  },
  {
    id: 'renovation-rehabilitation',
    number: '03',
    title: 'RÉNOVATION ET RÉHABILITATION',
    description:
      'Redonner vie aux bâtiments existants tout en respectant leur caractère et leur histoire.',
    longDescription:
      'Nous redonnons vie aux bâtiments existants grâce à nos services de rénovation et de réhabilitation. Que ce soit pour moderniser un espace, renforcer une structure ou transformer une propriété, notre équipe intervient avec expertise et soin du détail.',
    features: [
      'Rénovation complète',
      'Renforcement structural',
      'Mise aux normes',
      'Extension de bâtiments',
      'Réhabilitation de façades',
      'Aménagement intérieur',
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  },
  {
    id: 'etude-conception',
    number: '04',
    title: 'ÉTUDE ET CONCEPTION',
    description:
      'Accompagnement technique et architectural dès la phase de conception de votre projet.',
    longDescription:
      'Notre bureau d\'études accompagne vos projets dès la phase de conception. Études de faisabilité, plans architecturaux, calculs de structure — nous mettons notre expertise technique au service de votre vision pour garantir un projet réalisable, optimisé et conforme.',
    features: [
      'Étude de faisabilité',
      'Plans architecturaux',
      'Calculs de structure',
      'Études de sol',
      'Métrés et devis',
      'Suivi de chantier',
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
  },
  {
    id: 'travaux-construction',
    number: '05',
    title: 'TRAVAUX DE CONSTRUCTION',
    description:
      'Tous types de travaux de construction pour concrétiser vos projets les plus ambitieux.',
    longDescription:
      'De l\'aménagement de terrain aux finitions, nous réalisons l\'ensemble des travaux nécessaires à la concrétisation de vos projets. Notre équipe qualifiée et notre parc matériel nous permettent d\'intervenir sur des chantiers de toute envergure.',
    features: [
      'Terrassement et VRD',
      'Maçonnerie',
      'Béton armé',
      'Coffrage et ferraillage',
      'Enduits et finitions',
      'Aménagements extérieurs',
    ],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&q=80',
  },
];
