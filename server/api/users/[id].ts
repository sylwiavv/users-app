import { PrismaClient } from '@prisma/client';
import { allowCors } from './../utils/allowCors';
import { VercelRequest, VercelResponse } from '@vercel/node';

const prisma = new PrismaClient();

async function getUserById(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
  const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ status: 200, data: user });

    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: { status: 405, message: 'Method Not Allowed' } });
  }
}

export default allowCors(getUserById);
