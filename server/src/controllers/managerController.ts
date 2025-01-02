import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';
const prisma = new PrismaClient()

// ----------------------------------
exports.createManager = async (req: Request, res: Response) => {
    try {
      const managerData = req.body;  
      const manager = await prisma.manager.create({
        data: managerData, 
      });
      res.status(201).json({ data: manager });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// ----------------------------------
exports.getManagers = async (req: Request, res: Response) => {
  try {
      const managers = await prisma.manager.findMany()
      return res.status(200).json({data: managers})
  } catch (error) {
      return res.status(500).json({ error: { status: 500, message: 'Internal Server Error' }})
  }
}

// ----------------------------------
export const getManagerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        error: {
          status: 400,
          message: 'Manager ID is required and must be a valid string',
        },
      });
    }

    const manager = await prisma.manager.findUnique({
      where: { id },
    });

    if (!manager) {
      return res.status(404).json({
        error: {
          status: 404,
          message: 'Manager not found',
        },
      });
    }

    return res.status(200).json({
      status: 200,
      data: manager,
    });
  } catch (error) {
    console.error('Error fetching manager:', error);
    return res.status(500).json({
      error: {
        status: 500,
        message: 'Internal Server Error',
      },
    });
  }
};