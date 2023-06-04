import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import VacationModel from "../4-models/vacation-model"
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-model"
import { v4 as uuid } from "uuid";
import fs from "fs"

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
    if(vacation.vacationImg) {
        console.log(vacation.vacationImgName)
        fs.unlinkSync("./src/1-assets/vacationImages/" + vacation.vacationImgName)
        const extension = vacation.vacationImg.name.substring(vacation.vacationImg.name.lastIndexOf("."))
        vacation.vacationImgName = uuid() + extension
        await vacation.vacationImg.mv("./src/1-assets/vacationImages/" + vacation.vacationImgName)
        delete vacation.vacationImg
    }

    const sql = `UPDATE vacations SET 
                    vacationDestination = ?,
                    vacationDescription = ?,
                    vacationStart = ?,
                    vacationEnd = ?,
                    vacationPrice = ?
                WHERE vacationId = ?
    `
    const info: OkPacket = await dal.execute(sql, [vacation.vacationDestination, vacation.vacationDescription, vacation.vacationStart, vacation.vacationEnd, vacation.vacationPrice, vacation.vacationId])
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationId)
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
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVaction
}