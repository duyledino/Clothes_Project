import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { cloudinary } from "../../config/cloudinary.js";

const prisma = new PrismaClient();

// Request<
//   ParamsDictionary = {}, // req.params
//   ResBody = any,         // res.json body
//   ReqBody = any,         // req.body
//   ReqQuery = ParsedQs    // req.query
// >
const getAllProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string);
  const { category, sort } = req.body;
  console.log("category, subcategory, sort: ", category, sort);
  const Category = category.map((item: any) => item.toLowerCase());
  const categoryConditions = Category.map((catId: string) => ({
    Product_Category: {
      some: {
        category_id: catId, 
      },
    },
  }));
  const products = await prisma.product.findMany({
    select: {
      product_id: true,
      product_name: true,
      imageUrl: true,
      description: true,
      price: true,
      count: true,
      status: true,
      Product_Category:true
    },
    skip: 8 * (page - 1),
    take: 8,
    where: {
      status: {
        equals: "active",
      },
      AND:[
        ...categoryConditions
      ]
    },
    orderBy:
      sort !== ""
        ? sort === "Low to High"
          ? {
              price: "asc",
            }
          : {
              price: "desc",
            }
        : {},
  });
  const fixBigIntProducts = products.map((item: any) => ({
    ...item,
    price: Number(item.price),
  }));
  return res.status(200).json({ products: fixBigIntProducts });
};

const getAllProductsAdmin = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string);
  console.log("page ", page);
  const products = await prisma.product.findMany({
    select: {
      product_id: true,
      product_name: true,
      imageUrl: true,
      price: true,
      product_size: true,
      product_color: true,
      Product_Category:{
        select:{
          category:{
            select:{
              category_name:true,
              category_id:true
            }
          }
        }
      },
      count: true,
      status: true,
    },
    skip: 8 * (page - 1),
    take: 8,
    orderBy: {
      price: "desc",
    },
  });
  // console.log("products: ", products[0]!.Product_Category.map((item: any) => item.category.category_name));
  const fixBigIntProducts = products.map((item: any) => ({
    product_id:item.product_id,
    product_name:item.product_name,
    imageUrl:item.imageUrl,
    product_size:item.product_size,
    product_color:item.product_color,
    product_category: item.Product_Category.map((item1: any) => item1.category),
    count:item.count,
    status:item.status,
    price: Number(item.price),
  }));
  console.log("products: ", fixBigIntProducts);

  return res.status(200).json({ products: fixBigIntProducts });
};

const getLastestProduct = async (req: Request, res: Response) => {
  const lastest = await prisma.product.findMany({
    select: {
      product_id: true,
      product_name: true,
      imageUrl: true,
      description: true,
      price: true,
    },
    take: 4,
    orderBy: {
      create_at: "desc",
    },
    where: {
      status: {
        equals: "active",
      },
    },
  });
  const fixBigIntLastest = lastest.map((item: any) => ({
    ...item,
    price: Number(item.price),
  }));
  return res.status(200).json({ products: fixBigIntLastest });
};
const getBestSeller = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    select: {
      product_id: true,
      product_name: true,
      imageUrl: true,
      description: true,
      price: true,
    },
    take: 4,
    where: {
      status: {
        equals: "active",
      },
    },
    orderBy: {
      count: "desc",
    },
  });
  const fixBigIntProducts = products.map((item: any) => ({
    ...item,
    price: Number(item.price),
  }));
  return res.status(200).json({ products: fixBigIntProducts });
};
// model Product {
//     id          String   @id
//     title       String
//     price       BigInt // VND stored as whole numbers
//     description String
//     imageUrl    String[]
//     count       Int      @default(0)
//     date        DateTime @default(now())
//     detail      Detail[]
// }

const createAProduct = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  // title: string
  // description: string
  // price: number
  // sudcategory, category: string
  // size: string[]
  if (!files) {
    return res.status(400).json({ Message: "Missing info" });
  }
  // receive string first then covert them to string[]
  const { product_name, description, price, category, size, color } =
    req.body as {
      product_name: string;
      description: string;
      price: number;
      category: string;
      size: string;
      color: string;
    };
  console.log(
    "title, description,price,category,size,color: ",
    product_name,
    description,
    price,
    category,
    size,
    color
  );
  const sizes = size.split(",");
  const colors = color.split(",");
  const categories = category.split(",");
  console.log("file: ", files);
  console.log("sizes: ", sizes);
  console.log("colors: ", colors);
  console.log("categories: ", categories);
  if (product_name === "" || description === "")
    return res.status(400).json({ Message: "Failed to create product" });
  if (!files || files.length === 0)
    return res.status(400).json({ Message: "Failed to create product" });
  const imageUrl = [];
  let tryonImg = null;
  for (let i = 0; i < files.length; i++) {
    const data = fs.readFileSync(files[i]!.path);
    const base64Image = `data:${files[i]!.mimetype};base64,${Buffer.from(
      data
    ).toString("base64")}`;
    const { secure_url } = await cloudinary.uploader.upload(base64Image);
    console.log("secure_url: ", secure_url);
    if (i === files.length - 1) tryonImg = secure_url;
    else imageUrl.push(secure_url);
    fs.unlinkSync(files[i]!.path);
  }
  console.log("imageUrl: ", imageUrl);
  const new_product = await prisma.product.create({
    data: {
      product_id: `PDT-${uuid().slice(0, 8)}`,
      description,
      price: BigInt(price),
      product_name: product_name,
      imageUrl,
      tryon: tryonImg!,
      
    },
  });
  await prisma.product_Category.createMany({
    data: categories.map((item) => ({
      category_id: item,
      product_id: new_product.product_id,
    })),
  });
  //success: then insert into product_size and product_color table
  await prisma.product_Size.createMany({
    data: sizes.map((item, index) => {
      return { size_id: item, product_id: new_product.product_id };
    }),
  });
  await prisma.product_Color.createMany({
    data: colors.map((item, index) => {
      return { color_id: item, product_id: new_product.product_id };
    }),
  });

  let data: {
    product_id: string;
    size_id: string;
    color_id: string;
    quantity: number;
    create_at: Date;
  }[] = [];
  let size_data: any[] = sizes.map((item) => ({
    product_id: new_product.product_id,
    size_id: item,
  }));
  let create_at: Date = new Date();
  size_data.forEach((item, index) => {
    colors.forEach((item1, index1) => {
      data = [
        ...data,
        { ...item, ...{ color_id: item1, quantity: 0, create_at: create_at } },
      ];
    });
  });
  console.log("data", data); // [] ??
  await prisma.inventory.createMany({
    data: data,
  });
  return res.status(200).json({ Message: "Create product successfully" });
};

const updateAProduct = async (req: Request, res: Response) => {
  const files_temp = req.files as { [fieldname: string]: Express.Multer.File[] };
  const files = files_temp['photos'];
  const fileTryon = files_temp['tryon'];
  const { product_id } = req.query as { product_id: string };
  // receive string first then covert them to string[]
  console.log("product_id: ", product_id);
  console.log("fileTryon: ", fileTryon);
  const { product_name, description, price, category, size, color, image, tryonURL } =
    req.body as {
      product_name: string;
      description: string;
      price: number;
      category: string;
      size: string;
      color: string;
      image: string;
      tryonURL: string;
    };
  console.log(
    "title, description,price,category,size,color: ",
    product_name,
    description,
    price,
    category,
    size,
    color,
    tryonURL
  );
  const images = image.split(",");
  const sizes = size.split(",");
  const colors = color.split(",");
  const categories = category.split(",");
  console.log("file: ", files);
  console.log("sizes: ", sizes);
  console.log("colors: ", colors);
  console.log("categories: ", categories);
  if (product_name === "" || description === "")
    return res.status(400).json({ Message: "Thiếu thông tin" });

  const imageUrl = [...images];
  let tryonImg = tryonURL;
  if(files && files.length > 0){
    for (let i = 0; i < files!.length; i++) {
      const data = fs.readFileSync(files![i]!.path);
      const base64Image = `data:${files![i]!.mimetype};base64,${Buffer.from(
        data
      ).toString("base64")}`;
      const { secure_url } = await cloudinary.uploader.upload(base64Image);
      console.log("secure_url: ", secure_url);
      if (i === files!.length - 1) tryonImg = secure_url;
      else imageUrl.push(secure_url);
      fs.unlinkSync(files![i]!.path);
    }
  }
  if( fileTryon && fileTryon.length > 0){
    const data = fs.readFileSync(fileTryon[0]!.path);
    const base64Image = `data:${fileTryon[0]!.mimetype};base64,${Buffer.from(
      data
    ).toString("base64")}`;
    const { secure_url } = await cloudinary.uploader.upload(base64Image);
    console.log("secure_url: ", secure_url);
    tryonImg = secure_url;
    fs.unlinkSync(fileTryon[0]!.path);
  }
  console.log("imageUrl: ", imageUrl);
  await prisma.product.update({
    data: {
      description,
      price: BigInt(price),
      product_name: product_name,
      imageUrl: !imageUrl ? [] : imageUrl,
      tryon: !tryonImg ? "" : tryonImg,
    },
    where: {
      product_id: product_id,
    },
    
  });
  await prisma.product_Category.createMany({
    data: categories.map((item) => ({
      category_id: item,
      product_id: product_id,
    })),
    skipDuplicates: true,
  });
  await prisma.product_Size.createMany({
    data: sizes.map((item, index) => {
      return { size_id: item, product_id: product_id };
    }),
    skipDuplicates: true,
  });
  await prisma.product_Color.createMany({
    data: colors.map((item, index) => {
      return { color_id: item, product_id: product_id };
    }),
    skipDuplicates: true,
  });
let data: {
    product_id: string;
    size_id: string;
    color_id: string;
    quantity: number;
    create_at: Date;
  }[] = [];
  let create_at: Date = new Date();
  if(sizes.length > 0 && colors.length > 0){
    let size_data: any[] = sizes.map((item) => ({
    product_id: product_id,
    size_id: item,
  }));
  size_data.forEach((item, index) => {
    colors.forEach((item1, index1) => {
      data = [
        ...data,
        { ...item, ...{ color_id: item1, quantity: 0, create_at: create_at } },
      ];
    });
  });
  }
  console.log("data", data); // [] ??
  await prisma.inventory.createMany({
    data: data.length > 0 ? data : [],
    skipDuplicates: true,
  });
  return res.status(200).json({ Message: "Cập nhật sản phẩm thành công" });
};

//cannot delete this because constraint to detail so mark it is deleted to delete it (not for sell anymore !!)
const deleteProduct = async (req: Request, res: Response) => {
  const { ids } = req.body;
  console.log("id delete array: ", ids);
  console.log("id delete array: ", typeof ids);
  if (!Array.isArray(ids)) {
    return res.status(400).json({ Message: "Failed to delete products" });
  }
  await prisma.product.updateMany({
    data: {
      status: "suspend",
    },
    where: {
      product_id: {
        in: ids,
      },
    },
  });
  return res.status(200).json({ Message: "Delete product successfully" });
};

const reviseProduct = async (req: Request, res: Response) => {
  const { ids } = req.body;
  console.log("id delete array: ", ids);
  if (ids == null || ids == undefined || ids.length == 0) {
    return res.status(400).json({ Message: "Failed to delete products" });
  }
  await prisma.product.updateMany({
    data: {
      status: "active",
    },
    where: {
      product_id: {
        in: ids,
      },
    },
  });
  return res.status(200).json({ Message: "Revise product successfully" });
};

const findProduct = async (req: Request, res: Response) => {
  const { query } = req.query as { query: string };
  const result = await prisma.product.findMany({
    select: {
      product_id: true,
      product_name: true,
      imageUrl: true,
      price: true,
    },
    where: {
      product_name: {
        startsWith: `${query}`,
        mode: "insensitive",
      },
      status: {
        equals: "active",
      },
    },
  });
  console.log("result: ", result);
  const fixBigIntProducts = result.map((item: any) => ({
    ...item,
    price: Number(item.price),
  }));
  console.log(fixBigIntProducts);
  return res.status(200).json({ result: fixBigIntProducts });
};

const getProductById = async (req: Request, res: Response) => {
  const { product_id } = req.query as { product_id: string };
  const product = await prisma.product.findFirst({
    where: {
      product_id: product_id,
    },
    select: {
      product_id: true,
      product_name: true,
      imageUrl: true,
      description: true,
      price: true,
      product_size: true,
      product_color: true,
      tryon: true,
      inventories: {
        select: {
          color_id: true,
          product_id: true,
          size_id: true,
          quantity: true,
        },
      },
    },
  });
  if (!product) return res.status(400).json({ Message: "Product not found." });
  console.log("product: ", product);
  const fixBigIntProduct = {
    ...product,
    price: Number(product.price),
  };
  console.log("fixBigIntProduct: ", fixBigIntProduct);
  return res.status(200).json({ product: fixBigIntProduct });
};

const getTotalPageFilter = async (req: Request, res: Response) => {
  const { category } = req.body;
  console.log("category: ", category);
  const Category = category.map((item: any) => item.toLowerCase());
  const products = await prisma.product.findMany({
    select: {
      product_id: true,
    },
    where: {
      AND: [
        Category.length > 0
          ? { Product_Category: { every: { category_id: { in: Category } } } }
          : {},
      ],
    },
  });
  const total = products.length;
  console.log("total: ", total);
  return res.status(200).json({ total: Number(Math.ceil(Number(total) / 8)) });
};

const getProductByIdAdmin = async (req: Request, res: Response) => {
  const { product_id } = req.query as { product_id: string };
  const product = await prisma.product.findFirst({
    where: {
      product_id: product_id,
    },
    select: {
      product_id: true,
      product_name: true,
      imageUrl: true,
      description: true,
      price: true,
      product_size: true,
      product_color: true,
      tryon: true,
      Product_Category: {
        select: {
          category: true,
        },
      },
    },
  });
  if (!product) return res.status(400).json({ Message: "Product not found." });
  const fixBigIntProduct = {
    ...product,
    price: Number(product.price),
    product_category: product.Product_Category.map((item) => item.category),
  };
  return res.status(200).json({ product: fixBigIntProduct });
};


export {
  getTotalPageFilter,
  findProduct,
  getAllProducts,
  deleteProduct,
  getBestSeller,
  getLastestProduct,
  createAProduct,
  getProductById,
  getAllProductsAdmin,
  reviseProduct,
  getProductByIdAdmin,
  updateAProduct,
};
