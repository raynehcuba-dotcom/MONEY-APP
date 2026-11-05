const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Storage paths for database and exports
const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'database.db');
const EXPORT_DIR = path.join(DATA_DIR, 'exportaciones');

// Ensure directories exist
fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(EXPORT_DIR, { recursive: true });

// Parse JSON request bodies (up to 50MB for SQLite base64 backups)
app.use(express.json({ limit: '50mb' }));

// Health check / info
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'MOTO PARTES · Gestor de Cuentas' });
});

// Check if database file exists
app.get('/api/has-db', (req, res) => {
  const exists = fs.existsSync(DB_PATH);
  res.json({ success: true, has_db: exists });
});

// Load database file as base64
app.get('/api/load-db', (req, res) => {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH);
      res.json({ success: true, data: data.toString('base64') });
    } else {
      res.json({ success: false, error: 'No se encontro base de datos' });
    }
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Save database file from base64
app.post('/api/save-db', (req, res) => {
  try {
    const { data_base64 } = req.body;
    if (!data_base64) {
      return res.status(400).json({ success: false, error: 'Faltan datos' });
    }
    const buf = Buffer.from(data_base64, 'base64');
    fs.writeFileSync(DB_PATH, buf);
    res.json({ success: true, path: DB_PATH });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Save exported file (Excel, PDF, JSON, DB backup)
app.post('/api/save-export', (req, res) => {
  try {
    const { filename, data_base64 } = req.body;
    if (!filename || !data_base64) {
      return res.status(400).json({ success: false, error: 'Faltan datos' });
    }
    // Sanitize filename to avoid path traversal
    const safeName = path.basename(filename);
    const targetPath = path.join(EXPORT_DIR, safeName);
    const buf = Buffer.from(data_base64, 'base64');
    fs.writeFileSync(targetPath, buf);
    res.json({ success: true, path: targetPath });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Static assets with explicit MIME type handling for wasm
app.use(express.static(__dirname, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.wasm')) {
      res.setHeader('Content-Type', 'application/wasm');
    }
  }
}));

// Fallback to index.html for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
