import {Request,Response,NextFunction} from "express"
import logger from "../2-utils/logger"
import appConfig from "../2-utils/app-config"

function catchAll(err:any,request:Request, response:Response,next:NextFunction) {
    
    const status = err.status || 500

    if(status === 500) {
        logger.logError("catchAll error", err)
    }

    const message = appConfig.isDevelopment || status !== 500 ? err.message : "Some error occured, please try again"

    response.status(status).send(message)
}

export default catchAll