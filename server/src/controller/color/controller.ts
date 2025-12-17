import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Get All Colors
const getAllColor = async (req: Request, res: Response) => {
  const colors = await prisma.color.findMany();
  return res.status(200).json({
    success: true,
    data: colors,
  });
};

// 2. Create A Color
const createAColor = async (req: Request, res: Response) => {
  const { color_name,color_code } = req.body as { color_name: string,color_code:string };

  if (!color_name||!color_code) throw new Error("Color name and color code is required");

  const newColor = await prisma.color.create({
    data: { color_id: color_code,color_name },
  });

  return res.status(201).json({
    success: true,
    message: "Color created successfully",
    data: newColor,
  });
};

// 3. Get A Color (Query: ?color_id=...)
const getAColor = async (req: Request, res: Response) => {
  const { color_id } = req.query as { color_id: string };

  if (!color_id) throw new Error("Color ID is required");

  const color = await prisma.color.findUnique({
    where: { color_id },
  });

  if (!color) {
    res.status(404);
    throw new Error("Color not found");
  }

  return res.status(200).json({
    success: true,
    data: color,
  });
};

// 4. Update A Color
const updateAColor = async (req: Request, res: Response) => {
  const { color_id, color_name,color_code } = req.body as { color_id: string, color_name: string,color_code:string };

  if (!color_id || !color_name || !color_code) throw new Error("Color ID and Name are required");

  const existing = await prisma.color.findUnique({ where: { color_id } });
  if (!existing) {
    res.status(404);
    throw new Error("Color not found");
  }

  const updatedColor = await prisma.color.update({
    where: { color_id },
    data: { color_name,color_code },
  });

  return res.status(200).json({
    success: true,
    message: "Color updated successfully",
    data: updatedColor,
  });
};

export { getAllColor, createAColor, getAColor, updateAColor };