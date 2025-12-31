import { PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import { createToken } from "../../middleware/authentication.js";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // gmail, password will validate on client;
  const exists = await prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      role: true,
    },
  });
  console.log("email,password", email, password, exists);
  if (!exists)
    return res.status(400).json({ Message: "Wrong email or password" });
  const verify = await compare(password, exists.password);
  console.log(verify);
  if (!verify)
    return res.status(400).json({ Message: "Wrong email or password" });
  const token = createToken({
    user_id: exists.user_id,
    email,
    name: exists.name ?? "",
    role: exists.role.role_name,
  });
  res.cookie("my_cookie", token, {
    httpOnly: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: false,
    sameSite: "lax",
  });
  //Client will save token and admin (boolean) to localStorage
  console.log("login success");
  return res.status(200).json({
    Message: "Login successfully",
    user: {
      role: exists.role.role_name,
      email: exists.email,
      user_id: exists.user_id,
    },
  });
};

const logoutUser = async (req: Request, res: Response) => {
  console.log("Logout success");
  return res
    .clearCookie("my_cookie", {
      httpOnly: true,
      path: "/",
      secure: false,
      sameSite: "lax",
    })
    .status(200)
    .json({ Message: "Logged out successfully" });
};

const getAllUser = async (req: Request, res: Response) => {
  const { page, role_id } = req.query as { page: string; role_id: string };
  console.log("page,role_id: ", page, role_id);
  const users = await prisma.user.findMany({
    select: {
      address: true,
      user_id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      phone: true,
    },
    where: {
      role_id: role_id === "" ? {} : role_id,
    },
    take: Number(page) * 10,
  });
  return res.status(200).json({ users: users });
};

const getAUser_Admin = async (req: Request, res: Response) => {
  //get user id
  const { user_id } = req.query as { user_id: string };
  const exists = await prisma.user.findFirst({
    select: {
      user_id: true,
    },
    where: {
      user_id: user_id,
    },
  });

  if (!exists) return res.status(400).json({ Message: "User not found" });
  const user = await prisma.user.findFirst({
    select: {
      email: true,
      name: true,
      address: true,
      user_id: true,
      role: true,
      status: true,
      phone: true,
      order_user_create: {
        select: {
          order_id: true,
          create_at: true,
          method: true,
          payment: true,
          status: true,
          total: true,

          update_at: true,
          user_create: {
            select: {
              email: true,
              name: true,
            },
          },
          user_ship: {
            select: {
              user_id: true,
              name: true,
            },
          },
        },
      },
      carts: {
        select: {
          cart_detail: {
            select: {
              product: {
                select: {
                  product_id: true,
                  product_name: true,
                  price: true,
                  imageUrl: true,
                  product_size: true,
                  product_color: true,
                },
              },
              quantity: true,
              active: true,
            },
          },
        },
      },
    },
    where: {
      user_id: user_id,
    },
  });
  const format_user = {
    user_info:{
      user_id: user?.user_id,
      email: user?.email,
      address: user?.address,
      name: user?.name,
      phone: user?.phone,
      status: user?.status,
      role: user?.role,
    },
    carts: user?.carts?.cart_detail.map((item) => ({
      quantity: item.quantity,
      subtotal: item.quantity * Number(item.product.price),
      active: item.active,
      product: item.product,
    })),
    orders: user?.order_user_create.map((item) => ({
      order_id: item.order_id,
      total: Number(item.total),
      create_at: item.create_at,
      status: item.status,
      payment: item.payment,
      method: item.method,
      update_at: item.update_at,
      user_create: item.user_create,
      user_ship: item.user_ship,
    })),
  };
  console.log("format_user: ", format_user);
  return res.status(200).json({ user: format_user });
};

const getAUser = async (req: Request, res: Response) => {
  //get user id
  const { user_id } = req.query as { user_id: string };
  const exists = await prisma.user.findFirst({
    select: {
      email: true,
      name: true,
      address: true,
      user_id: true,
      phone: true,
    },
    where: {
      user_id: user_id,
    },
  });
  if (!exists) return res.status(400).json({ Message: "User not found" });
  return res.status(200).json({ user: exists });
};

//client will check empty;
const createAUser = async (req: Request, res: Response) => {
  const { email, password, name,phone } = req.body;
  console.log(" email, password, name,phone: ", email, password, name,phone);
  const exists = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (exists) return res.status(400).json({ Message: "User already exists" });
  const salt = await genSalt(5);
  const hashPass = await hash(password, salt);
  const regular_role = await prisma.role.findFirst({
    where: {
      role_name: "regular",
    },
  });
  let user;
  user = await prisma.user.create({
    data: {
      email: email,
      password: hashPass,
      name: name,
      phone: phone,
      create_at: new Date(),
      role_id: regular_role?.role_id ?? "regular",
    },
    include: {
      role: true,
    },
  });
  await prisma.cart.create({
    data: {
      user_id: user.user_id,
    },
  });
  return res.status(200).json({
    success: true,
    Message: "Create user successfully",
    id: user.user_id,
    email: user.email,
  });
};

const createAUserAdmin = async (req: Request, res: Response) => {
  const { email, password, name,phone,role_id,address,status } = req.body;
  console.log(" email, password, name,phone,role_id,address,status: ", email, password, name,phone,role_id,address,status);
  const exists = await prisma.user.findFirst({

    where: {
      email: email,
    },
  });
  if (exists) return res.status(400).json({ Message: "Người dùng này đã tồn tại rồi" });
  const salt = await genSalt(5);
  const hashPass = await hash(password, salt);
  const role = await prisma.role.findFirst({
    where: {
      role_id: role_id,
    },
  });
  if (!role) return res.status(400).json({ Message: "Quyền hạn không tìm thấy" });
  let user;
  user = await prisma.user.create({
    data: {
      email: email,
      password: hashPass,
      name: name,
      phone: phone,
      create_at: new Date(),
      role_id: role?.role_id!,
      address: address,
      status: status,
    },
    include: {
      role: true,
    },
  });
  await prisma.cart.create({
    data: {
      user_id: user.user_id,
    },
  });
  return res.status(200).json({
    Message: "Tạo người dùng thành công",
  });
};

const updateUser_admin = async (req: Request, res: Response) => {
  const { user_id, address, name, role_id, status, password } = req.body as {
    user_id: string;
    address: string;
    name: string;
    role_id: string;
    status: boolean;
    password: string;
  };

  const exists = await prisma.user.findUnique({
    where: {
      user_id: user_id,
    },
  });

  if (!exists) {
    return res.status(404).json({ Message: "User not found" });
  }
  let updated;
if (password === "" || password == null) {
    updated = await prisma.user.update({
    where: {
      user_id: user_id,
    },
    data: {
      name: name,
      address: address,
      role_id: role_id,
      status: status,
    },
  });
  } else {
    const salt = await genSalt(5);
    const hashPass = await hash(password, salt);
    updated = await prisma.user.update({
      data: {
        name: name,
        password: hashPass,
        address: address,
        role_id: role_id,
        status: status,
      },
      where: {
        user_id: user_id,
      },
    });
  }
   

  console.log("updated: ", updated);

  return res.status(200).json({
    Message: "Cập nhật thành công",
    data: updated,
  });
};

const updateUser = async (req: Request, res: Response) => {
  const { user_id, address, name, password } = req.body;
  const exists = await prisma.user.findFirst({
    where: {
      user_id: user_id,
    },
  });
  let updated;
  if (!exists) return res.status(400).json({ Message: "User not found" });
  if (password === "" || password == null) {
    updated = await prisma.user.update({
      data: {
        address,
        name,
        update_at: new Date(),
      },
      where: {
        user_id: user_id,
      },
    });
  } else {
    const salt = await genSalt(5);
    const hashPass = await hash(password, salt);
    updated = await prisma.user.update({
      data: {
        name: name,
        password: hashPass,
        address: address,
      },
      where: {
        user_id: user_id,
      },
    });
  }
  console.log("updated: ", updated);
  return res.status(200).json({ Message: "Update successfully" });
};

const banUser = async (req: Request, res: Response) => {
  const { user_id } = req.query as { user_id: string };
  const { status } = req.body as { status: boolean };
  const exists = await prisma.user.findFirst({
    where: {
      user_id: user_id,
    },
  });
  if (!exists) return res.status(400).json({ Message: "User not found" });
  await prisma.user.update({
    where: {
      user_id: user_id,
    },
    data: {
      status,
    },
  });
  return res.status(200).json({ Message: "Delete successfully" });
};

const getAllUserIsShipperByRoleName = async (req: Request, res: Response) => {
  const { role_name } = req.query as { role_name: string };
  const exists = await prisma.role.findFirst({
    where: {
      role_name: role_name,
    },
  });
  if (!exists) {
    return res.status(404).json({ Message: "Không tồn tại role này" });
  }
  const users = await prisma.user.findMany({
    select: {
      user_id: true,
      name: true,
    },
    where: {
      role: {
        role_name: role_name,
      },
    },
  });
  console.log("shipper: ",users);
  return res.status(200).json({ users: users });
};

export {
  createAUser,
  banUser,
  updateUser_admin,
  getAllUser,
  loginUser,
  getAUser,
  logoutUser,
  updateUser,
  getAUser_Admin,
  getAllUserIsShipperByRoleName,
  createAUserAdmin,
};
