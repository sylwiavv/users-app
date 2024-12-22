import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

exports.createManager = async (req, res) => {
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

  exports.getManagers = async (req, res) => {
    try {
        const managers = await prisma.manager.findMany()
        return res.status(200).json({data: managers})
    } catch (error) {
        return res.status(500).json({ error: error.message }) 
    }
}