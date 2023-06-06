import { VacationsActionType, vacationsStore } from "../Redux/VacationsState"
import axios from "axios"
import VacationModel from "../Models/vacations-model"
import appConfig from "../Utils/config"

class VacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {
        let vacations = vacationsStore.getState().vacations
        if(vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl)
            vacations = response.data
            vacationsStore.dispatch({type: VacationsActionType.FetchVacations, payload: vacations})
        }
        return vacations
    }

    public async getOneVacation(id: number): Promise<VacationModel> {
        let vacations = vacationsStore.getState().vacations
        let vacation = vacations.find(v => v.vacationId === id)
        if(!vacation) {
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id)
            vacation = response.data
        }
        return vacation
    }

    public async addVacations(vacation: VacationModel): Promise<void> {
        const myFormData = new FormData()
        myFormData.append("vacationDestination", vacation.vacationDestination)
        myFormData.append("vacationDescription", vacation.vacationDescription)
        myFormData.append("vacationStart", vacation.vacationStart)
        myFormData.append("vacationEnd", vacation.vacationEnd)
        myFormData.append("vacationPrice", vacation.vacationPrice.toString())
        myFormData.append("vacationImg", vacation.vacationImg[0])
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, myFormData)
        const addedVacation = response.data
        vacationsStore.dispatch({type: VacationsActionType.AddVacations, payload: addedVacation})
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {
        const myFormData = new FormData()
        myFormData.append("vacationDestination", vacation.vacationDestination)
        myFormData.append("vacationDescription", vacation.vacationDescription)
        myFormData.append("vacationStart", vacation.vacationStart)
        myFormData.append("vacationEnd", vacation.vacationEnd)
        myFormData.append("vacationPrice", vacation.vacationPrice.toString())
        if(vacation.vacationImg[0]) myFormData.append("vacationImg", vacation.vacationImg[0])
        const response = await axios.put<VacationModel>(appConfig.updateVacationsUrl + vacation.vacationId, myFormData)
        const updatedVacation = response.data
        vacationsStore.dispatch({type: VacationsActionType.UpdateVacations, payload: updatedVacation})
    }

    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(appConfig.deleteVacationsUrl + id)
        vacationsStore.dispatch({type: VacationsActionType.DeleteVacations, payload: id})
    }
}

const vacationsService = new VacationsService()

export default vacationsService