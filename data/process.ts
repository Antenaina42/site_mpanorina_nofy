export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

export const approachSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'ÉCOUTER',
    description:
      'Nous prenons le temps de comprendre votre vision, vos besoins et vos contraintes pour poser les bases d\'un projet réussi.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
  },
  {
    number: '02',
    title: 'IMAGINER',
    description:
      'Notre équipe de conception transforme vos idées en plans concrets, alliant esthétique, fonctionnalité et faisabilité technique.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
  },
  {
    number: '03',
    title: 'PLANIFIER',
    description:
      'Chaque détail est planifié avec précision : calendrier, ressources, matériaux et budget pour garantir une exécution sans faille.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
  },
  {
    number: '04',
    title: 'CONSTRUIRE',
    description:
      'Nos équipes qualifiées mettent en œuvre le projet avec rigueur, en respectant les normes de qualité et les délais convenus.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  },
  {
    number: '05',
    title: 'LIVRER',
    description:
      'Nous livrons un projet fini, conforme à vos attentes, avec un suivi post-construction pour assurer votre entière satisfaction.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Votre projet',
    description: 'Discussion initiale pour comprendre votre vision et définir les objectifs du projet.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
  },
  {
    number: '02',
    title: 'Étude et préparation',
    description: 'Études techniques, analyse du terrain et préparation détaillée du projet.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
  },
  {
    number: '03',
    title: 'Planification',
    description: 'Élaboration du planning, estimation des coûts et organisation des ressources.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
  },
  {
    number: '04',
    title: 'Construction',
    description: 'Exécution des travaux avec un suivi rigoureux de la qualité et des délais.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  },
  {
    number: '05',
    title: 'Livraison',
    description: 'Remise des clés avec contrôle qualité final et documentation complète.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  },
];
