import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    return res.status(404).json({ Message: "Thiếu mã màu hoặc tên màu" });

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

  if (!color_id) return res.status(404).json({ Message: "Thiếu mã màu" });

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
    return res.status(404).json({ Message: "Thiếu mã màu hoặc tên màu" });

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

const deleteAColor = async (req: Request, res: Response) => {
  const { color_id } = req.query as {
    color_id: string;
  };
  const decode_color_id = decodeURIComponent(color_id);
  // 1. Kiểm tra màu sắc có tồn tại không
  const exists = await prisma.color.findFirst({
    select: {
      color_id: true,
    },
    where: {
      color_id: decode_color_id,
    },
  });

  if (!exists) {
    return res.status(404).json({ Message: "Không tìm thấy màu này" });
  }

  // 2. Kiểm tra xem có sản phẩm nào đang sử dụng màu này không
  const existsProductHasColor = await prisma.product_Color.findFirst({
    select: {
      color_id: true,
      product: {
        select: {
          product_name: true,
        },
      },
    },
    where: {
      color_id: decode_color_id,
    },
  });

  if (existsProductHasColor) {
    return res.status(400).json({
      Message: `Vẫn còn sản phẩm sử dụng màu này: ${existsProductHasColor.product?.product_name}`,
    });
  }

  // 3. Tiến hành xóa màu sắc
  const colorDel = await prisma.color.delete({
    select: { 
      color_id: true,
      color_name: true 
    },
    where: { 
      color_id: decode_color_id 
    },
  });

  return res
    .status(200)
    .json({ 
      Message: `Đã xóa màu thành công: ${colorDel.color_name}`,
    });
};

export { getAllColor, createAColor, getAColor, updateAColor,deleteAColor };
