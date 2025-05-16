import { MongoClient } from 'mongodb';
import connectMongo from '@/lib/mongodb';

export default async function handler(req, res) {

  const uri = process.env.MONGODB_URI;
  const dbName ='ass2';

  const client = await connectMongo();
  
  const db = client.db(dbName);
  const genres = await db.collection('genres').find({}).toArray();

  
  res.status(200).json(genres);
  
  await client.close();
}