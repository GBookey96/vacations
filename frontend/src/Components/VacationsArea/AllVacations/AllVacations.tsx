import "./AllVacations.css";
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import { vacationsStore } from "../../../Redux/VacationsState";
import VacationModel from "../../../Models/vacations-model";
import vacationsService from "../../../Services/VacationsService";
import VacationsCard from "../VacationsCard/VacationsCard";

function AllVacations(): JSX.Element {
    const [allVacations, setAllVacations] = useState<VacationModel[]>([])
    const [showVacations, setShowVacations] = useState<VacationModel[]>([])
    const [vacationsFollowing, setVacationsFollowing] = useState<VacationModel[]>([])
    const [notYetStarted, setNotYetStarted] = useState<VacationModel[]>([])
    const [activeVacations, setActiveVacations] = useState<VacationModel[]>([])
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    // brings all vacations from backend
    useEffect(()=>{
        vacationsService.getAllVacations()
            .then(vacations => {
                arrangeVacations(vacations)
            })
            .catch(err => console.log(err))

        const unsubscribe = vacationsStore.subscribe(()=>{
            const vacations = vacationsStore.getState().vacations
            arrangeVacations(vacations)
        })
        return unsubscribe
    },[])

    function arrangeVacations(vacations: VacationModel[]) {
        
        // sort all vacations by date
        const sortedVacations = vacations.sort((a, b) => a.vacationStart.localeCompare(b.vacationStart))
        
        setAllVacations(sortedVacations)
        setShowVacations(sortedVacations)
    
        // find vacations following
        setVacationsFollowing([])

        const currentDate = new Date().toISOString().split("T")[0]

        // find vacations not yet started
        const notYetStartedList = sortedVacations.filter(v => v.vacationStart >= currentDate)
        setNotYetStarted(notYetStartedList)
    
        // find active vacations
        const activeVacationsList = sortedVacations.filter(v => v.vacationStart <= currentDate && v.vacationEnd >= currentDate)
        setActiveVacations(activeVacationsList)
    }

    function showAll() {setShowVacations(allVacations)}

    function showOnlyFollowing() {setShowVacations(vacationsFollowing)}

    function showNotYetStartedVacations() {setShowVacations(notYetStarted)}

    function showActiveVacations() {setShowVacations(activeVacations)}

    // checks if user is admin or not, to decide which elements to show
    useEffect(()=>{
        let userRole = authStore.getState().user.userRole
        if(userRole === "Admin") setIsAdmin(true)
        const unsubscribe = authStore.subscribe(()=>{
            userRole = authStore.getState().user.userRole
            userRole === "Admin" ? setIsAdmin(true) : setIsAdmin(false)
        })
        return unsubscribe
    },[])
    
    return (
        <div className="AllVacations">

            {isAdmin && <NavLink to="/add-vacation">Add New Vacation</NavLink>}
            {!isAdmin && <>
            <div className="FilterOptions">
                <h3>Filters</h3>
                <button onClick={showOnlyFollowing}>Vacations you are following</button>
                <br />
                <button onClick={showNotYetStartedVacations}>Vacations that have not yet started</button>
                <br />
                <button onClick={showActiveVacations}>Active vacations</button>
                <br />
                <button onClick={showAll}>Show All</button>
            </div>
            </>}
            
            <br />
            <div className="Vacations">
                {showVacations.map(v => <VacationsCard key={v.vacationId} vacation={v}/>)}
            </div>
        </div>
    );
}

export default AllVacations;