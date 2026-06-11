import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

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

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
