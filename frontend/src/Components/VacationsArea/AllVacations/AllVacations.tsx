import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/vacations-model";
import vacationsService from "../../../Services/VacationsService";
import VacationsCard from "../VacationsCard/VacationsCard";
import "./AllVacations.css";
import { useState, useEffect } from 'react';
import { authStore } from "../../../Redux/AuthState";

function AllVacations(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([])
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(()=>{
        let user = authStore.getState().user
        if(user) setIsLoggedIn(true)
        const unsubscribe = authStore.subscribe(()=>{
            user = authStore.getState().user
            user ? setIsLoggedIn(true) : setIsLoggedIn(false)
        })
        return unsubscribe
    },[])

    useEffect(()=>{
        vacationsService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => alert(err))
    },[])

    return (
        <div className="AllVacations">
            {isLoggedIn && <>{vacations.map(v => <VacationsCard key={v.vacationId} vacation={v}/>)}</>}
            {!isLoggedIn && <>{navigate("/home")}</>}
			
        </div>
    );
}

export default AllVacations;
