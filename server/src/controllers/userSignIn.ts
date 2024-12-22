const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');

// -------------------------------
  // SignIn User
  // -------------------------------
  exports.createSignInUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const existingUser = await prisma.signInUser.findUnique({
        where: {
          email: email 
        }
      });
  
      if (existingUser) {
        return res.status(400).json({ error: {status: 500, message:'Email already registered'} });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.signInUser.create({
        data: {
          email,
          password: hashedPassword 
        },
      });
  
      res.status(201).json({ data: user });
    } catch (e) {
      res.status(500).json({ error: {status: 500, message:'Internal Server Error'} });
    }
  };
  