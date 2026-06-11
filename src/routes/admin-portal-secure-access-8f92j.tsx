import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/admin-portal-secure-access-8f92j')({
  component: ExportData,
});

function ExportData() {
  const [startDate, setStartDate] = useState('20.01.2019');
  const [endDate, setEndDate] = useState('20.02.2026');
  const [loading, setLoading] = useState(false);

  const handleDownload = async (type: 'users' | 'contacts' | 'affiliates') => {
    try {
      setLoading(true);
      let url = `http://localhost:5000/api/x-secure-admin/data/${type}?key=aurore-admin-2026`;
      if (type === 'affiliates') {
        url += `&start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}`;
      }
      
      const res = await fetch(url);
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
      <div className="text-center max-w-3xl px-6">
        <h1 className="text-3xl font-display font-bold text-ink">Tableau de bord d'administration</h1>
        <p className="mt-4 text-ink-soft">Téléchargez la dernière base de données en toute sécurité.</p>
        
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <button
            onClick={() => handleDownload('users')}
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-brand px-6 py-4 font-semibold text-white transition-opacity hover:opacity-90 shadow-md disabled:opacity-50"
          >
            Télécharger les utilisateurs
          </button>
          
          <button
            onClick={() => handleDownload('contacts')}
            disabled={loading}
            className="w-full rounded-2xl bg-ink px-6 py-4 font-semibold text-white transition-opacity hover:opacity-90 shadow-md disabled:opacity-50"
          >
            Télécharger les contacts
          </button>

          <div className="w-full rounded-2xl border border-primary/10 bg-white p-4 shadow-md flex flex-col gap-3">
            <h3 className="font-semibold text-ink text-sm">Synchronisation CRM</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="DD.MM.YYYY"
                className="w-full rounded-lg border border-primary/20 bg-secondary/40 px-3 py-2 text-xs text-ink outline-none"
              />
              <input 
                type="text" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="DD.MM.YYYY"
                className="w-full rounded-lg border border-primary/20 bg-secondary/40 px-3 py-2 text-xs text-ink outline-none"
              />
            </div>
            <button
              onClick={() => handleDownload('affiliates')}
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Exporter les affiliés
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
