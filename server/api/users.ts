import { PrismaClient } from '@prisma/client';
import { allowCors } from './utils/allowCors';
const prisma = new PrismaClient();
import { VercelRequest, VercelResponse } from '@vercel/node';

async function getAllUsers(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const allUsers = await prisma.user.findMany();
      

      return res.status(200).json({ status: 200, data: allUsers });

    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(404).json({ error: { status: 405, message: 'Users not found' } });
  }
}

export default allowCors(getAllUsers)