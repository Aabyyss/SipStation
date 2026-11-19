import http from 'node:http';
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;
const DIST_DIR = path.join(ROOT, 'dist');
const PUBLIC_DIR = path.join(ROOT, 'public');
const DATA_DIR = path.join(ROOT, 'data');
const CATALOG_FILE = path.join(DATA_DIR, 'catalog.json');
const ORDER_FILE = path.join(DATA_DIR, 'orders.json');
const SUBSCRIBER_FILE = path.join(DATA_DIR, 'subscribers.json');
const MAX_BODY_BYTES = 100_000;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

let writeQueue = Promise.resolve();

function sendJson(response, status, data) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(JSON.stringify(data));
}

function sendError(response, status, message) {
  sendJson(response, status, { error: message });
}

async function readJson(file) {
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function updateJsonSafely(file, transform) {
  let result;
  writeQueue = writeQueue.then(async () => {
    let data;
    try {
      data = await readJson(file);
    } catch {
      data = [];
    }
    result = await transform(data);
    const temporary = `${file}.${crypto.randomUUID()}.tmp`;
    await fs.writeFile(temporary, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    await fs.rename(temporary, file);
  });
  return writeQueue.then(() => result);
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let bytes = 0;
    const pieces = [];
    request.on('data', (chunk) => {
      bytes += chunk.length;
      if (bytes > MAX_BODY_BYTES) {
        reject(new Error('Request is too large.'));
        request.destroy();
        return;
      }
      pieces.push(chunk);
    });
    request.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(pieces).toString('utf8') || '{}'));
      } catch {
        reject(new Error('Please send valid JSON.'));
      }
    });
    request.on('error', reject);
  });
}

function validEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().replace(/[<>]/g, '').slice(0, maxLength) : '';
}

async function getCatalog() {
  const catalog = await readJson(CATALOG_FILE);
  return catalog;
}

async function handleOrder(request, response) {
  const incoming = await readBody(request);
  const name = cleanText(incoming.name, 80);
  const email = cleanText(incoming.email, 120).toLowerCase();
  const address = cleanText(incoming.address, 160);
  const items = Array.isArray(incoming.items) ? incoming.items : [];

  if (name.length < 2 || !validEmail(email) || items.length === 0) {
    return sendError(response, 422, 'Please provide a name, valid email and at least one drink.');
  }

  const order = {
    id: `SIP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    name,
    email,
    address: address || undefined,
    items,
    total: incoming.total || 0,
    status: 'Demo order received',
    createdAt: new Date().toISOString()
  };
  await updateJsonSafely(ORDER_FILE, (orders) => {
    if (!Array.isArray(orders)) orders = [];
    orders.push(order);
  });
  sendJson(response, 201, { order: { id: order.id, total: order.total, status: order.status } });
}

async function handleGetOrder(request, response, orderId) {
  if (!orderId) return sendError(response, 400, 'Please provide an order ID.');
  try {
    const orders = await readJson(ORDER_FILE);
    const order = orders.find((o) => o.id?.toUpperCase() === orderId.trim().toUpperCase());
    if (!order) return sendError(response, 404, 'Order not found.');
    sendJson(response, 200, { order });
  } catch (error) {
    sendError(response, 500, 'Unable to retrieve order.');
  }
}

async function handleSubscription(request, response) {
  const incoming = await readBody(request);
  const email = cleanText(incoming.email, 120).toLowerCase();
  if (!validEmail(email)) return sendError(response, 422, 'Please enter a valid email address.');

  await updateJsonSafely(SUBSCRIBER_FILE, (subscribers) => {
    if (!Array.isArray(subscribers)) subscribers = [];
    if (!subscribers.some((subscriber) => subscriber.email === email)) {
      subscribers.push({ email, createdAt: new Date().toISOString() });
    }
  });
  sendJson(response, 201, { message: 'You are on the list.' });
}

async function serveFile(response, filePath, method) {
  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) return false;
    const content = await fs.readFile(filePath);
    const isNoCache = filePath.includes('favicon') || filePath.includes('logo') || filePath.endsWith('.html');
    const cacheHeader = filePath.includes('assets') 
      ? 'public, max-age=31536000, immutable' 
      : isNoCache 
        ? 'no-cache, no-store, must-revalidate' 
        : 'public, max-age=3600';

    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': cacheHeader,
      'X-Content-Type-Options': 'nosniff'
    });
    response.end(method === 'HEAD' ? undefined : content);
    return true;
  } catch {
    return false;
  }
}

async function serveStatic(request, response, pathname) {
  const distExists = fsSync.existsSync(DIST_DIR);
  const primaryDir = distExists ? DIST_DIR : PUBLIC_DIR;

  let requested = pathname === '/' ? '/index.html' : pathname;

  if (requested === '/favicon.ico') {
    const icoInDist = path.join(primaryDir, 'favicon.ico');
    const icoInPublic = path.join(PUBLIC_DIR, 'favicon.ico');
    if (fsSync.existsSync(icoInDist)) {
      return serveFile(response, icoInDist, request.method);
    }
    if (fsSync.existsSync(icoInPublic)) {
      return serveFile(response, icoInPublic, request.method);
    }
  }

  const normalized = path.normalize(requested).replace(/^([/\\])+/, '');
  const candidate1 = path.resolve(primaryDir, normalized);

  if (candidate1.startsWith(`${primaryDir}${path.sep}`) || candidate1 === primaryDir) {
    const served = await serveFile(response, candidate1, request.method);
    if (served) return;
  }

  // Fallback check in public folder if dist didn't have it (e.g. static images)
  if (distExists) {
    const candidate2 = path.resolve(PUBLIC_DIR, normalized);
    if (candidate2.startsWith(`${PUBLIC_DIR}${path.sep}`) || candidate2 === PUBLIC_DIR) {
      const served = await serveFile(response, candidate2, request.method);
      if (served) return;
    }
  }

  // SPA fallback for HTML navigation (routes like /shop, /cart, /checkout, /product/..., /about, /wishlist)
  const isLikelyAsset = path.extname(pathname) && !pathname.endsWith('.html');
  if (!isLikelyAsset) {
    const spaIndex = path.join(primaryDir, 'index.html');
    const served = await serveFile(response, spaIndex, request.method);
    if (served) return;
  }

  sendError(response, 404, 'Not found.');
}

const server = http.createServer(async (request, response) => {
  try {
    const { pathname, searchParams } = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

    if (request.method === 'GET' && pathname === '/api/health') {
      return sendJson(response, 200, { status: 'ok', service: 'sipstation' });
    }
    if (request.method === 'GET' && pathname === '/api/catalog') {
      return sendJson(response, 200, await getCatalog());
    }
    if (request.method === 'GET' && pathname === '/api/orders') {
      return handleGetOrder(request, response, searchParams.get('id'));
    }
    if (request.method === 'GET' && pathname.startsWith('/api/orders/')) {
      return handleGetOrder(request, response, decodeURIComponent(pathname.slice('/api/orders/'.length)));
    }
    if (request.method === 'POST' && pathname === '/api/orders') return handleOrder(request, response);
    if (request.method === 'POST' && pathname === '/api/subscribers') return handleSubscription(request, response);
    if (request.method === 'GET' || request.method === 'HEAD') return serveStatic(request, response, pathname);

    sendError(response, 405, 'Method not allowed.');
  } catch (error) {
    console.error(error);
    if (!response.headersSent) sendError(response, error.message === 'Request is too large.' ? 413 : 500, 'Something went wrong. Please try again.');
    else response.end();
  }
});

server.listen(PORT, () => {
  console.log(`SIPSTATION is ready at http://localhost:${PORT}`);
});
