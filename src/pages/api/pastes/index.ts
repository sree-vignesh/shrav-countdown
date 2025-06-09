import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("The api paths are loading.");
  const client = await clientPromise;
  const db = client.db('pastebin');

  if (req.method === 'GET') {
    // Get all pastes
    const pastes = await db.collection('pastes').find({}).sort({ _id: -1 }).toArray();
    res.status(200).json(pastes);
  } else if (req.method === 'POST') {
    // Add new paste
    const { content } = req.body;

    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Content is required and must be a string' });
    }

    const paste = {
      content,
      createdAt: new Date(),
    };

    const result = await db.collection('pastes').insertOne(paste);
    res.status(201).json({ id: result.insertedId, ...paste });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
