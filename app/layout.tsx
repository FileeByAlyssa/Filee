import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Filée — Couture pour débutantes',
  description: 'Tutos YouTube, patrons PDF, conseils — tout au même endroit pour apprendre à coudre.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Playfair+Display:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
