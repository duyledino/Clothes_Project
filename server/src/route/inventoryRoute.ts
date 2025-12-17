import express,{type Express} from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authenticateAdmin, authenticateUser } from '../middleware/authentication.js';
import { getAllInventory } from '../controller/Inventory/controller.js';
import { createAStockReceipt, getPrepareBeforeAdd } from '../controller/stock/controller.js';

const router = express.Router();

const initRoute = (app: Express)=>{
    router.get("/getInventory",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),asyncHandler(getAllInventory));
    return app.use("api/v1/inventory",router);
}

export default initRoute;