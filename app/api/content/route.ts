import { NextResponse } from 'next/server';
import { getAllSiteContentFromDb, getSectionContentFromDb, saveSectionContentToDb } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (section) {
      const data = await getSectionContentFromDb(section);
      return NextResponse.json(
        { success: true, section, data },
        { headers: { 'Cache-Control': 'no-store, max-age=0' } }
      );
    }

    const { content, isDbConnected } = await getAllSiteContentFromDb();
    return NextResponse.json(
      { success: true, content, isDbConnected },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur de récupération du contenu' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { section, data } = body;

    if (!section || !data) {
      return NextResponse.json(
        { success: false, error: 'La section et les données sont obligatoires.' },
        { status: 400 }
      );
    }

    const saved = await saveSectionContentToDb(section, data);
    return NextResponse.json({
      success: true,
      message: `Contenu de la section "${section}" enregistré avec succès.`,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur lors de la sauvegarde du contenu' },
      { status: 500 }
    );
  }
}
