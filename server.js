import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import https from 'https';
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DB_DIR, 'users.xlsx');
const DB_CONTACTS_FILE = path.resolve(DB_DIR, 'contacts.xlsx');

// Initialize DBs
function initDB() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet([]);
    xlsx.utils.book_append_sheet(wb, ws, 'Users');
    const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
    fs.writeFileSync(DB_FILE, buf);
  }
}

function initContactsDB() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  if (!fs.existsSync(DB_CONTACTS_FILE)) {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet([]);
    xlsx.utils.book_append_sheet(wb, ws, 'Contacts');
    const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
    fs.writeFileSync(DB_CONTACTS_FILE, buf);
  }
}

// Helpers
function getUsers() {
  initDB();
  const buf = fs.readFileSync(DB_FILE);
  const wb = xlsx.read(buf, { type: 'buffer' });
  const ws = wb.Sheets['Users'];
  return xlsx.utils.sheet_to_json(ws);
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(users);
  xlsx.utils.book_append_sheet(wb, ws, 'Users');
  const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
  fs.writeFileSync(DB_FILE, buf);
}

function getContacts() {
  initContactsDB();
  const buf = fs.readFileSync(DB_CONTACTS_FILE);
  const wb = xlsx.read(buf, { type: 'buffer' });
  const ws = wb.Sheets['Contacts'];
  return xlsx.utils.sheet_to_json(ws);
}

function saveContact(contact) {
  const contacts = getContacts();
  contacts.push(contact);
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(contacts);
  xlsx.utils.book_append_sheet(wb, ws, 'Contacts');
  const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
  fs.writeFileSync(DB_CONTACTS_FILE, buf);
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
app.post('/api/signup', (req, res) => {
  const { name, email, phone } = req.body;
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  const newUser = {
    id: Math.random().toString(36).substring(7),
    name, email, phone,
    signupDate: new Date().toISOString()
  };
  saveUser(newUser);
  
  // Sync to CRM
  syncAffiliateToCRM({ ...newUser, message: 'Signup' }, 'signup');
  
  res.json({ success: true, user: newUser });
});

app.post('/api/login', (req, res) => {
  const { email } = req.body;
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ error: 'User not found. Please create an account.' });
  }
  res.json({ success: true, user });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  saveContact({
    id: Math.random().toString(36).substring(7),
    name, email, phone, message,
    date: new Date().toISOString()
  });
  
  // Sync to CRM
  syncAffiliateToCRM(req.body, 'contact');

  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL,
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
      });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/api/institutional', async (req, res) => {
  const { name, email, phone, message } = req.body;
  saveContact({
    id: Math.random().toString(36).substring(7),
    name, email, phone, message,
    date: new Date().toISOString()
  });
  
  // Sync to CRM
  syncAffiliateToCRM(req.body, 'institutional');

  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL,
        subject: 'New Institutional Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nExpected Volume/Message: ${message}`
      });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.get('/api/x-secure-admin/data/users', (req, res) => {
  if (req.query.key !== 'aurore-admin-2026') return res.status(403).json({ error: 'Unauthorized' });
  initDB();
  const buf = fs.readFileSync(DB_FILE);
  res.json({ base64: buf.toString('base64') });
});

app.get('/api/x-secure-admin/data/contacts', (req, res) => {
  if (req.query.key !== 'aurore-admin-2026') return res.status(403).json({ error: 'Unauthorized' });
  initContactsDB();
  const buf = fs.readFileSync(DB_CONTACTS_FILE);
  res.json({ base64: buf.toString('base64') });
});

app.get('/api/x-secure-admin/data/affiliates', async (req, res) => {
  if (req.query.key !== 'aurore-admin-2026') return res.status(403).json({ error: 'Unauthorized' });
  
  const { start_date, end_date } = req.query;
  if (!start_date || !end_date) {
    return res.status(400).json({ error: 'start_date and end_date are required (format: DD.MM.YYYY)' });
  }

  try {
    // Some poorly designed APIs require form-data body on GET requests.
    // We try query parameters first as it's standard, but if the API specifically needs form-data, we use http module.
    // To make it fully compliant with the prompt's Postman example, we'll manually construct a multipart body with https.
    
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    let body = '';
    body += `--${boundary}\r\nContent-Disposition: form-data; name="start_date"\r\n\r\n${start_date}\r\n`;
    body += `--${boundary}\r\nContent-Disposition: form-data; name="end_date"\r\n\r\n${end_date}\r\n`;
    body += `--${boundary}--\r\n`;

    const url = new URL(process.env.CRM_API_URL);
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'authorization': process.env.CRM_API_TOKEN_GET,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const request = https.request(options, (response) => {
      let data = '';
      response.on('data', (chunk) => { data += chunk; });
      response.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          
          // Convert JSON to Excel
          const wb = xlsx.utils.book_new();
          const ws = xlsx.utils.json_to_sheet(Array.isArray(parsed) ? parsed : (parsed.data || [parsed]));
          xlsx.utils.book_append_sheet(wb, ws, 'Affiliates');
          const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
          
          res.json({ base64: buf.toString('base64') });
        } catch (e) {
          // If not JSON or empty, just return empty sheet
          const wb = xlsx.utils.book_new();
          const ws = xlsx.utils.json_to_sheet([{ raw: data }]);
          xlsx.utils.book_append_sheet(wb, ws, 'Affiliates');
          const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
          res.json({ base64: buf.toString('base64') });
        }
      });
    });

    request.on('error', (error) => {
      console.error('CRM GET Error:', error);
      res.status(500).json({ error: 'Failed to fetch from CRM' });
    });

    request.write(body);
    request.end();

  } catch (err) {
    console.error('CRM fetch error:', err);
    res.status(500).json({ error: 'Internal server error during CRM fetch' });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
