import express,{type Express} from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authenticateAdmin, authenticateUser } from '../middleware/authentication.js';
import { getAllInventory, getInventoryBySearchingNameOrId, getInventoryFollowingCart, updateNewMinQuantityInventory } from '../controller/Inventory/controller.js';
import {getPrepareBeforeAdd } from '../controller/stock/controller.js';

const router = express.Router();

const initRoute = (app: Express)=>{
    router.get("/getAllInventory",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(getAllInventory));
    router.put("/updateNewMinQuantityInventory",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(updateNewMinQuantityInventory));
    router.get("/getInventoryBySearchingNameOrId",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(getInventoryBySearchingNameOrId))
    router.get("/getInventoryFollowingCart",asyncHandler(authenticateUser),asyncHandler(getInventoryFollowingCart))
    return app.use("/api/v1/inventory",router);
}

export default initRoute;