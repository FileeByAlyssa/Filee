'use client';
import { useState, useEffect } from 'react';

type Ressource = {
  id: string;
  titre: string;
  url: string;
  type: string;
  niveau: string;
  categorie: string;
  technique: string;
  source: string;
  duree: string;
};

const NIVEAUX = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];
const TYPES = ['Tous', 'YouTube', 'Article', 'Patron PDF'];
const CATEGORIES = ['Tous', 'Vêtement', 'Accessoire', 'Maison', 'Enfant'];

const TYPE_ICON: Record<string, string> = {
  YouTube: '▶',
  Article: '✦',
  'Patron PDF': '✂',
};

const TYPE_COLOR: Record<string, string> = {
  YouTube: '#E8E0F0',
  Article: '#EBE0D0',
  'Patron PDF': '#D6E8D8',
};

const TYPE_TEXT: Record<string, string> = {
  YouTube: '#534AB7',
  Article: '#7A5C45',
  'Patron PDF': '#3D6645',
};

export default function Home() {
  const [ressources, setRessources] = useState<Ressource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [niveau, setNiveau] = useState('Tous');
  const [type, setType] = useState('Tous');
  const [categorie, setCategorie] = useState('Tous');

  useEffect(() => {
    fetch('/api/ressources')
      .then(r => r.json())
      .then(data => { setRessources(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = ressources.filter(r => {
    const matchSearch = search === '' || r.titre.toLowerCase().includes(search.toLowerCase()) || r.source.toLowerCase().includes(search.toLowerCase());
    const matchNiveau = niveau === 'Tous' || r.niveau === niveau;
    const matchType = type === 'Tous' || r.type === type;
    const matchCat = categorie === 'Tous' || r.categorie === categorie;
    return matchSearch && matchNiveau && matchType && matchCat;
  });

  const tutos = filtered.filter(r => r.type !== 'Patron PDF');
  const patrons = filtered.filter(r => r.type === 'Patron PDF');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'var(--dark)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: '#F5F0E8', letterSpacing: 1 }}>
          fil<span style={{ color: 'var(--accent)' }}>é</span>e
        </span>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Tutos', 'Patrons', 'Par où commencer'].map(l => (
            <span key={l} style={{ fontSize: 13, color: '#C2B8A8', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
      </nav>

      <div style={{ background: 'var(--mid)', padding: '48px 32px 40px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'var(--accent)', color: 'var(--dark)', fontSize: 11, fontWeight: 600, padding: '3px 12px', borderRadius: 20, marginBottom: 16, letterSpacing: 0.5 }}>
          ✦ Couture pour débutantes
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 400, color: '#F5F0E8', lineHeight: 1.3, marginBottom: 10, fontFamily: 'Playfair Display, serif' }}>
          Tout ce qu'il faut pour coudre,<br />au même endroit.
        </h1>
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 28 }}>
          Tutos YouTube, patrons PDF, conseils — triés, notés, prêts à l'emploi.
        </p>
        <div style={{ background: '#F5F0E8', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, maxWidth: 460, margin: '0 auto 24px' }}>
          <span style={{ color: 'var(--muted)', fontSize: 16 }}>⌕</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un tuto, une technique, un patron…" style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: 'var(--dark)', width: '100%' }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          {NIVEAUX.map(n => (
            <button key={n} onClick={() => setNiveau(n)} style={{ background: niveau === n ? 'var(--accent)' : 'transparent', border: `1px solid ${niveau === n ? 'var(--accent)' : '#7A5C45'}`, borderRadius: 20, padding: '5px 14px', fontSize: 12, color: niveau === n ? 'var(--dark)' : '#C2B8A8', cursor: 'pointer' }}>{n}</button>
          ))}
          {TYPES.filter(t => t !== 'Tous').map(t => (
            <button key={t} onClick={() => setType(type === t ? 'Tous' : t)} style={{ background: type === t ? 'var(--accent)' : 'transparent', border: `1px solid ${type === t ? 'var(--accent)' : '#7A5C45'}`, borderRadius: 20, padding: '5px 14px', fontSize: 12, color: type === t ? 'var(--dark)' : '#C2B8A8', cursor: 'pointer' }}>{t}</button>
          ))}
          {CATEGORIES.filter(c => c !== 'Tous').map(c => (
            <button key={c} onClick={() => setCategorie(categorie === c ? 'Tous' : c)} style={{ background: categorie === c ? 'var(--accent)' : 'transparent', border: `1px solid ${categorie === c ? 'var(--accent)' : '#7A5C45'}`, borderRadius: 20, padding: '5px 14px', fontSize: 12, color: categorie === c ? 'var(--dark)' : '#C2B8A8', cursor: 'pointer' }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {loading && <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)', fontSize: 14 }}>Chargement des ressources…</div>}
        {!loading && filtered.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)', fontSize: 14 }}>Aucune ressource pour l'instant — elles arrivent dimanche ! ✦</div>}
        {tutos.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 400, fontFamily: 'Playfair Display, serif' }}>Tutos</h2>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{tutos.length} ressource{tutos.length > 1 ? 's' : ''}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
              {tutos.map(r => <CarteRessource key={r.id} r={r} />)}
            </div>
          </section>
        )}
        {patrons.length > 0 && (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 400, fontFamily: 'Playfair Display, serif' }}>Patrons PDF gratuits</h2>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{patrons.length} patron{patrons.length > 1 ? 's' : ''}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {patrons.map(r => <CartePatron key={r.id} r={r} />)}
            </div>
          </section>
        )}
      </div>

      <footer style={{ background: 'var(--dark)', padding: '24px 32px', textAlign: 'center', marginTop: 40 }}>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#F5F0E8' }}>fil<span style={{ color: 'var(--accent)' }}>é</span>e</span>
        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>Ressources couture sélectionnées chaque semaine</p>
      </footer>
    </div>
  );
}

function getYoutubeThumbnail(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
}

function CarteRessource({ r }: { r: Ressource }) {
  const thumbnail = r.type === 'YouTube' ? getYoutubeThumbnail(r.url) : null;
  return (
    <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <div style={{ background: 'var(--bg2)', borderRadius: 12, border: '0.5px solid var(--border)', overflow: 'hidden', cursor: 'pointer' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
        <div style={{ height: 80, background: TYPE_COLOR[r.type] || 'var(--tag-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, overflow: 'hidden', position: 'relative' }}>
          {thumbnail ? (
            <img src={thumbnail} alt={r.titre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            TYPE_ICON[r.type] || '✦'
          )}
        </div>
        <div style={{ padding: '12px 14px' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
            {r.niveau && <Badge text={r.niveau} bg="var(--tag-bg)" color="var(--tag-text)" />}
            {r.type && <Badge text={r.type} bg={TYPE_COLOR[r.type] || 'var(--tag-bg)'} color={TYPE_TEXT[r.type] || 'var(--tag-text)'} />}
          </div>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', lineHeight: 1.4, marginBottom: 6 }}>{r.titre}</p>
          <p style={{ fontSize: 11, color: 'var(--muted)' }}>{r.source}{r.duree ? ` · ${r.duree}` : ''}</p>
        </div>
      </div>
    </a>
  );
}

function CartePatron({ r }: { r: Ressource }) {
  return (
    <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <div style={{ background: 'var(--bg2)', borderRadius: 12, border: '0.5px solid var(--border)', padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'flex-start', cursor: 'pointer' }} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
        <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>✂</div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--dark)', marginBottom: 6, lineHeight: 1.4 }}>{r.titre}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {r.niveau && <Badge text={r.niveau} bg="var(--tag-bg)" color="var(--tag-text)" />}
            <Badge text="PDF gratuit" bg="var(--green-light)" color="var(--green-dark)" />
          </div>
        </div>
      </div>
    </a>
  );
}

function Badge({ text, bg, color }: { text: string; bg: string; color: string }) {
  return <span style={{ background: bg, color, fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20 }}>{text}</span>;
}
