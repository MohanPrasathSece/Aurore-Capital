import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/admin-portal-secure-access-8f92j')({
  component: ExportData,
});

function ExportData() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async (type: 'users' | 'contacts') => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/x-secure-admin/data/${type}?key=aurore-admin-2026`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      const a = document.createElement('a');
      a.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${data.base64}`;
      a.download = `aurore_${type}.xlsx`;
      a.click();
    } catch (err) {
      console.error(err);
      alert(`Échec du téléchargement des données ${type}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-background text-foreground">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-3xl font-display font-bold text-ink">Tableau de bord d'administration</h1>
        <p className="mt-4 text-ink-soft">Téléchargez la dernière base de données en toute sécurité.</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => handleDownload('users')}
            disabled={loading}
            className="w-full sm:w-auto rounded-full bg-gradient-brand px-8 py-3.5 font-semibold text-white transition-opacity hover:opacity-90 shadow-md disabled:opacity-50"
          >
            Télécharger les utilisateurs (.xlsx)
          </button>
          <button
            onClick={() => handleDownload('contacts')}
            disabled={loading}
            className="w-full sm:w-auto rounded-full bg-ink px-8 py-3.5 font-semibold text-white transition-opacity hover:opacity-90 shadow-md disabled:opacity-50"
          >
            Télécharger les contacts (.xlsx)
          </button>
        </div>
      </div>
    </div>
  );
}
