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
      return res.status(500).json({ error: { status: 500, message: 'Internal Server Error' } });
    }
  };
  
  