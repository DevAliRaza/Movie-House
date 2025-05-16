import { MongoClient } from 'mongodb';
import connectMongo from '@/lib/mongodb';

export default async function handler(req, res) {

  const uri = process.env.MONGODB_URI;
  const dbName ='ass2';

  const client = await connectMongo();
  
  const db = client.db(dbName);
  const movies = await db.collection('movies').find({}).toArray();

  res.status(200).json(movies);
  
  await client.close();
}