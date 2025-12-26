import express, { type Application } from 'express'
import {createAOrder,getAllOrder,getOrderByOrderId,getOrderByUserId,getTotalPage,updateAOrder} from '../controller/order/controller.js'
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authenticateUser,authenticateAdmin } from '../middleware/authentication.js';

const router = express.Router();

const route = (app:Application)=>{
    router.get("/allOrders",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(getAllOrder));
    router.post("/createAOrder",asyncHandler(createAOrder));
    router.put("/updateOrder",asyncHandler(updateAOrder)); // this route aims to update payment status and order status
    router.get("/getTotalPage",asyncHandler(getTotalPage));
    router.get("/getOrderByUserId",asyncHandler(authenticateUser),asyncHandler(getOrderByUserId));
    router.get("/getOrderByOrderId",asyncHandler(authenticateUser),asyncHandler(getOrderByOrderId));
    return app.use("/api/v1/order",router);
}

export default route;