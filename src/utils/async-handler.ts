import { Request,Response,NextFunction } from "express";

const asyncHandler = (controller:any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await controller(req, res, next);
        }
        catch(error:any){
            console.log("Error",error);
            return next(error);
        }
    };
}

export default asyncHandler;