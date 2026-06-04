const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID!
);

export type Ressource = {
  id: string;
  titre: string;
  url: string;
  type: 'YouTube' | 'Article' | 'Patron PDF';
  niveau: 'Débutant' | 'Intermédiaire' | 'Avancé';
  categorie: 'Vêtement' | 'Accessoire' | 'Maison' | 'Enfant';
  technique: string;
  source: string;
  duree: string;
  statut: 'En attente' | 'Publié' | 'Refusé';
  dateAjout: string;
  image: string;
};

export async function getRessources(filters?: {
  type?: string;
  niveau?: string;
  categorie?: string;
  technique?: string;
}): Promise<Ressource[]> {
  const records = await base(process.env.AIRTABLE_TABLE_NAME)
    .select({
      filterByFormula: `{Statut} = 'Publié'`,
      sort: [{ field: 'Date ajout', direction: 'desc' }],
    })
    .all();

  let ressources: Ressource[] = records.map((record: any) => ({
    id: record.id,
    titre: record.get('Titre') || '',
    url: record.get('URL') || '',
    type: record.get('Type') || '',
    niveau: record.get('Niveau') || '',
    categorie: record.get('Catégorie') || '',
    technique: record.get('Technique') || '',
    source: record.get('Source') || '',
    duree: record.get('Durée') || '',
    statut: record.get('Statut') || '',
    dateAjout: record.get('Date ajout') || '',
    image: record.get('Miniature') || '', // 👈 Mis à jour ici avec "Miniature" !
  }));

  if (filters?.type) ressources = ressources.filter(r => r.type === filters.type);
  if (filters?.niveau) ressources = ressources.filter(r => r.niveau === filters.niveau);
  if (filters?.categorie) ressources = ressources.filter(r => r.categorie === filters.categorie);
  if (filters?.technique) ressources = ressources.filter(r => r.technique === filters.technique);

  return ressources;
}

export async function updateStatut(id: string, statut: 'Publié' | 'Refusé') {
  await base(process.env.AIRTABLE_TABLE_NAME).update(id, { Statut: statut });
}
