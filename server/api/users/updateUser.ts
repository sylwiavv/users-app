import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';
import { allowCors } from '../utils/allowCors';

const prisma = new PrismaClient();

const updateUser = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: { status: 405, message: 'Method Not Allowed' } });
  }

  const { id } = req.query;
  const data = req.body; 

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: { status: 400, message: 'User ID is required and must be a valid string' } });
  }

  if (!data || typeof data !== 'object') {
    return res.status(400).json({ error: { status: 400, message: 'Invalid data format' } });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return res.status(200).json({ status: 200, data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: { status: 500, message: 'Internal Server Error' } });
  }
};

export default allowCors(updateUser);
