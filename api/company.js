import { getDb } from './lib/mongodb.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const db  = await getDb();
    const col = db.collection('company');

    if (req.method === 'GET') {
      const doc = await col.findOne({ _key: 'info' });
      return res.status(200).json(doc || {});
    }

    if (req.method === 'PUT') {
      const { _id, ...body } = req.body;
      await col.updateOne(
        { _key: 'info' },
        { $set: { ...body, _key: 'info' } },
        { upsert: true }
      );
      return res.status(200).json(body);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
