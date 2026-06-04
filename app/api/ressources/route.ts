import { NextRequest, NextResponse } from 'next/server';
import { getRessources } from '@/lib/airtable';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || undefined;
  const niveau = searchParams.get('niveau') || undefined;
  const categorie = searchParams.get('categorie') || undefined;
  const technique = searchParams.get('technique') || undefined;

  try {
    const ressources = await getRessources({ type, niveau, categorie, technique });
    return NextResponse.json(ressources);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur Airtable' }, { status: 500 });
  }
}
