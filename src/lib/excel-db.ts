import * as xlsx from 'xlsx';
import fs from 'node:fs';
import path from 'node:path';

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DB_DIR, 'users.xlsx');

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  signupDate: string;
}

function initDB() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet([]);
    xlsx.utils.book_append_sheet(wb, ws, 'Users');
    const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
    fs.writeFileSync(DB_FILE, buf);
  }
}

export function getUsers(): User[] {
  initDB();
  const buf = fs.readFileSync(DB_FILE);
  const wb = xlsx.read(buf, { type: 'buffer' });
  const ws = wb.Sheets['Users'];
  return xlsx.utils.sheet_to_json(ws);
}

export function saveUser(user: User) {
  const users = getUsers();
  users.push(user);
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(users);
  xlsx.utils.book_append_sheet(wb, ws, 'Users');
  const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
  fs.writeFileSync(DB_FILE, buf);
}

export function getExcelFileBuffer(): Buffer {
  initDB();
  return fs.readFileSync(DB_FILE);
}
