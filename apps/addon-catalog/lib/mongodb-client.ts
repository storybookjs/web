import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;

const client = new MongoClient(uri);

export const database = client.db('Cluster0');
