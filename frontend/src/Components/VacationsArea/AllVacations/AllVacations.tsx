import "./AllVacations.css";
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import { vacationsStore } from "../../../Redux/VacationsState";
import VacationModel from "../../../Models/vacations-model";
import VacationsCard from "../VacationsCard/VacationsCard";
import filterVacationsService from "../../../Services/FilterVacationService";
import FollowersModel from "../../../Models/follower-model";

function AllVacations(): JSX.Element {
    const [allVacations, setAllVacations] = useState<VacationModel[]>([])
    const [showVacations, setShowVacations] = useState<VacationModel[]>([])
    const [vacationsFollowing, setVacationsFollowing] = useState<FollowersModel[]>([])
    const [notYetStarted, setNotYetStarted] = useState<VacationModel[]>([])
    const [activeVacations, setActiveVacations] = useState<VacationModel[]>([])
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [userId, setUserId] = useState<number>()

    // brings all vacations from backend
    useEffect(()=>{
        filterVacationsService.sortByDate()
            .then(vacations => {
                setAllVacations(vacations)
                setShowVacations(vacations)
            })
            .catch(err => console.log(err))

        filterVacationsService.notyetStarted()
            .then(vacations => setNotYetStarted(vacations))
            .catch(err => console.log(err))

        filterVacationsService.activeVacations()
            .then(vacations => setActiveVacations(vacations))
            .catch(err => console.log(err))

        const unsubscribe = vacationsStore.subscribe(()=>{
            const vacations = vacationsStore.getState().vacations
            setAllVacations(vacations)
            setShowVacations(vacations)
        })
        return unsubscribe
    },[])

    
    useEffect(()=>{
        let user = authStore.getState().user
        if(user.userRole === "Admin") setIsAdmin(true)
        setUserId(user.userId)

        const unsubscribe = authStore.subscribe(()=>{
            user = authStore.getState().user
            setUserId(user.userId)
            user.userRole === "Admin" ? setIsAdmin(true) : setIsAdmin(false)
        })
        return unsubscribe
    },[])


    function showAll() {setShowVacations(allVacations)}

    function showOnlyFollowing() {
        // setShowVacations(vacationsFollowing)
    }

    function showNotYetStartedVacations() {setShowVacations(notYetStarted)}

    function showActiveVacations() {setShowVacations(activeVacations)}

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
                {showVacations.map(v => <VacationsCard key={v.vacationId} vacation={v} />)}
            </div>
        </div>
    );
}

export default AllVacations;