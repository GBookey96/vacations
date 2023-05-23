import express, {Request, Response, NextFunction} from "express"
import vacationLogic from "../5-logic/vacation-logic"
import VacationModel from "../4-models/vacation-model"

const router = express.Router()

router.get("/vacations", async(request: Request, response: Response, next: NextFunction)=> {
    try {
        const allVacations = await vacationLogic.getAllVacations()
        response.json(allVacations)
    }
    catch(err:any) {
        next(err)
    }
})

router.get("/vacations/:id", async(request: Request, response: Response, next: NextFunction)=> {
    try {
        const id = +request.params.id
        const vacation = await vacationLogic.getOneVacation(id)
        response.json(vacation)
    }
    catch (err: any) {
        next(err)
    }
})

router.post("/vacations", async(request: Request, response: Response, next: NextFunction)=> {
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

router.delete("/vacations/delete/:id", async(request: Request, response: Response, next: NextFunction)=> {
    try {
        const id = +request.params.id
        await vacationLogic.deleteVaction(id)
        response.sendStatus(204)
    }
    catch(err: any) {
        next(err)
    }
})

router.put("/vacations/update/:id", async(request: Request, response: Response, next: NextFunction)=> {
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