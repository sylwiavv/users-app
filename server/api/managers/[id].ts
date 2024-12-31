import { PrismaClient } from '@prisma/client';
import { allowCors } from './../utils/allowCors';
import { VercelRequest, VercelResponse } from '@vercel/node';

const prisma = new PrismaClient();

async function getManagerById(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
  const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Manager ID is required' });
    }

    try {
      const manager = await prisma.manager.findUnique({
        where: { id: id },
      });

      if (!manager) {
        return res.status(404).json({ error: 'Manager not found' });
      }

      return res.status(200).json({ status: 200, data: manager });

    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: { status: 405, message: 'Method Not Allowed' } });
  }
}

export default allowCors(getManagerById);
