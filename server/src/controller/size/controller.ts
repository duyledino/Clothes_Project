import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllSize = async (req: Request, res: Response) => {
  const sizes = await prisma.size.findMany();
  return res.status(200).json({
    success: true,
    data: sizes,
  });
};

const createASize = async (req: Request, res: Response) => {
  const { size_name } = req.body as { size_name: string };

  if (!size_name) throw new Error("Size name is required");

  const newSize = await prisma.size.create({
    data: { size_id: size_name,size_name },
  });

  return res.status(201).json({
    success: true,
    message: "Size created successfully",
    data: newSize,
  });
};

const getASize = async (req: Request, res: Response) => {
  const { size_id } = req.query as { size_id: string };

  if (!size_id) throw new Error("Size ID is required");

  const size = await prisma.size.findUnique({
    where: { size_id },
  });

  if (!size) {
    res.status(404);
    throw new Error("Size not found");
  }

  return res.status(200).json({
    success: true,
    data: size,
  });
};

const updateASize = async (req: Request, res: Response) => {
  const { size_id, size_name } = req.body as { size_id: string, size_name: string };

  if (!size_id || !size_name) throw new Error("Size ID and Name are required");

  const existing = await prisma.size.findUnique({ where: { size_id } });
  if (!existing) {
    res.status(404);
    throw new Error("Size not found");
  }

  const updatedSize = await prisma.size.update({
    where: { size_id },
    data: { size_name },
  });

  return res.status(200).json({
    success: true,
    message: "Size updated successfully",
    data: updatedSize,
  });
};

export { getAllSize, createASize, getASize, updateASize };