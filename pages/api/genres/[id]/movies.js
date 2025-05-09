// pages/api/movies/[id].js
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const uri = process.env.MONGODB_URI;
  const dbName = 'ass2';

  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db(dbName);
    const movie = await db.collection('movies').findOne({ id: id });
    
    await client.close();
    if (!movie) {
      return res.status(404).json({ error: 'movie not found' });
    }

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch movie' });
  }
}