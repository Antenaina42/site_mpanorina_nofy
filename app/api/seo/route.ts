import { NextResponse } from 'next/server';
import { getSectionContentFromDb, saveSectionContentToDb } from '@/lib/db';
import { defaultSiteContent } from '@/lib/defaultContent';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const seoData = (await getSectionContentFromDb('seo')) || defaultSiteContent.seo;
    const isIndexed = seoData?.isIndexed !== false;

    return NextResponse.json(
      { success: true, isIndexed, seoData },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Erreur lors de la récupération du statut SEO' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    let isIndexed = true;

    try {
      const rawText = await request.text();
      if (rawText) {
        const body = JSON.parse(rawText);
        isIndexed = body.isIndexed === true || body.isIndexed === 'true' || body.isIndexed === 1;
      }
    } catch (parseErr) {
      console.warn('[SEO API] Body parse fallback:', parseErr);
    }

    const seoData = {
      isIndexed,
      updatedAt: new Date().toISOString(),
    };

    await saveSectionContentToDb('seo', seoData);

    return NextResponse.json({
      success: true,
      isIndexed,
      message: isIndexed
        ? 'Indexation activée : Le site est maintenant visible et indexable par Google.'
        : 'Désindexation activée : Le site est masqué pour Google (balise noindex/nofollow et robots.txt disallow).',
      seoData,
    });
  } catch (error: any) {
    console.error('[SEO API Error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Erreur lors de la modification du statut SEO' },
      { status: 500 }
    );
  }
}
