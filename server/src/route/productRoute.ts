import express from "express";
import type { Application } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { createAProduct, deleteProduct, findProduct, getAllProducts, getAllProductsAdmin, getBestSeller, getLastestProduct, getProductById, getProductByIdAdmin, getTotalPageFilter, reviseProduct, updateAProduct } from "../controller/product/controller.js";
import { upload } from "../config/multer.js";
import { authenticateAdmin, authenticateUser } from "../middleware/authentication.js";

const router = express.Router();

const route = (app: Application) => {
  router.post("/allProducts", asyncHandler(getAllProducts));
  router.get("/lastestProducts", asyncHandler(getLastestProduct));
  router.get("/bestSellerProducts", asyncHandler(getBestSeller));
  router.get(
    "/allProductsAdmin",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(getAllProductsAdmin)
  );
  router.post("/getTotalPage", asyncHandler(getTotalPageFilter));
  router.get(
    "/getProductByIdAdmin",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(getProductByIdAdmin)
  );
  router.post(
    "/createAProduct",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    upload.array("photos", 12),
    asyncHandler(createAProduct)
  );
  router.put(
    "/reviseProduct",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(reviseProduct)
  );
  router.delete(
    "/deleteProduct",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    asyncHandler(deleteProduct)
  );
  router.put(
    "/updateAProduct",
    asyncHandler(authenticateUser),
    asyncHandler(authenticateAdmin),
    upload.fields([{name:"photos", maxCount: 12},{name:"tryon", maxCount: 1}]),
    asyncHandler(updateAProduct)
  );
  router.get("/findProduct", asyncHandler(findProduct));
  router.get("/getProductById", asyncHandler(getProductById));
  //Can add delete multiple
  return app.use("/api/v1/product", router);
};

export default route;