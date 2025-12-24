import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllSize = async (req: Request, res: Response) => {
  const sizes = await prisma.size.findMany();
  return res.status(200).json({
    success: true,
    sizes: sizes,
  });
};

const createASize = async (req: Request, res: Response) => {
  const { size_name } = req.body as { size_name: string };

  if (!size_name) throw new Error("Size name is required");

  const exists = await prisma.size.findFirst({
    select: {
      size_id: true,
    },
    where: {
      size_name: size_name.toUpperCase(),
    },
  });

  if (exists) {
    return res.status(400).json({
      Message: "Size đã tồn tại",
    });
  }

  const newSize = await prisma.size.create({
    data: { size_id: size_name, size_name },
  });

  return res.status(201).json({
    Message: "Size created successfully",
    newSize: newSize,
  });
};

const getASize = async (req: Request, res: Response) => {
  const { size_id } = req.query as { size_id: string };

  if (!size_id) throw new Error("Size ID is required");

  const size = await prisma.size.findFirst({
    where: { size_id },
  });

  if (!size) {
    return res.status(404).json({ Message: "Không tìm thấy size" });
  }

  return res.status(200).json({
    size: size,
  });
};

const updateASize = async (req: Request, res: Response) => {
  const { size_id, size_name } = req.body as {
    size_id: string;
    size_name: string;
  };

  if (!size_id || !size_name) throw new Error("Size ID and Name are required");

  const existing = await prisma.size.findFirst({ where: { size_id } });
  if (!existing) {
    return res.status(404).json({ Message: "Không tìm thấy size" });
  }

  const updatedSize = await prisma.size.update({
    where: { size_id },
    data: { size_name },
  });

  return res.status(200).json({
    Message: "Size updated successfully",
    updatedSize: updatedSize,
  });
};

export { getAllSize, createASize, getASize, updateASize };
