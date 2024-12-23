import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');
import { Request, Response } from 'express';

exports.getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()
    return res.status(200).json({ data: users })
  } catch (error) {
    return res.status(500).json({ error: { status: 500, message: 'Internal Server Error' } })
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

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

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
        visa: [
         userData.visa,
        ],
      },
    });

    return res.status(201).json({ status: 201, data: user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: { status: 500, message: 'Internal Server Error' } });
  }
};

// ------------------------------------
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        error: {
          status: 400,
          message: 'User ID is required and must be a valid string',
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return res.status(404).json({
        error: {
          status: 404,
          message: 'User not found',
        },
      });
    }
    return res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      error: {
        status: 500,
        message: 'Internal Server Error',
      },
    });
  }
};

// ---------------------------
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
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


//getAllUsers
//getUserById
// createUser
// updateUser