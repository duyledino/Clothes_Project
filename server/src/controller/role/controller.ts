import {PrismaClient} from '@prisma/client'
import type {Request,Response} from 'express'

const prisma = new PrismaClient();

// 1. Get All Roles
const getAllRole = async (req: Request, res:Response) => {
  const roles = await prisma.role.findMany();
  
  return res.status(200).json({
    success: true,
    data: roles,
  });
};

// 2. Create A Role
const createARole = async (req: Request, res:Response) => {
  const { role_name } = req.body;

  if (!role_name) {
    throw new Error('Role name is required');
  }

  // UUID is generated automatically by Prisma/DB due to @default(uuid())
  const newRole = await prisma.role.create({
    data: {
      role_name, 
    },
  });

  res.status(201).json({
    success: true,
    Message: 'Role created successfully',
    data: newRole,
  });
};

// 3. Get A Single Role (Assuming query param: /getARole?role_id=...)
const getARole = async (req: Request, res:Response) => {
  const { role_id } = req.query;

  if (!role_id) {
    throw new Error('Role ID is required');
  }

  const role = await prisma.role.findUnique({
    where: {
      role_id: role_id as string,
    },
  });

  if (!role) {
    res.status(404);
    throw new Error('Role not found');
  }

  res.status(200).json({
    success: true,
    data: role,
  });
};

// 4. Update A Role
const updateARole = async (req: Request, res:Response) => {
  const { role_id, role_name } = req.body;

  if (!role_id || !role_name) {
    throw new Error('Role ID and Role Name are required');
  }

  // Check if role exists first (optional, but good for specific error Messages)
  const existingRole = await prisma.role.findUnique({
    where: { role_id },
  });

  if (!existingRole) {
    res.status(404);
    throw new Error('Role not found');
  }

  const updatedRole = await prisma.role.update({
    where: {
      role_id: role_id,
    },
    data: {
      role_name: role_name,
    },
  });

  res.status(200).json({
    success: true,
    Message: 'Role updated successfully',
    data: updatedRole,
  });
};

export {
  getAllRole,
  createARole,
  getARole,
  updateARole,
};