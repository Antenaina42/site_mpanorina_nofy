import { NextResponse } from 'next/server';
import { getAllProjectsFromDb } from '@/lib/db';

export async function GET() {
  try {
    const { projects, isDbConnected } = await getAllProjectsFromDb();

    const categoriesCount: Record<string, number> = {};
    projects.forEach((p) => {
      categoriesCount[p.category] = (categoriesCount[p.category] || 0) + 1;
    });

    const recentProjects = projects.slice(0, 5);

    return NextResponse.json({
      success: true,
      stats: {
        totalProjects: projects.length,
        categoriesCount,
        isDbConnected,
        recentProjects,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
