import express from 'express';
import cors from 'cors';
import xlsx from 'xlsx';
import dotenv from 'dotenv';
import { put, list } from '@vercel/blob';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

// Vercel Blob Helpers
async function getBlobData(filename) {
  try {
    const { blobs } = await list({ prefix: filename, token: BLOB_TOKEN });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, {
        headers: { Authorization: `Bearer ${BLOB_TOKEN}` }
      });
      if (res.ok) return await res.json();
    }
    return []; // Return empty array if not found
  } catch (err) {
    console.error(`Error fetching ${filename} from Blob:`, err);
    return [];
  }
}

async function saveBlobData(filename, data) {
  try {
    await put(filename, JSON.stringify(data, null, 2), {
      access: 'public', // Using public to ensure fetch without auth logic works easily if needed, but since we have token we could use private.
      token: BLOB_TOKEN,
      addRandomSuffix: false
    });
    return true;
  } catch (err) {
    console.error(`Error saving ${filename} to Blob:`, err);
    return false;
  }
}

// Helpers
async function getUsers() {
  return await getBlobData('aurore_users.json');
}

async function saveUser(user) {
  const users = await getUsers();
  users.push(user);
  await saveBlobData('aurore_users.json', users);
}

async function getContacts() {
  return await getBlobData('aurore_contacts.json');
}

async function saveContact(contact) {
  const contacts = await getContacts();
  contacts.push(contact);
  await saveBlobData('aurore_contacts.json', contacts);
}

// Helpers for CRM API
async function syncAffiliateToCRM(data, source = 'website') {
  if (!process.env.CRM_API_URL || !process.env.CRM_API_TOKEN_POST) {
    console.warn('CRM credentials missing, skipping sync');
    return;
  }
  
  try {
    const nameParts = (data.name || '').split(' ');
    const firstName = nameParts[0] || 'Unknown';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Doe';
    
    const payload = {
      country_name: "cy",
      description: data.message || `Signup from ${source}`,
      phone: data.phone || "0000000000",
      email: data.email || "no-email@example.com",
      first_name: firstName,
      last_name: lastName,
      custom_fields: {
        Source_ID: source,
        How_Much_Invested: "0",
        Outline_Your_Case: data.message || ""
      }
    };

    const response = await fetch(process.env.CRM_API_URL, {
      method: 'POST',
      headers: {
        'authorization': process.env.CRM_API_TOKEN_POST,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('CRM Sync failed:', await response.text());
    } else {
      console.log(`Successfully synced affiliate to CRM from ${source}`);
    }
  } catch (error) {
    console.error('Error syncing to CRM:', error);
  }
}

// Routes
app.post('/api/signup', async (req, res) => {
  const { name, email, phone } = req.body;
  const users = await getUsers();
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  const newUser = {
    id: Math.random().toString(36).substring(7),
    name, email, phone,
    signupDate: new Date().toISOString()
  };
  await saveUser(newUser);
  
  // Sync to CRM
  syncAffiliateToCRM({ ...newUser, message: 'Signup' }, 'signup');
  
  res.json({ success: true, user: newUser });
});

app.post('/api/login', async (req, res) => {
  const { email } = req.body;
  const users = await getUsers();
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ error: 'User not found. Please create an account.' });
  }
  res.json({ success: true, user });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  await saveContact({
    id: Math.random().toString(36).substring(7),
    name, email, phone, message,
    date: new Date().toISOString()
  });
  
  // Sync to CRM
  syncAffiliateToCRM(req.body, 'contact');

  res.json({ success: true });
});

app.post('/api/institutional', async (req, res) => {
  const { name, email, phone, message } = req.body;
  await saveContact({
    id: Math.random().toString(36).substring(7),
    name, email, phone, message,
    date: new Date().toISOString()
  });
  
  // Sync to CRM
  syncAffiliateToCRM(req.body, 'institutional');

  res.json({ success: true });
});

app.get('/api/x-secure-admin/data/users', async (req, res) => {
  if (req.query.key !== 'aurore-admin-2026') return res.status(403).json({ error: 'Unauthorized' });
  const users = await getUsers();
  
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(users);
  xlsx.utils.book_append_sheet(wb, ws, 'Users');
  const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
  
  res.json({ base64: buf.toString('base64') });
});

app.get('/api/x-secure-admin/data/contacts', async (req, res) => {
  if (req.query.key !== 'aurore-admin-2026') return res.status(403).json({ error: 'Unauthorized' });
  const contacts = await getContacts();
  
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(contacts);
  xlsx.utils.book_append_sheet(wb, ws, 'Contacts');
  const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
  
  res.json({ base64: buf.toString('base64') });
});

// Serve static files from the Vite build (dist)
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
