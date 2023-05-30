import { UploadedFile } from "express-fileupload"
import Joi from "joi"

class VacationModel {
    public vacationId: number
    public vacationDestination: string
    public vacationDescription: string
    public vacationStart: string
    public vacationEnd: string
    public vacationPrice: number
    public vacationImg: UploadedFile
    public vacationImgName: string

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId
        this.vacationDestination = vacation.vacationDestination
        this.vacationDescription = vacation.vacationDescription
        this.vacationStart = vacation.vacationStart
        this.vacationEnd = vacation.vacationEnd
        this.vacationPrice = vacation.vacationPrice
        this.vacationImg = vacation.vacationImg
        this.vacationImgName = vacation.vacationImgName
    }

    public static validationSchema = Joi.object({
        vacationId: Joi.number().positive().integer().optional(),
        vacationDestination: Joi.string().min(3).max(30),
        vacationDescription: Joi.string().required().min(100).max(5000),
        vacationStart: Joi.string().required(),
        vacationEnd: Joi.string().required(),
        vacationPrice: Joi.number().required().positive().integer().max(10000),
        vacationImg: Joi.object().optional(),
        vacationImgName: Joi.string().optional()
    })

    public validate(): string {
        const result = VacationModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default VacationModel