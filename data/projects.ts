export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  mainImage: string;
  images: string[];
  details: {
    surface?: string;
    duration?: string;
    type?: string;
  };
}

export const projectCategories = [
  'Tous',
  'Résidentiel',
  'Commercial',
  'Construction',
  'Rénovation',
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const projects: Project[] = [
  {
    id: '1',
    slug: 'residence-ivandry',
    title: 'Résidence Ivandry',
    location: 'Antananarivo, Madagascar',
    category: 'Résidentiel',
    year: '2024',
    description: 'Construction d\'une résidence moderne de standing dans le quartier d\'Ivandry.',
    longDescription:
      'Ce projet résidentiel de standing comprend la construction complète d\'une villa contemporaine de 350m² dans le quartier prisé d\'Ivandry à Antananarivo. Le projet intègre des matériaux de haute qualité, un design architectural moderne et des finitions premium.',
    mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    details: {
      surface: '350 m²',
      duration: '8 mois',
      type: 'Villa contemporaine',
    },
  },
  {
    id: '2',
    slug: 'immeuble-commercial-ankorondrano',
    title: 'Immeuble Commercial Ankorondrano',
    location: 'Antananarivo, Madagascar',
    category: 'Commercial',
    year: '2023',
    description: 'Construction d\'un immeuble de bureaux moderne à Ankorondrano.',
    longDescription:
      'Réalisation d\'un immeuble commercial de 4 étages dans la zone d\'affaires d\'Ankorondrano. Ce projet comprend des espaces de bureaux modernes, un parking souterrain et des aménagements extérieurs paysagers.',
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    ],
    details: {
      surface: '1 200 m²',
      duration: '14 mois',
      type: 'Immeuble de bureaux',
    },
  },
  {
    id: '3',
    slug: 'villa-tamatave',
    title: 'Villa Bord de Mer',
    location: 'Tamatave, Madagascar',
    category: 'Résidentiel',
    year: '2024',
    description: 'Construction d\'une villa en bord de mer avec vue panoramique.',
    longDescription:
      'Cette villa d\'exception en bord de mer à Tamatave offre une vue panoramique sur l\'océan Indien. La construction intègre des matériaux résistants au climat tropical et un design architectural ouvert sur l\'extérieur.',
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
    ],
    details: {
      surface: '280 m²',
      duration: '10 mois',
      type: 'Villa bord de mer',
    },
  },
  {
    id: '4',
    slug: 'centre-commercial-analakely',
    title: 'Centre Commercial Analakely',
    location: 'Antananarivo, Madagascar',
    category: 'Commercial',
    year: '2023',
    description: 'Rénovation complète d\'un centre commercial historique.',
    longDescription:
      'Réhabilitation et modernisation d\'un centre commercial dans le quartier historique d\'Analakely. Le projet a combiné respect du patrimoine architectural et intégration d\'équipements modernes.',
    mainImage: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80',
      'https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=800&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    ],
    details: {
      surface: '2 500 m²',
      duration: '18 mois',
      type: 'Centre commercial',
    },
  },
  {
    id: '5',
    slug: 'residence-antsirabe',
    title: 'Lotissement Résidentiel',
    location: 'Antsirabe, Madagascar',
    category: 'Construction',
    year: '2022',
    description: 'Construction d\'un lotissement de 12 maisons individuelles.',
    longDescription:
      'Réalisation d\'un lotissement résidentiel complet comprenant 12 maisons individuelles, voiries, réseaux et espaces verts. Un projet d\'envergure démontrant notre capacité à gérer des chantiers de grande échelle.',
    mainImage: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    ],
    details: {
      surface: '4 800 m²',
      duration: '24 mois',
      type: 'Lotissement',
    },
  },
  {
    id: '6',
    slug: 'renovation-hotel-majunga',
    title: 'Hôtel Bord de Plage',
    location: 'Majunga, Madagascar',
    category: 'Rénovation',
    year: '2024',
    description: 'Rénovation complète d\'un hôtel en bord de plage.',
    longDescription:
      'Rénovation totale d\'un hôtel de 30 chambres en bord de plage à Majunga. Le projet comprend le renforcement structural, la modernisation des installations et la création de nouveaux espaces communs.',
    mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    ],
    details: {
      surface: '1 800 m²',
      duration: '12 mois',
      type: 'Hôtel',
    },
  },
];
