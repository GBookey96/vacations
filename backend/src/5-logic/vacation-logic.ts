import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-model"
import { v4 as uuid } from "uuid";
import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import VacationModel from "../4-models/vacation-model"
import fs from "fs"

async function getAllVacations(): Promise<VacationModel[]> {
    // selects all info from vacations table, along with a count of how many users are following each vacation
    const sql = `
            SELECT V.*, COUNT(DISTINCT F.userId) AS followerCount
            FROM vacations AS V
            LEFT JOIN followers AS F ON V.vacationId = F.vacationId
            GROUP BY V.vacationId, V.vacationDestination
            ORDER BY V.vacationStart`
    const vacations = await dal.execute(sql)
    return vacations
}

async function getVacationsWithFollowerCount(): Promise<VacationModel[]> {
    const sql = `SELECT V.vacationId, V.vacationDestination, COUNT(DISTINCT F.userId) AS followerCount
    FROM vacations AS V
    LEFT JOIN followers AS F ON V.vacationId = F.vacationId
    GROUP BY V.vacationId, V.vacationDestination`
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
        
    const today = new Date().toISOString().split("T")[0]

    if(vacation.vacationStart < today) throw new ValidationErrorModel("Start date must be no earlier than " + today)
    if(vacation.vacationEnd <= vacation.vacationStart) throw new ValidationErrorModel("Please ensure the end date is at least one day after the start date.")

    const imageExtension = vacation.vacationImg.name.substr(vacation.vacationImg.name.lastIndexOf("."))
    vacation.vacationImgName = uuid() + imageExtension
    await vacation.vacationImg.mv("./src/1-assets/vacationImages/" + vacation.vacationImgName)
    delete vacation.vacationImg
    

    const sql = `INSERT INTO vacations VALUES( DEFAULT, ?, ?, ?, ?, ?, ?)`
    const info: OkPacket = await dal.execute(sql, [vacation.vacationDestination, vacation.vacationDescription, vacation.vacationStart, vacation.vacationEnd, +vacation.vacationPrice, vacation.vacationImgName])
    vacation.vacationId = info.insertId
    return vacation
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
    const error = vacation.validate()
    if(error) throw new ValidationErrorModel(error)
    
    if(vacation.vacationEnd <= vacation.vacationStart) throw new ValidationErrorModel("Please ensure the end date is at least one day after the start date.")

    if(vacation.vacationImg) {
        const originalVacation = await getOneVacation(vacation.vacationId)
        fs.unlinkSync("./src/1-assets/vacationImages/" + originalVacation[0].vacationImgName)
        const extension = vacation.vacationImg.name.substring(vacation.vacationImg.name.lastIndexOf("."))
        vacation.vacationImgName = uuid() + extension
        await vacation.vacationImg.mv("./src/1-assets/vacationImages/" + vacation.vacationImgName)
        delete vacation.vacationImg
        const sql = `UPDATE vacations SET 
                        vacationDestination = ?,
                        vacationDescription = ?,
                        vacationStart = ?,
                        vacationEnd = ?,
                        vacationPrice = ?,
                        vacationImgName = ?
                    WHERE vacationId = ?
        `
        const info: OkPacket = await dal.execute(sql, [vacation.vacationDestination, vacation.vacationDescription, vacation.vacationStart, vacation.vacationEnd, vacation.vacationPrice, vacation.vacationImgName, vacation.vacationId])    
        if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationId)
    }
    else {
        const originalVacation = await getOneVacation(vacation.vacationId)
        const sql = `UPDATE vacations SET 
        vacationDestination = ?,
        vacationDescription = ?,
        vacationStart = ?,
        vacationEnd = ?,
        vacationPrice = ?,
        vacationImgName = ?
        WHERE vacationId = ?
        `
        const info: OkPacket = await dal.execute(sql, [vacation.vacationDestination, vacation.vacationDescription, vacation.vacationStart, vacation.vacationEnd, vacation.vacationPrice, originalVacation.vacationImgName, vacation.vacationId])
        if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationId)
    }
    return vacation
}

async function deleteVaction(vacation: VacationModel): Promise<void> {
    const sql = "DELETE FROM vacations WHERE vacationId = ?"
    const thisVacationImgName = vacation[0].vacationImgName
    const info: OkPacket = await dal.execute(sql, [vacation[0].vacationId])
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation[0].vacationId)
    fs.unlinkSync("./src/1-assets/vacationImages/" + thisVacationImgName)
}

export default {
    getAllVacations,
    getVacationsWithFollowerCount,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVaction
}