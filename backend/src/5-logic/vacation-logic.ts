import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import VacationModel from "../4-models/vacation-model"
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-model"

async function getAllVacations(): Promise<VacationModel[]> {
    const sql = "SELECT * FROM vacations"
    const vacations = await dal.execute(sql)
    return vacations
}

async function getOneVacation(vacationId: number): Promise<VacationModel> {
    const sql = "SELECT * FROM vacations WHERE vacationId = ?"
    const vacation = await dal.execute(sql, [vacationId])
    return vacation
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    const error = vacation.validate()
    if(error) throw new ValidationErrorModel(error)

    const sql = `
    INSERT INTO vacations VALUES( DEFAULT, ?, ?, ?, ?, ?, ?, ?)
    `
    const info: OkPacket = await dal.execute(sql, [vacation.vacationDestination, vacation.vacationDescription, vacation.vacationStart, vacation.vacationEnd, vacation.vacationOneLine, vacation.vacationPrice, vacation.vacationImg])
    vacation.vacationId = info.insertId
    return vacation
}

async function deleteVaction(id: number): Promise<void> {
    const sql = "DELETE FROM vacations WHERE vacationId = ?"
    const info: OkPacket = await dal.execute(sql, [id])
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(id)
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    const error = vacation.validate()
    if(error) throw new ValidationErrorModel(error)

    const sql = `UPDATE vacations SET 
                    vacationDestination = ?,
                    vacationDescription = ?,
                    vacationStart = ?,
                    vacationEnd = ?,
                    vacationOneLine = ?,
                    vacationPrice = ?,
                    vacationImg = ?
                WHERE vacationId = ?
    `
    const info: OkPacket = await dal.execute(sql, [vacation.vacationDestination, vacation.vacationDescription, vacation.vacationStart, vacation.vacationEnd, vacation.vacationOneLine, vacation.vacationPrice, vacation.vacationImg, vacation.vacationId])
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationId)
    return vacation
}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    deleteVaction,
    updateVacation
}