import { z } from "zod";

export const CategorySchema = z.object({
  category_id: z.string(),
  category_name: z.string(),
});

export const SizeSchema = z.object({
  size_id: z.string(),
  size_name: z.string(),
});

export const ColorSchema = z.object({
  color_id: z.string(),
  color_name: z.string(),
});

export const createProductSchema = z.object({
  images: z
    .array(z.file({ message: "Hãy thêm hình sản phẩm" }))
    .min(1, { message: "Hãy thêm ít nhất 1 tấm hình sản phẩm" }),

  productName: z.string().min(1, "Tên sản phẩm bị thiếu"),

  description: z.string().min(1, "Mô tả sản phẩm bị thiếu"),

  color: z.array(ColorSchema).min(1, { message: "Hãy thêm ít nhất 1 màu sắc" }),

  price: z.number({ message: "Giá bị thiếu" }).gt(10000,{message: "Giá phải lớn hơn 10,000"}),

  size: z.array(SizeSchema).min(1, { message: "Hãy thêm ít nhất 1 size" }),

  category: CategorySchema,
});
