import {Request,Response, NextFunction } from "express";
import HttpException from "../utils/http-exception";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) =>{
 if(err instanceof HttpException){
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
 }

 return res.status(500).json({
    success:false,
    message:"Internal server Error."
 })
}

export default errorMiddleware;