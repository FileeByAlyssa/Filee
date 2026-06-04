import { NextRequest, NextResponse } from 'next/server';
import { updateStatut } from '@/lib/airtable';

export async function POST(request: NextRequest) {
  const { id, statut } = await request.json();
  if (!id || !statut) {
    return NextResponse.json({ error: 'id et statut requis' }, { status: 400 });
  }
  try {
    await updateStatut(id, statut);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur mise à jour' }, { status: 500 });
  }
}
