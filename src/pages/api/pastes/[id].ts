import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  if (!id || typeof id !== 'string' || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid paste id' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('pastebin');

    const result = await db.collection('pastes').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: 'Paste deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Paste not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
