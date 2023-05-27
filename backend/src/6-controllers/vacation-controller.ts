import express, {Request, Response, NextFunction} from "express"
import vacationLogic from "../5-logic/vacation-logic"
import VacationModel from "../4-models/vacation-model"
import path from "path"
import blockNonLoggedIn from "../3-middleware/block-non-logged-in"
import verifyAdmin from "../3-middleware/verify-admin"

const router = express.Router()

router.get("/vacations", blockNonLoggedIn, async(request: Request, response: Response, next: NextFunction)=> {
    try {
        const allVacations = await vacationLogic.getAllVacations()
        response.json(allVacations)
    }
    catch(err:any) {
        next(err)
    }
})

router.get("/vacations/:id", blockNonLoggedIn, async(request: Request, response: Response, next: NextFunction)=> {
    try {
        const id = +request.params.id
        const vacation = await vacationLogic.getOneVacation(id)
        response.json(vacation)
    }
    catch (err: any) {
        next(err)
    }
})

router.get("/vacations/img/:imageName", blockNonLoggedIn, async(request: Request, response: Response, next: NextFunction)=> {
    try {
        const imageName = request.params.imageName
        const absolutePath = path.join(__dirname, "..", "1-assets", "vacationImages", imageName)
        response.sendFile(absolutePath)
    }
    catch(err: any) {
        next(err)
    }
})

router.post("/vacations", verifyAdmin, async(request: Request, response: Response, next: NextFunction)=> {
    try {
        request.body.vacationImg = request.files?.vacationImg
        const vacation = new VacationModel(request.body)
        const addedVacation = await vacationLogic.addVacation(vacation)
        response.status(201).json(addedVacation)
    }
    catch(err:any) {
        next(err)
    }
})

router.delete("/vacations/delete/:id", verifyAdmin, async(request: Request, response: Response, next: NextFunction)=> {
    try {
        const id = +request.params.id
        await vacationLogic.deleteVaction(id)
        response.sendStatus(204)
    }
    catch(err: any) {
        next(err)
    }
})

router.put("/vacations/update/:id", verifyAdmin, async(request: Request, response: Response, next: NextFunction)=> {
    try {
        request.body.id = +request.params.id
        
        const vacation = new VacationModel(request.body)
        vacation.vacationId = +request.params.id
        const updatedVacation  = await vacationLogic.updateVacation(vacation)
        response.json(updatedVacation)
    }
    catch(err: any) {
        next(err)
    }
})

export default router