import { MongoClient } from 'mongodb';

export default async function connectMongo(){
    const client = await MongoClient.connect(process.env.MONGO_URI);
    return client;
}