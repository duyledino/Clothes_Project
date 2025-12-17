import { PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import { createToken } from "../../middleware/authentication.js";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllUser = async (req: Request, res: Response) => {
  const { page } = req.query as { page: string };
  const users = await prisma.user.findMany({
    take: Number(page) * 10,
  });
  return res.status(200).json({ users: users });
};

const getAUser = async (req: Request, res: Response) => {
  //get user id
  const { id } = req.query as { id: string };
  const exists = await prisma.user.findFirst({
    select: {
      email: true,
      name: true,
      address: true,
      user_id: true,
    },
    where: {
      user_id: id,
    },
  });
  if (!exists) return res.status(400).json({ Message: "User not found" });
  return res.status(200).json({ user: exists });
};

//client will check empty;
const createAUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  console.log(" email, password, name ", email, password, name);
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
      total_quantity: 0,
    },
  });
  return res.status(200).json({
    success: true,
    Message: "Create user successfully",
    id: user.user_id,
    email: user.email,
  });
};

const updateUser_admin = async (req: Request, res: Response) => {
  const { user_id, address, name, role_id, status } = req.body as {
    user_id: string;
    address: string;
    name: string;
    role_id: string;
    status: boolean;
  };

  const exists = await prisma.user.findUnique({
    where: {
      user_id: user_id,
    },
  });

  if (!exists) {
    return res.status(404).json({ Message: "User not found" });
  }

  const updated = await prisma.user.update({
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

  console.log("updated: ", updated);

  return res.status(200).json({
    Message: "Update successfully",
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
    // sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    // secure: false,
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
  return res.clearCookie("my_cookie").status(200).json({ Message: "Logged out successfully" });
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
};
