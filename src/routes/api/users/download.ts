import { createAPIFileRoute } from '@tanstack/react-start/api';
import { getExcelFileBuffer } from '@/lib/excel-db';

export const APIRoute = createAPIFileRoute('/api/users/download')({
  GET: async () => {
    try {
      const buffer = getExcelFileBuffer();
      return new Response(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename="users.xlsx"',
        },
      });
    } catch (e) {
      console.error(e);
      return new Response('Error reading file', { status: 500 });
    }
  },
});
