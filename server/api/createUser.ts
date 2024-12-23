import { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { status: 405, message: 'Method Not Allowed' } });
  }

  const userData = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return res.status(400).json({ error: { status: 400, message: 'Email already registered' } });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        visa:  userData.visa,
      },
    });

    return res.status(201).json({ status: 201, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { status: 500, message: 'Internal Server Error' } });
  }
}
