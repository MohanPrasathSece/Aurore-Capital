import { put, list } from '@vercel/blob';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.BLOB_READ_WRITE_TOKEN;

async function test() {
  console.log("Token:", token);
  try {
    const { blobs } = await list({ prefix: 'aurore_users.json', token });
    console.log("List successful. Found", blobs.length, "blobs");
  } catch (e) {
    console.error("List failed:", e.message);
  }

  try {
    const res = await put('test_file.json', JSON.stringify({ hello: 'world' }), {
      access: 'private',
      token,
      addRandomSuffix: false
    });
    console.log("Put successful:", res.url);
    
    // Test fetch
    const fetchRes = await fetch(`${res.url}?t=${Date.now()}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Fetch status:", fetchRes.status);
    console.log("Fetch result:", await fetchRes.text());
  } catch (e) {
    console.error("Put failed:", e.message);
  }
}

test();
