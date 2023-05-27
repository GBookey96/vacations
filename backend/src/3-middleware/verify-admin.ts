import { NextFunction, Request, Response } from "express";

import { UnauthorizedErrorModel } from "../4-models/error-model";
import cyber from "../2-utils/cyber";


async function verifyAdmin(request: Request, response: Response, next: NextFunction) {
    try {
        const isAdmin = await cyber.verifyAdmin(request)
        if(!isAdmin) return new UnauthorizedErrorModel("You do not have admin rights!")
        next()

    }    
    catch(err: any) {
        next(err)
    }
}

export default verifyAdmin