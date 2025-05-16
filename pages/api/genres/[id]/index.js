// pages/api/genres/[id].js
import { MongoClient } from 'mongodb';
import connectMongo from '@/lib/mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  const uri = process.env.MONGODB_URI;
  const dbName = 'ass2';

  try {
    const client = await connectMongo();
    const db = client.db(dbName);
    const genre = await db.collection('genres').findOne({ id: id });
    
    await client.close();

    if (!genre) {
      return res.status(404).json({ error: 'genre not found' });
    }

    return res.status(200).json(genre);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch genre' });
  }
}