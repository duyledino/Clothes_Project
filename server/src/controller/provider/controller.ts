import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllProvider = async (req: Request, res: Response) => {
  const providers = await prisma.provider.findMany();
  const total_provider = await prisma.provider.count();
  return res.status(200).json({
    success: true,
    providers: providers,
    total_provider: total_provider,
  });
};

const createAProvider = async (req: Request, res: Response) => {
  const { provider_id, provider_name } = req.body as {
    provider_id: string;
    provider_name: string;
  };

  if (!provider_name) throw new Error("Provider name is required");

  let newProvider;
  if (provider_id !== "") {
    const exists = await prisma.provider.findFirst({
      select: {
        provider_id: true,
      },
      where: {
        OR: [
          {
            provider_id: provider_id,
          },
          {
            provider_name: provider_name,
          },
        ],
      },
    });
    if (exists) {
      return res.status(400).json({ Message: "Nhà cung cấp này đã tồn tại" });
    }
    newProvider = await prisma.provider.create({
      data: {
        provider_id: provider_id,
        provider_name: provider_name,
      },
    });
  } else {
    newProvider = await prisma.provider.create({
      data: {
        provider_name: provider_name,
      },
    });
  }

  return res.status(201).json({
    success: true,
    Message: "Provider created successfully",
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
    provider: provider,
  });
};

const updateAProvider = async (req: Request, res: Response) => {
  const { provider_id, provider_name } = req.body as {
    provider_id: string;
    provider_name: string;
  };

  if (!provider_id || !provider_name)
    throw new Error("Provider ID and Name are required");

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
    Message: "Provider updated successfully",
    updatedProvider: updatedProvider,
  });
};

const deleteAProvider = async (req: Request, res: Response) => {
  const { provider_id } = req.query as {
    provider_id: string;
  };

  const exists = await prisma.provider.findFirst({
    select: {
      provider_id: true,
      provider_name: true,
    },
    where: {
      provider_id: provider_id,
    },
  });

  if (!exists) {
    return res.status(404).json({ Message: "Không tìm thấy nhà cung cấp này" });
  }

  const existProviderInStockReceipt = await prisma.stock_Receipt.count({
    where: {
      provider_id: provider_id,
    },
  });

  if (existProviderInStockReceipt > 0) {
    return res
      .status(400)
      .json({ Message: "Nhà cung cấp vẫn còn tồn tại trong phiếu nhập" });
  }

  const providerDel = await prisma.provider.delete({
    select: {
      provider_id: true,
      provider_name: true,
    },
    where: {
      provider_id: provider_id,
    },
  });

  return res.status(200).json({
    Message: "Đã xóa nhà cung cấp thành công: " + providerDel.provider_name,
    Data: providerDel.provider_id,
  });
};

export {
  getAllProvider,
  createAProvider,
  getAProvider,
  deleteAProvider,
  updateAProvider,
};
