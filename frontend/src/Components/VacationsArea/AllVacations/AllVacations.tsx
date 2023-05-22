import VacationModel from "../../../Models/vacations-model";
import vacationsService from "../../../Services/VacationsService";
import VacationsCard from "../VacationsCard/VacationsCard";
import "./AllVacations.css";
import { useState, useEffect } from 'react';

function AllVacations(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(()=>{
        vacationsService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => alert(err))
    },[])
    return (
        <div className="AllVacations">
			{vacations.map(v => <VacationsCard key={v.vacationId} vacation={v} />)}
        </div>
    );
}

export default AllVacations;
