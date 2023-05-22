import VacationModel from "../../../Models/vacations-model";
import "./AllVacations.css";
import { useState, useEffect } from 'react';

function AllVacations(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(()=>{
        
    },[])
    return (
        <div className="AllVacations">
			
        </div>
    );
}

export default AllVacations;
