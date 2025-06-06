// pages/api/movies/[id].js
import { MongoClient } from 'mongodb';
import connectMongo from '@/lib/mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  const dbName = 'ass2';

  try {
    const client = await connectMongo();
    const db = client.db(dbName);
    
    const movie = await db.collection('movies').findOne({ id: id });
    
    await client.close();

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch movie' });
  }
}