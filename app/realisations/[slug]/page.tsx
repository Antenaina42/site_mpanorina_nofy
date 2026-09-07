import type { Metadata } from 'next';
import ProjectDetailClient from './ProjectDetailClient';
import { projects as defaultProjects } from '@/data/projects';
import { siteConfig } from '@/data/site';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = defaultProjects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Projet non trouvé — MPANORINA NOFY',
    };
  }

  return {
    title: `${project.title} — Projet de Construction à ${project.location}`,
    description: `Chantier ${project.title} à ${project.location} réalisé par MPANORINA NOFY. ${project.description.slice(0, 150)}...`,
    keywords: [
      project.title,
      `construction ${project.location}`,
      `gros oeuvre ${project.location}`,
      project.category,
      'MPANORINA NOFY',
      'réalisation BTP Madagascar',
    ],
    alternates: {
      canonical: `${siteConfig.url}/realisations/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | MPANORINA NOFY Madagascar`,
      description: project.description.slice(0, 160),
      url: `${siteConfig.url}/realisations/${project.slug}`,
      images: [
        {
          url: project.mainImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return <ProjectDetailClient params={params} />;
}
