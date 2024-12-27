const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
import { VercelRequest, VercelResponse } from '@vercel/node';

// -------------------------------
  // SignIn User
  // -------------------------------
  exports.createSignInUser = async (req: VercelRequest, res: VercelResponse) => {
    try {
      const { email, password } = req.body;
  
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email.toLowerCase().trim(),
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
      return res.status(500).json({ error: { status: 500, message: 'Internal Server Error' } });
    }
  };
  
  