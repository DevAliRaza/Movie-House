import { MongoClient } from 'mongodb';

export default async function handler(req, res) {

  const uri = process.env.MONGODB_URI;
  const dbName ='ass2';
  const client = await MongoClient.connect(process.env.MONGO_URI)
  
  const db = client.db(dbName);
  const directors = await db.collection('directors').find({}).toArray();
  
  res.status(200).json(directors);
  
  await client.close();
}