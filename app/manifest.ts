import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Construction & Gros Œuvre`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF8',
    theme_color: '#1A5167',
    icons: [
      {
        src: '/logo.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/logo.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
