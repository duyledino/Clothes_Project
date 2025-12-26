import express,{type Express} from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authenticateAdmin, authenticateUser } from '../middleware/authentication.js';
import { getAllInventory, getInventoryBySearchingNameOrId } from '../controller/Inventory/controller.js';
import {getPrepareBeforeAdd } from '../controller/stock/controller.js';

const router = express.Router();

const initRoute = (app: Express)=>{
    router.get("/getAllInventory",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(getAllInventory));
    // router.post("/createStockReceipt",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(createAStockReceipt));
    router.get("/getInventoryBySearchingNameOrId",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(getInventoryBySearchingNameOrId))
    return app.use("/api/v1/inventory",router);
}

export default initRoute;