import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllProvider = async (req: Request, res: Response) => {
  const providers = await prisma.provider.findMany();
  return res.status(200).json({
    success: true,
    data: providers,
  });
};

const createAProvider = async (req: Request, res: Response) => {
  const { provider_name } = req.body as { provider_name: string };

  if (!provider_name) throw new Error("Provider name is required");

  const newProvider = await prisma.provider.create({
    data: { provider_name },
  });

  return res.status(201).json({
    success: true,
    message: "Provider created successfully",
    data: newProvider,
  });
};

const getAProvider = async (req: Request, res: Response) => {
  const { provider_id } = req.query as { provider_id: string };

  if (!provider_id) throw new Error("Provider ID is required");

  const provider = await prisma.provider.findUnique({
    where: { provider_id },
  });

  if (!provider) {
    res.status(404);
    throw new Error("Provider not found");
  }

  return res.status(200).json({
    success: true,
    data: provider,
  });
};

const updateAProvider = async (req: Request, res: Response) => {
  const { provider_id, provider_name } = req.body as { provider_id: string, provider_name: string };

  if (!provider_id || !provider_name) throw new Error("Provider ID and Name are required");

  const existing = await prisma.provider.findUnique({ where: { provider_id } });
  if (!existing) {
    res.status(404);
    throw new Error("Provider not found");
  }

  const updatedProvider = await prisma.provider.update({
    where: { provider_id },
    data: { provider_name },
  });

  return res.status(200).json({
    success: true,
    message: "Provider updated successfully",
    data: updatedProvider,
  });
};

export { getAllProvider, createAProvider, getAProvider, updateAProvider };