import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllCategory = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  return res.status(200).json({
    categories: categories,
  });
};

const createACategory = async (req: Request, res: Response) => {
  const { category_name } = req.body as { category_name: string };

  if (!category_name) {
    throw new Error("Category name is required");
  }

  const newCategory = await prisma.category.create({
    data: {
      category_name,
    },
  });

  return res.status(201).json({
    Message: "Category created successfully",
    newCategory: newCategory,
  });
};

const getACategory = async (req: Request, res: Response) => {
  const { category_id } = req.query as { category_id: string };

  if (!category_id) {
    throw new Error("Category ID is required");
  }

  const category = await prisma.category.findFirst({
    where: {
      category_id: category_id,
    },
  });

  if (!category) {
    return res.status(404).json({ Message: "Không tìm thấy role" });
  }

  return res.status(200).json({
    category: category,
  });
};

const updateACategory = async (req: Request, res: Response) => {
  const { category_id, category_name } = req.body as {
    category_id: string;
    category_name: string;
  };

  if (!category_id || !category_name) {
    throw new Error("Category ID and Name are required");
  }

  // Check existence (optional, but good for clear errors)
  const existing = await prisma.category.findFirst({
    where: { category_id },
  });

  if (!existing) {
    return res.status(404).json({ Message: "Không tìm thấy role" });
  }

  const updatedCategory = await prisma.category.update({
    where: {
      category_id: category_id,
    },
    data: {
      category_name: category_name,
    },
  });

  return res.status(200).json({
    Message: "Category updated successfully",
    updatedCategory: updatedCategory,
  });
};

export { getAllCategory, createACategory, getACategory, updateACategory };
