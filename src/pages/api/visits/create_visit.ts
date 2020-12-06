// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NowRequest, NowResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb'
import url from 'url'

let cachedDb: Db = null

async function connnectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const dbName = url.parse(uri).pathname.substr(1)

  const db = client.db(dbName)

  cachedDb = db

  return db
}

export default async (req: NowRequest, res: NowResponse) => {
  const { visit } = req.body;

  const db = await connnectToDatabase(process.env.MONGODB_URI)

  const collection = db.collection('visits')

  try {
    await collection.insertOne(visit)

    return res.status(201).json({ message: 'created with success' })
  } catch (err) {
    return res.status(400).json({ message: err })
  }
}
