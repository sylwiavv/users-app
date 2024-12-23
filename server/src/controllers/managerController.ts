import { PrismaClient } from "@prisma/client";
import { VercelRequest, VercelResponse } from "@vercel/node";
const prisma = new PrismaClient()

exports.createManager = async (req: VercelRequest, res: VercelResponse) => {
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

  exports.getManagers = async (req: VercelRequest, res: VercelResponse) => {
    try {
        const managers = await prisma.manager.findMany()
        return res.status(200).json({data: managers})
    } catch (error) {
        return res.status(500).json({ error: { status: 500, message: 'Internal Server Error' }})
    }
}