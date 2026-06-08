import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 8767;

// Start a simple HTTP server
const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    
    const ext = path.extname(filePath);
    const contentType = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2'
    }[ext] || 'text/plain';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

await new Promise(resolve => server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  resolve();
}));

try {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  await page.goto('http://localhost:8767', { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for animations and resources to settle
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({
    path: 'screenshot.png',
    fullPage: false
  });

  console.log('Screenshot saved: screenshot.png');
  await browser.close();
} finally {
  server.close();
}
