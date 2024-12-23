import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { allowCors } from './utils/allowCors';
import { VercelRequest, VercelResponse } from '@vercel/node';

const prisma = new PrismaClient();

async function signInUser(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!existingUser) {
        return res.status(400).json({ error: { status: 404, message: 'Email not found' } });
      }

      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (!passwordMatch) {
        return res.status(400).json({ error: { status: 401, message: 'Incorrect password' } });
      }

      return res.status(200).json({ status: 200, data: existingUser });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: { status: 405, message: 'Method Not Allowed' } });
  }
}

export default allowCors(signInUser)
