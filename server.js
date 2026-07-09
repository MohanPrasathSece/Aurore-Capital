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
      const res = await fetch(`${blobs[0].url}?t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${BLOB_TOKEN}` },
        cache: 'no-store'
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
      access: 'private',
      token: BLOB_TOKEN,
      addRandomSuffix: false,
      allowOverwrite: true
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
  const success = await saveBlobData('aurore_users.json', users);
  if (!success) throw new Error('Failed to save user to storage');
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
    const [first_name, ...lastNameParts] = (data.name || "Unknown").trim().split(" ");
    const last_name = lastNameParts.length > 0 ? lastNameParts.join(" ") : "Lead";

    let phone = (data.phone || "").replace(/[^0-9+]/g, '');
    if (phone) {
      if (phone.startsWith('+')) {
        phone = '00' + phone.slice(1);
      }
      if (phone.startsWith('41') && phone.length === 11) {
        phone = '00' + phone;
      }
      if (!phone.startsWith('0041')) {
        if (phone.startsWith('0') && !phone.startsWith('00')) {
          phone = '0041' + phone.slice(1);
        } else if (!phone.startsWith('00')) {
          phone = '0041' + phone;
        }
      }
    } else {
      phone = "0000000000";
    }

    const payload = {
      country_name: "ch",
      description: "Aurore Capital",
      phone: phone,
      email: data.email || "no-email@example.com",
      first_name: first_name,
      last_name: last_name,
      custom_fields: {
        Source_ID: "website",
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
      try {
        const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://autodigix-leads-dashboard.vercel.app/api/increment";
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ website: "Aurore Capital", type: source === 'signup' ? 'signup' : 'contact', name: data.name, email: data.email})
        }).catch(() => {});
      } catch(e){}
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
  
  try {
    await saveUser(newUser);
    // Sync to CRM
    syncAffiliateToCRM({ ...newUser, message: 'Signup' }, 'signup');
    incrementLeadCount();
    res.json({ success: true, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create account. Please ensure Vercel Blob is configured correctly.' });
  }
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
  incrementLeadCount();

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
  incrementLeadCount();

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
// Note: Vercel serves static files automatically, but this handles local / non-Vercel deployments.
if (!process.env.VERCEL) {
  app.use(express.static(path.join(__dirname, 'dist')));

  // Fallback for React Router
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}


// --- persistent lead counter stored in vercel blob ---
async function incrementLeadCount() {
  try {
    const { list, put } = await import('@vercel/blob');
    let count = 0;
    try {
      const { blobs } = await list({ prefix: 'leads-count.json', token: process.env.BLOB_READ_WRITE_TOKEN, storeId: process.env.BLOB_STORE_ID });
      if (blobs.length > 0) {
        const fetchRes = await fetch(blobs[0].url);
        if (fetchRes.ok) {
          const json = await fetchRes.json();
          count = typeof json.count === 'number' ? json.count : 0;
        }
      }
    } catch (e) {}
    const next = count + 1;
    await put('leads-count.json', JSON.stringify({ count: next }), {
      access: 'public',
      contentType: 'application/json',
      allowOverwrite: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      storeId: process.env.BLOB_STORE_ID,
      storeId: process.env.BLOB_STORE_ID,
    });
    console.log(`[leads-count] incremented to ${next}`);
  } catch (err) {
    console.error('[leads-count] increment error:', err);
  }
}

app.get('/api/leads-count', async (req, res) => {
  try {
    const { list } = await import('@vercel/blob');
    const { blobs } = await list({ prefix: 'leads-count.json', token: process.env.BLOB_READ_WRITE_TOKEN, storeId: process.env.BLOB_STORE_ID });
    if (blobs.length === 0) return res.json({ count: 0 });
    const fetchRes = await fetch(blobs[0].url);
    if (!fetchRes.ok) return res.json({ count: 0 });
    const json = await fetchRes.json();
    return res.json({ count: typeof json.count === 'number' ? json.count : 0 });
  } catch (err) {
    return res.json({ count: 0 });
  }
});

app.post('/api/leads-count', async (req, res) => {
  try {
    const { list, put } = await import('@vercel/blob');
    let count = 0;
    try {
      const { blobs } = await list({ prefix: 'leads-count.json', token: process.env.BLOB_READ_WRITE_TOKEN, storeId: process.env.BLOB_STORE_ID });
      if (blobs.length > 0) {
        const fetchRes = await fetch(blobs[0].url);
        if (fetchRes.ok) {
          const json = await fetchRes.json();
          count = typeof json.count === 'number' ? json.count : 0;
        }
      }
    } catch (e) {}
    const next = count + 1;
    await put('leads-count.json', JSON.stringify({ count: next }), {
      access: 'public',
      contentType: 'application/json',
      allowOverwrite: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      storeId: process.env.BLOB_STORE_ID,
      storeId: process.env.BLOB_STORE_ID,
    });
    return res.json({ count: next });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default app;
