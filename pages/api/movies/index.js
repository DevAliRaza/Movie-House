import { MongoClient } from 'mongodb';

export default async function handler(req, res) {

  const uri = process.env.MONGODB_URI;
  const dbName ='ass2';

  const client = await MongoClient.connect(process.env.MONGO_URI)
  
  const db = client.db(dbName);
  const movies = await db.collection('movies').find({}).toArray();

  
  res.status(200).json(movies);
  
  await client.close();
}