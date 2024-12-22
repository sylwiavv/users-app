import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        return res.status(200).json({data: users})
    } catch (error) {
        return res.status(500).json({ error: error.message }) 
    }
}

// exports.getUserById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const user = await prisma.user.findUnique({
//             where: { id: parseInt(id) },
//         });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         return res.status(200).json({data: user});
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };

exports.createUser = async (req, res) => {
    try {
      const userData = req.body;  
      const user = await prisma.user.create({
        data: userData, 
      });
      res.status(201).json({ data: user });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

//getAllUsers
//getUserById
// createUser
// updateUser