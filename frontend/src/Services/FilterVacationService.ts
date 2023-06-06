import VacationModel from "../Models/vacations-model"
import vacationsService from "./VacationsService"

class FilterVacationsService {
    public async sortByDate(): Promise<VacationModel[]> {
        const allVacations = await vacationsService.getAllVacations()
        const sortedVacations = allVacations.sort((a, b) => a.vacationStart.localeCompare(b.vacationStart))
        return sortedVacations
    }

    public async notyetStarted(): Promise<VacationModel[]> {
        const currentDate = new Date().toISOString().split("T")[0]

        const allVacations = await this.sortByDate()
        const notyetStarted = allVacations.filter(v => v.vacationStart >= currentDate)
        return notyetStarted
    }

    public async activeVacations(): Promise<VacationModel[]> {
        const currentDate = new Date().toISOString().split("T")[0]
        const allVacations = await this.sortByDate()
        const activeVacations = allVacations.filter(v => v.vacationStart <= currentDate && v.vacationEnd >= currentDate)
        return activeVacations
    }
}

const filterVacationsService = new FilterVacationsService()

export default filterVacationsService