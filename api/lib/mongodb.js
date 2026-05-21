import { MongoClient } from 'mongodb';

const URI = process.env.MONGODB_URI;
const DB  = process.env.MONGODB_DB || 'candientubk';

if (!URI) throw new Error('MONGODB_URI chưa được khai báo trong env');

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(URI);
  clientPromise = client.connect();
}

export async function getDb() {
  const c = await clientPromise;
  return c.db(DB);
}
