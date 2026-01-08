import { PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import { createToken } from "../../middleware/authentication.js";
import { v4 as uuid } from "uuid";
import type { Request, Response } from "express";
import { sendMail } from "../../config/mailer.js";

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
  if(exists.status ==false){
    return res.status(400).json({ Message: "Tài khoản của bạn đã bị khóa" });
  }
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
      isVerify:exists.isVerify,
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
      isVerify: true,
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
      isVerify: user?.isVerify
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
      isVerify: true,
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
  const admin = await prisma.user.findFirst({
    where: {
      role: {
        role_name: "admin",
      },
    },
  });
  if(!admin) return res.status(500).json({ Message: "Lỗi hệ thống: Không tìm thấy admin" });
  await prisma.chat.create({
    data: {
      user_id_admin: admin.user_id,
      user_id_user: user.user_id,
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
  const admin = await prisma.user.findFirst({
    where: {
      role: {
        role_name: "admin",
      },
    },
  });
  if(!admin) return res.status(500).json({ Message: "Lỗi hệ thống: Không tìm thấy admin" });
  await prisma.chat.create({
    data:{
      user_id_admin: admin!.user_id,
      user_id_user: user.user_id,
    }
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
  // const { status } = req.body as { status: boolean };
  const exists = await prisma.user.findFirst({
    where: {
      user_id: user_id,
    },
  });
  if (!exists) return res.status(400).json({ Message: "User không tồn tại" });
  await prisma.user.update({
    where: {
      user_id: user_id,
    },
    data: {
      status: false,
    },
  });
  return res.status(200).json({ Message: "Đã ban thành công" });
};

const unbanUser = async (req: Request, res: Response) => {
  const { user_id } = req.query as { user_id: string };
  const exists = await prisma.user.findFirst({
    where: {
      user_id: user_id,
    },
  });
  if (!exists) return res.status(400).json({ Message: "User không tồn tại" });
  await prisma.user.update({
    where: {
      user_id: user_id,
    },
    data: {
      status: true,
    },
  });
  return res.status(200).json({ Message: "Đã gỡ ban thành công" });
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

const sendVerifyMail = async (req: Request, res: Response) => {
  const { user_id } = req.query as { user_id: string };
  const exists = await prisma.user.findFirst({
    select:{
      email:true,
    },
    where: {
      user_id: user_id,
    },
  });
  if (!exists) return res.status(400).json({ Message: "User không tồn tại" });
  const token = uuid();
  const expireVerifyAt = new Date();
  expireVerifyAt.setMinutes(expireVerifyAt.getMinutes() + 5);
  await prisma.user.update({
    where: {
      user_id: user_id,
    },
    data: {
      verify_token: token,
      expire_verify_at: expireVerifyAt,
    },
  });
  const to = exists.email;
  const subject = "Verify your email";
  const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        /* Resets to ensure consistent rendering */
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
        table { border-spacing: 0; width: 100%; }
        td { padding: 0; }
        img { border: 0; }
        
        /* Mobile styles */
        @media screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 20px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">

    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                
                <table role="presentation" class="container" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                    
                    <tr>
                        <td align="center" style="background-color: #007bff; padding: 30px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Welcome!</h1>
                        </td>
                    </tr>

                    <tr>
                        <td class="content" style="padding: 40px 30px; text-align: center;">
                            <h2 style="color: #333333; margin-top: 0; font-size: 22px;">Verify your email address</h2>
                            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
                                Cảm ơn đã đăng ký tài khoản, hãy xác nhận email của bạn để có thể sử dụng tài khoản của bạn.
                            </p>
                            
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                                <tr>
                                    <td align="center" style="border-radius: 4px;" bgcolor="#007bff">
                                        <a href="http://localhost:5173/verify?token=${token}&user_id=${user_id}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; border: 1px solid #007bff; display: inline-block; font-weight: bold;">
                                            Verify Email Ngay
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #999999; font-size: 14px; margin-top: 30px;">
                                Nếu nút không hoạt động, sao chép và dán liên kết này vào trình duyệt của bạn:<br>
                                <a href="http://localhost:5173/verify?token=${token}&user_id=${user_id}" style="color: #007bff;">http://localhost:5173/verify?token=${token}&user_id=${user_id}</a>
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="background-color: #f8f9fa; padding: 20px; border-top: 1px solid #eeeeee;">
                            <p style="color: #999999; font-size: 12px; margin: 0;">
                                Nếu bạn không yêu cầu email này, bạn có thể an toàn bỏ qua nó.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>`;
  await sendMail(to, subject, html);
  return res.status(200).json({ Message: "Đã gửi mail cho bạn" });
};

const verifyUser = async (req: Request, res: Response) => {
  const { user_id,token } = req.query as { user_id: string,token: string };
  const exists = await prisma.user.findFirst({
    select:{
      expire_verify_at: true
    },
    where: {
      verify_token: token,
    },
  });
  if (!exists) return res.status(400).json({ Message: "Token không hợp lệ" });
  if(exists.expire_verify_at && exists.expire_verify_at < new Date())
    return res.status(400).json({ Message: "Token đã hết hạn" });
  await prisma.user.update({
    where: {
      user_id: user_id,
    },
    data: {
      isVerify: true,
      verify_token: null,
      expire_verify_at: null,
    },
  });
  return res.status(200).json({ Message: "Đã xác thực tài khoản thành công" });
};


const sendVerifyForgetPasswordMail = async (req: Request, res: Response) => {
  const { email } = req.query as { email: string };
  const exists = await prisma.user.findFirst({
    select: {
      user_id: true,
      name: true,
      email: true,
    },
    where: {
      email: email,
    },
  });
  if (!exists) return res.status(400).json({ Message: "User không tồn tại" });
  const token = uuid();
  const expireVerifyAt = new Date();
  expireVerifyAt.setMinutes(expireVerifyAt.getMinutes() + 5);
  await prisma.user.update({
    where: {
      user_id: exists.user_id,
      isVerify: true,
    },
    data: {
      forget_password_token: token,
      expire_forget_password_at: expireVerifyAt,
    },
  });
  const to = exists.email;
  const subject = "Hãy xác nhận email của bạn để reset mật khẩu";
  const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác thực email</title>
    <style>
        /* Resets to ensure consistent rendering */
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
        table { border-spacing: 0; width: 100%; }
        td { padding: 0; }
        img { border: 0; }
        
        /* Mobile styles */
        @media screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 20px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">

    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                
                <table role="presentation" class="container" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                    
                    <tr>
                        <td align="center" style="background-color: #007bff; padding: 30px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Welcome!</h1>
                        </td>
                    </tr>

                    <tr>
                        <td class="content" style="padding: 40px 30px; text-align: center;">
                            <h2 style="color: #333333; margin-top: 0; font-size: 22px;">Verify your email address</h2>
                            <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
                                Xin chào ${exists.name} .Nhấn nút dưới đây để reset mật khẩu của bạn.
                            </p>
                            
                            <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                                <tr>
                                    <td align="center" style="border-radius: 4px;" bgcolor="#007bff">
                                        <a href="http://localhost:5173/forgetPassword?token=${token}&user_id=${exists.user_id}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; border: 1px solid #007bff; display: inline-block; font-weight: bold;">
                                            Reset Password Ngay
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #999999; font-size: 14px; margin-top: 30px;">
                                Nếu nút không hoạt động, hãy sao chép và dán liên kết này vào trình duyệt của bạn:<br>
                                <a href="http://localhost:5173/forgetPassword?token=${token}&user_id=${exists.user_id}" style="color: #007bff;">http://localhost:5173/forgetPassword?token=${token}&user_id=${exists.user_id}</a>
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="background-color: #f8f9fa; padding: 20px; border-top: 1px solid #eeeeee;">
                            <p style="color: #999999; font-size: 12px; margin: 0;">
                                Nếu bạn không yêu cầu email này, bạn có thể an toàn bỏ qua nó.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>`;
  await sendMail(to, subject, html);
  return res.status(200).json({ Message: "Đã gửi mail cho bạn" });
};
const verifyForgetPassword = async (req: Request, res: Response) => {
  const { user_id,token } = req.query as { user_id: string,token: string };
  const {password} = req.body as {password:string}
  const exists = await prisma.user.findFirst({
    select:{
      expire_forget_password_at: true
    },
    where: {
      forget_password_token: token,
    },
  });
  if (!exists) return res.status(400).json({ Message: "Token không hợp lệ" });
  if(exists.expire_forget_password_at && exists.expire_forget_password_at < new Date()) 
    return res.status(400).json({ Message: "Token đã hết hạn" });
   const salt = await genSalt(5);
  const hashPass = await hash(password, salt);
  await prisma.user.update({
    where: {
      user_id: user_id,
    },
    data: {
      password: hashPass,
      forget_password_token: null,
      expire_forget_password_at: null,
    },
  });
  return res.status(200).json({ Message: "Đã reset mật khẩu thành công" });
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
  unbanUser,
  sendVerifyMail,
  verifyUser,
  sendVerifyForgetPasswordMail,
  verifyForgetPassword,
};
