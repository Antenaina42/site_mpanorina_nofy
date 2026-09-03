import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';
import { getSectionContentFromDb } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function robots(): Promise<MetadataRoute.Robots> {
  let isIndexed = true;

  try {
    const seoData = await getSectionContentFromDb('seo');
    if (seoData && (seoData.isIndexed === false || seoData.isIndexed === 'false' || seoData.isIndexed === 0)) {
      isIndexed = false;
    }
  } catch (err) {
    isIndexed = true;
  }

  // If desindexed (noindex), disallow all search engines completely
  if (!isIndexed) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  // If indexed, allow crawling and specify sitemap
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
