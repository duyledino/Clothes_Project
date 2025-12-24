import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Get All Colors
const getAllColor = async (req: Request, res: Response) => {
  const colors = await prisma.color.findMany();
  return res.status(200).json({
    success: true,
    colors: colors,
  });
};

// 2. Create A Color
const createAColor = async (req: Request, res: Response) => {
  const { color_name, color_code } = req.body as {
    color_name: string;
    color_code: string;
  };

  if (!color_name || !color_code)
    throw new Error("Color name and color code is required");

  const existsColor = await prisma.color.findFirst({
    select: {
      color_id: true,
    },
    where: {
      color_id: color_code,
    },
  });

  if (existsColor)
    return res.status(400).json({
      Message: "Màu sắc đã tồn tại",
    });

  const newColor = await prisma.color.create({
    data: { color_id: color_code, color_name },
  });

  return res.status(201).json({
    Message: "Color created successfully",
    newColor: newColor,
  });
};

// 3. Get A Color (Query: ?color_id=...)
const getAColor = async (req: Request, res: Response) => {
  const { color_id } = req.query as { color_id: string };

  if (!color_id) throw new Error("Color ID is required");

  const color = await prisma.color.findFirst({
    where: { color_id },
  });

  if (!color) {
    return res.status(404).json({ Message: "Không tìm thấy màu" });
  }

  return res.status(200).json({
    color: color,
  });
};

// 4. Update A Color
const updateAColor = async (req: Request, res: Response) => {
  const { color_id, color_name } = req.body as {
    color_id: string;
    color_name: string;
    color_code: string;
  };

  if (!color_id || !color_name)
    throw new Error("Color ID and Name are required");

  const existing = await prisma.color.findFirst({ where: { color_id } });
  if (!existing) {
    return res.status(404).json({ Message: "Không tìm thấy màu" });
  }

  const updatedColor = await prisma.color.update({
    where: { color_id },
    data: { color_name },
  });

  return res.status(200).json({
    Message: "Color updated successfully",
    updatedColor: updatedColor,
  });
};

export { getAllColor, createAColor, getAColor, updateAColor };
