import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getExcelFileBuffer } from '@/lib/excel-db';

const getExcelData = createServerFn({ method: 'GET' })
  .handler(async () => {
    const buffer = getExcelFileBuffer();
    return { base64: buffer.toString('base64') };
  });

export const Route = createFileRoute('/export-data')({
  component: ExportData,
});

function ExportData() {
  const handleDownload = async () => {
    try {
      const res = await getExcelData();
      const a = document.createElement('a');
      a.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res.base64}`;
      a.download = 'aurore_users.xlsx';
      a.click();
    } catch (err) {
      console.error(err);
      alert('Failed to download data');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-3xl font-display font-bold text-ink">Admin Dashboard</h1>
        <p className="mt-4 text-ink-soft">Download the latest user database securely.</p>
        <button
          onClick={handleDownload}
          className="mt-8 rounded-full bg-gradient-brand px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 shadow-md"
        >
          Download Users Excel (.xlsx)
        </button>
      </div>
    </div>
  );
}
