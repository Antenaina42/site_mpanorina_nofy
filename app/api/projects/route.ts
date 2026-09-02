import { NextResponse } from 'next/server';
import { getAllProjectsFromDb, createProjectInDb } from '@/lib/db';

export async function GET() {
  try {
    const { projects, isDbConnected } = await getAllProjectsFromDb();
    return NextResponse.json(
      { success: true, projects, isDbConnected },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur de récupération des projets' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.title || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Le titre et la catégorie sont obligatoires.' },
        { status: 400 }
      );
    }

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const projectData = {
      slug,
      title: body.title,
      location: body.location || 'Madagascar',
      category: body.category,
      year: body.year || new Date().getFullYear().toString(),
      description: body.description || '',
      longDescription: body.longDescription || body.description || '',
      mainImage: body.mainImage || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80',
      images: Array.isArray(body.images) && body.images.length > 0 ? body.images : [body.mainImage || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80'],
      details: {
        surface: body.surface || undefined,
        duration: body.duration || undefined,
        type: body.type || undefined,
      },
    };

    const created = await createProjectInDb(projectData);

    return NextResponse.json({ success: true, project: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Erreur lors de la création du projet' },
      { status: 500 }
    );
  }
}
