import type{ Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllCategory = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  
  return res.status(200).json({
    success: true,
    data: categories,
  });
};

const createACategory = async (req: Request, res: Response) => {
  const { category_name } = req.body as { category_name: string };

  if (!category_name) {
    throw new Error('Category name is required');
  }

  const newCategory = await prisma.category.create({
    data: {
      category_name,
    },
  });

  return res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: newCategory,
  });
};

const getACategory = async (req: Request, res: Response) => {
  const { category_id } = req.query as { category_id: string };

  if (!category_id) {
    throw new Error('Category ID is required');
  }

  const category = await prisma.category.findUnique({
    where: {
      category_id: category_id,
    },
  });

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  return res.status(200).json({
    success: true,
    data: category,
  });
};

const updateACategory = async (req: Request, res: Response) => {
  const { category_id, category_name } = req.body as { category_id: string, category_name: string };

  if (!category_id || !category_name) {
    throw new Error('Category ID and Name are required');
  }

  // Check existence (optional, but good for clear errors)
  const existing = await prisma.category.findUnique({
    where: { category_id },
  });

  if (!existing) {
    res.status(404);
    throw new Error('Category not found');
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
    success: true,
    message: 'Category updated successfully',
    data: updatedCategory,
  });
};

export {
  getAllCategory,
  createACategory,
  getACategory,
  updateACategory
};