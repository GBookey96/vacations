import { createStore } from 'redux';
import VacationModel from "../Models/vacations-model";


export class VacationsState {
    public vacations: VacationModel[] = []
}

export enum VacationsActionType {
    FetchVacations,
    AddVacations,
    UpdateVacations,
    DeleteVacations
}

export interface VacationsAction {
    type: VacationsActionType,
    payload?: any
}

export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {
    const newState = {...currentState}

    switch(action.type) {
        case VacationsActionType.FetchVacations:
            newState.vacations = action.payload
            break;

        case VacationsActionType.AddVacations:
            newState.vacations.push(action.payload)
            break;

        case VacationsActionType.UpdateVacations:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId)
            if(indexToUpdate >= 0) newState.vacations[indexToUpdate] = action.payload
            break;
        
        case VacationsActionType.DeleteVacations:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload)
            console.log(newState.vacations[indexToDelete])
            if(indexToDelete >= 0) newState.vacations.splice(indexToDelete, 1)
            break;
    }
    return newState
}

export const vacationsStore = createStore(vacationsReducer)