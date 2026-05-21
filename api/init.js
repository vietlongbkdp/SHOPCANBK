import { getDb } from './lib/mongodb.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const defaultData = require('../src/data.json');

export async function autoSeedIfEmpty(db) {
  const productCount = await db.collection('products').countDocuments();
  if (productCount > 0) return false; // already has data

  await Promise.all([
    db.collection('products').insertMany(defaultData.products),
    db.collection('categories').insertMany(defaultData.categories),
    db.collection('company').insertOne({ ...defaultData.company, _key: 'info' }),
  ]);
  console.log('✅ Auto-seeded MongoDB with default data');
  return true;
}
