import { getDb } from './lib/mongodb.js';
import defaultData from '../src/data.json' assert { type: 'json' };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  // Simple auth check
  if (req.headers['x-seed-key'] !== process.env.SEED_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const db = await getDb();

    // Seed products
    await db.collection('products').deleteMany({});
    await db.collection('products').insertMany(defaultData.products);

    // Seed categories
    await db.collection('categories').deleteMany({});
    await db.collection('categories').insertMany(defaultData.categories);

    // Seed company
    await db.collection('company').deleteMany({});
    await db.collection('company').insertOne({ ...defaultData.company, _key: 'info' });

    return res.status(200).json({
      success: true,
      products: defaultData.products.length,
      categories: defaultData.categories.length,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
