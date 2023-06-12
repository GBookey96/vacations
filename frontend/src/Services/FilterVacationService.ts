import VacationModel from "../Models/vacations-model"
import authService from "./AuthService"
import vacationsService from "./VacationsService"

class FilterVacationsService {

    public async notyetStarted(): Promise<VacationModel[]> {
        const currentDate = new Date().toISOString().split("T")[0]

        const allVacations = await vacationsService.getAllVacations()
        const notyetStarted = allVacations.filter(v => v.vacationStart >= currentDate)
        return notyetStarted
    }

    public async activeVacations(): Promise<VacationModel[]> {
        const currentDate = new Date().toISOString().split("T")[0]
        const allVacations = await vacationsService.getAllVacations()
        const activeVacations = allVacations.filter(v => v.vacationStart <= currentDate && v.vacationEnd >= currentDate)
        return activeVacations
    }

    public async followedVacations(userId: number): Promise<VacationModel[]> {
        const followedVacationIdList = (await authService.getOneUser(userId)).followedVacations
        const followedVacations = []
        for(const vacationId of followedVacationIdList) {
            const vacation = await vacationsService.getOneVacation(vacationId)
            followedVacations.push(vacation)
        }
        return followedVacations
    }
}

const filterVacationsService = new FilterVacationsService()

export default filterVacationsService