import { getDb } from './lib/mongodb.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const db  = await getDb();
    const col = db.collection('categories');

    if (req.method === 'GET') {
      const cats = await col.find({}).sort({ id: 1 }).toArray();
      return res.status(200).json(cats);
    }

    if (req.method === 'POST') {
      const last  = await col.find({}).sort({ id: -1 }).limit(1).toArray();
      const newId = last.length > 0 ? last[0].id + 1 : 1;
      const cat   = { ...req.body, id: newId };
      await col.insertOne(cat);
      return res.status(201).json(cat);
    }

    if (req.method === 'PUT') {
      const { _id, ...body } = req.body;
      await col.updateOne({ id: body.id }, { $set: body });
      return res.status(200).json(body);
    }

    if (req.method === 'DELETE') {
      const id = parseInt(req.query.id);
      await col.deleteOne({ id });
      return res.status(200).json({ deleted: id });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
