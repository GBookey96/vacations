import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/vacations-model";
import vacationsService from "../../../Services/VacationsService";
import VacationsCard from "../VacationsCard/VacationsCard";
import "./AllVacations.css";
import { useState, useEffect } from 'react';
import { authStore } from "../../../Redux/AuthState";
import Home from "../../HomeArea/Home/Home";

function AllVacations(): JSX.Element {

    const [allVacations, setAllVacations] = useState<VacationModel[]>([])
    const [vacationsFollowing, setVacationsFollowing] = useState<VacationModel[]>()
    const [notYetStarted, setNotYetStarted] = useState<VacationModel[]>()
    const [activeVacations, setActiveVacations] = useState<VacationModel[]>()
    const [showVacations, setShowVacations] = useState<VacationModel[]>()
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
            .then(vacations => sortVacationsByDate(vacations))
            .catch(err => console.log(err))
    },[])

    function sortVacationsByDate(vacations: VacationModel[]) {
        const sortedVacations = vacations.sort((a, b) => a.vacationStart.localeCompare(b.vacationStart))
        setAllVacations(sortedVacations)
        setShowVacations(sortedVacations)
    }

    function sortVacationsByFollowing() {

    }

    function showNotYetStartedVacations() {
        // let now = new Date()
        // const sortedVacations = allVacations.filter(v => v.vacationStart = now.getUTCDate().toString())
        // console.log(sortedVacations)
    }

    function showActiveVacations() {

    }

    return (
        <div className="AllVacations">
            {isLoggedIn && <>
            <div className="FilterOptions">
                <h3>Filter Options</h3>
                <button>Only show vacations you are following</button>
                <br />
                <button onClick={showNotYetStartedVacations}>Only show vacations that have not yet started</button>
                <br />
                <button>Only show active vacations</button>
            </div>
            <br />
            <div className="Vacations">
                {showVacations.map(v => <VacationsCard key={v.vacationId} vacation={v}/>)}
            </div>
            </>}
            {/* {!isLoggedIn && <>{navigate("/home")}</>} */}
            {!isLoggedIn && <Home />}
			
        </div>
    );
}

export default AllVacations;
