import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function getAllUsers(req, res) {
  if (req.method === 'GET') {
    try {
      const allManagers = await prisma.manager.findMany();

      return res.status(200).json({ status: 200, data: allManagers });

    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(404).json({ error: { status: 405, message: 'Managers not found' } });
  }
}
