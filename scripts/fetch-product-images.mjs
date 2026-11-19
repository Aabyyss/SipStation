/*
 * Downloads a distinct public search thumbnail for every product in the
 * catalogue. The search term is the exact product name and brand; it never
 * generates brand packaging. Keep public/images/product-sources.json with the
 * image source URLs so the collection is easy to audit or replace.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { productSeed } from '../src/data/products.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const targetDirectory = path.join(root, 'public', 'images', 'products');
const sourceFile = path.join(root, 'public', 'images', 'product-sources.json');

function htmlDecode(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');
}

function imageCandidates(page) {
  const candidates = [];
  const regex = /murl&quot;:&quot;([^&]+(?:&amp;[^&]+)*)&quot;,&quot;turl&quot;:&quot;([^&]+(?:&amp;[^&]+)*)&quot;/g;
  let match;
  while ((match = regex.exec(page))) {
    candidates.push({ source: htmlDecode(match[1]), thumbnail: htmlDecode(match[2]) });
  }
  return candidates;
}

async function searchAndDownload(product) {
  const query = `${product.brand} ${product.name} ${product.size} official product packaging front`;
  const response = await fetch(`https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC2`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SIPSTATION-portfolio-image-fetch/1.0)' }
  });
  if (!response.ok) throw new Error(`Search returned ${response.status}`);
  const candidates = imageCandidates(await response.text());
  if (!candidates.length) throw new Error('No image candidates found');

  for (const candidate of candidates.slice(0, 5)) {
    try {
      const imageResponse = await fetch(candidate.thumbnail, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const type = imageResponse.headers.get('content-type') || '';
      if (!imageResponse.ok || !type.startsWith('image/')) continue;
      const bytes = Buffer.from(await imageResponse.arrayBuffer());
      if (bytes.length < 1500) continue;
      await fs.writeFile(path.join(targetDirectory, `${product.id}.jpg`), bytes);
      return { id: product.id, image: `/images/products/${product.id}.jpg`, source: candidate.source, query };
    } catch {
      // The next authentic search result may still be accessible.
    }
  }
  throw new Error('Candidate images could not be downloaded');
}

await fs.mkdir(targetDirectory, { recursive: true });
const sourceMap = {};
let success = 0;
for (const product of productSeed) {
  try {
    const record = await searchAndDownload(product);
    sourceMap[product.id] = record;
    success += 1;
    process.stdout.write(`✓ ${product.name}\n`);
  } catch (error) {
    sourceMap[product.id] = { id: product.id, image: null, source: null, query: `${product.brand} ${product.name}`, error: error.message };
    process.stdout.write(`× ${product.name}: ${error.message}\n`);
  }
}
await fs.writeFile(sourceFile, `${JSON.stringify(sourceMap, null, 2)}\n`, 'utf8');
console.log(`\nDownloaded ${success}/${productSeed.length} authentic product-image thumbnails.`);
