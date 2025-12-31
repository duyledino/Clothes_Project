import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ",
  }),
  password: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự",
  }),
});

export const signupSchema = z
  .object({
    email: z.string().email({
      message: "Email không hợp lệ",
    }),
    name: z
      .string()
      .trim()
      .min(6, {
        message: "Tên phải có ít nhất 6 ký tự",
      }),
    password: z.string().min(6, {
      message: "Mật khẩu phải có ít nhất 6 ký tự",
    }),
    phone: z.string().length(10, {
      message: "Số điện thoại phải có đúng bằng 10 ký tự",
    }).regex(/^[0-9]+$/, {
      message: "Số điện thoại phải là số",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export const signupSchemaAdmin = z
  .object({
    email: z.string().email({
      message: "Email không hợp lệ",
    }),
    name: z
      .string()
      .trim()
      .min(6, {
        message: "Tên phải có ít nhất 6 ký tự",
      }),
    phone: z.string().length(10, {
      message: "Số điện thoại phải có đúng bằng 10 ký tự",
    }).regex(/^[0-9]+$/, {
      message: "Số điện thoại phải là số",
    }),
    address: z.string().min(10, {
      message: "Địa chỉ phải có ít nhất 10 ký tự",
    }),
    role: z.string(),
    status: z.boolean(),
  });


export const updateUserSchema = z.object({
  name: z
    .string({
      message: "Tên không hợp lệ",
    })
    .min(6, {
      message: "Tên phải có ít nhất 6 ký tự",
    }),
  address: z.string().min(10, {
    message: "Địa chỉ phải có ít nhất 10 ký tự",
  }),
});

export const updatePasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Mật khẩu phải có ít nhất 6 ký tự",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });
