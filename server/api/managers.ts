import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { VercelRequest, VercelResponse } from '@vercel/node';
import { allowCors } from './utils/allowCors';

async function getAllManagers(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const allManagers = await prisma.manager.findMany();

      return res.status(200).json({ status: 200, data: allManagers });

    } catch (error) {
      return res.status(500).json({ error: { status:500, message: 'Internal Server Error' } });
    }
  } else {
    return res.status(404).json({ error: { status: 405, message: 'Managers not found' } });
  }
}

export default allowCors(getAllManagers)