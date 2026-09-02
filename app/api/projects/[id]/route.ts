import { NextResponse } from 'next/server';
import { getProjectByIdFromDb, updateProjectInDb, deleteProjectFromDb } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await getProjectByIdFromDb(params.id);
    if (!project) {
      return NextResponse.json({ success: false, error: 'Projet introuvable' }, { status: 404 });
    }
    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = await updateProjectInDb(params.id, body);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Projet non trouvé ou non modifié' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await deleteProjectFromDb(params.id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Impossible de supprimer ce projet' }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: 'Projet supprimé avec succès' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
