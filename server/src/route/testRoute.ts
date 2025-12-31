import type { Express,Request,Response } from "express";
import express from 'express'
import { asyncHandler } from "../middleware/asyncHandler.js";
import { authenticateAdmin, authenticateShipper, authenticateUser } from "../middleware/authentication.js";

const router = express.Router();

const init = (app:Express)=>{
    router.get("/admin",asyncHandler(authenticateUser),asyncHandler(authenticateAdmin),(req:Request,res:Response)=>{
        return res.status(200).json({
            success:200
        });
    });
    router.get("/user",asyncHandler(authenticateUser),(req:Request,res:Response)=>{
        return res.status(200).json({
            success:200
        })
    })
    router.get("/employee",asyncHandler(authenticateUser),asyncHandler(authenticateShipper),(req:Request,res:Response)=>{
        return res.status(200).json({
            success:200
        })
    })
    return app.use("/api/v1/test",router);
}

export default init;