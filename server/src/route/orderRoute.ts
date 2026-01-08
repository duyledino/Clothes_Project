import express, { type Application } from 'express'
import {createAOrder,getAllOrder,getDoneOrders,getOrderByOrderId,getOrderByUserId,getPrepareOrders,getShipperOrderDetail,getShippingOrdersByShipperId,getTotalPage,updateAOrder, updateShipperDeliverd, updateShipperRejected, updateShipperTakeOrder} from '../controller/order/controller.js'
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authenticateUser,authenticateAdmin, authenticateShipper } from '../middleware/authentication.js';

const router = express.Router();

const route = (app:Application)=>{
    router.get("/allOrders",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(getAllOrder));
    router.post("/createAOrder",asyncHandler(createAOrder));
    router.put("/updateOrder",asyncHandler(updateAOrder)); // this route aims to update payment status and order status
    router.get("/getTotalPage",asyncHandler(getTotalPage));
    router.get("/getOrderByUserId",asyncHandler(authenticateUser),asyncHandler(getOrderByUserId));
    router.get("/getOrderByOrderId",asyncHandler(authenticateUser),asyncHandler(getOrderByOrderId));
    router.get("/getDoneOrders",asyncHandler(authenticateUser),asyncHandler(authenticateShipper),asyncHandler(getDoneOrders));
    router.get("/getPrepareOrders",asyncHandler(authenticateUser),asyncHandler(authenticateShipper),asyncHandler(getPrepareOrders));
    router.get("/getShippingOrdersByShipperId",asyncHandler(authenticateUser),asyncHandler(authenticateShipper),asyncHandler(getShippingOrdersByShipperId));
    router.get("/getShipperOrderDetail",asyncHandler(authenticateUser),asyncHandler(authenticateShipper),asyncHandler(getShipperOrderDetail));
    router.put("/updateShipperDelivered",asyncHandler(authenticateUser),asyncHandler(authenticateShipper),asyncHandler(updateShipperDeliverd));
    router.put("/updateShipperRejected",asyncHandler(authenticateUser),asyncHandler(authenticateShipper),asyncHandler(updateShipperRejected));
    router.put("/updateShipperTakeOrder",asyncHandler(authenticateUser),asyncHandler(authenticateShipper),asyncHandler(updateShipperTakeOrder));
    return app.use("/api/v1/order",router);
}

export default route;