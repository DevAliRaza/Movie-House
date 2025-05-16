// pages/api/directors/[id].js
import connectMongo from '@/lib/mongodb';
import { MongoClient } from 'mongodb';
export default async function handler(req, res) {
  const { id } = req.query;
  const uri = process.env.MONGODB_URI;
  const dbName = 'ass2';

  try {
    const client = await connectMongo();
    const db = client.db(dbName);
    const director = await db.collection('directors').findOne({ id: id });
    
    await client.close();
    if (!director) {
      return res.status(404).json({ error: 'director not found' });
    }

    return res.status(200).json(director);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch director' });
  }
}