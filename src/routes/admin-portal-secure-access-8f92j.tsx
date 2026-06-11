import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin-portal-secure-access-8f92j')({
  component: ExportData,
});

function ExportData() {
  const handleDownload = async (type: 'users' | 'contacts') => {
    try {
      const res = await fetch(`http://localhost:5000/api/x-secure-admin/data/${type}?key=aurore-admin-2026`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      
      const a = document.createElement('a');
      a.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${data.base64}`;
      a.download = type === 'users' ? 'aurore_users.xlsx' : 'aurore_contacts.xlsx';
      a.click();
    } catch (err) {
      console.error(err);
      alert(`Échec du téléchargement des données ${type}`);
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
            className="w-full sm:w-auto rounded-full bg-gradient-brand px-8 py-3.5 font-semibold text-white transition-opacity hover:opacity-90 shadow-md"
          >
            Télécharger les utilisateurs (.xlsx)
          </button>
          <button
            onClick={() => handleDownload('contacts')}
            className="w-full sm:w-auto rounded-full bg-ink px-8 py-3.5 font-semibold text-white transition-opacity hover:opacity-90 shadow-md"
          >
            Télécharger les contacts (.xlsx)
          </button>
        </div>
      </div>
    </div>
  );
}
