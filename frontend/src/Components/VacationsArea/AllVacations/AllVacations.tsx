import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/vacations-model";
import vacationsService from "../../../Services/VacationsService";
import VacationsCard from "../VacationsCard/VacationsCard";
import "./AllVacations.css";
import { useState, useEffect } from 'react';



function AllVacations(): JSX.Element {

    const [allVacations, setAllVacations] = useState<VacationModel[]>([])
    const [showVacations, setShowVacations] = useState<VacationModel[]>([])
    const [vacationsFollowing, setVacationsFollowing] = useState<VacationModel[]>([])
    const [notYetStarted, setNotYetStarted] = useState<VacationModel[]>([])
    const [activeVacations, setActiveVacations] = useState<VacationModel[]>([])

    const navigate = useNavigate()

    useEffect(()=>{
        vacationsService.getAllVacations()
            .then(vacations => arrangeVacations(vacations))
            .catch(err => console.log(err))
    },[])

    function arrangeVacations(vacations: VacationModel[]) {

        const sortedVacations = vacations.sort((a, b) => a.vacationStart.localeCompare(b.vacationStart))

        setAllVacations(sortedVacations)
        setShowVacations(sortedVacations)
    
        // find vacations following
        setVacationsFollowing(sortedVacations)

        const currentDate = new Date().toISOString().split("T")[0]

        // find vacations not yet started
        const notYetStartedList = sortedVacations.filter(v => v.vacationStart >= currentDate)
        setNotYetStarted(notYetStartedList)
    
        // find active vacations
        const activeVacationsList = sortedVacations.filter(v => v.vacationStart <= currentDate && v.vacationEnd >= currentDate)
        setActiveVacations(activeVacationsList)
    }

    function showAll() {
        setShowVacations(allVacations)
    }

    function showOnlyFollowing() {
        setShowVacations(vacationsFollowing)
    }

    function showNotYetStartedVacations() {
        setShowVacations(notYetStarted)
    }

    function showActiveVacations() {

        setShowVacations(activeVacations)
    }

    return (
        <div className="AllVacations">
            <div className="FilterOptions">
                <h3>Filter Options</h3>
                <button onClick={showOnlyFollowing}>Only show vacations you are following</button>
                <br />
                <button onClick={showNotYetStartedVacations}>Only show vacations that have not yet started</button>
                <br />
                <button onClick={showActiveVacations}>Only show active vacations</button>
                <br />
                <button onClick={showAll}>Show All</button>
            </div>
            <br />
            <div className="Vacations">
                {showVacations.map(v => <VacationsCard key={v.vacationId} vacation={v}/>)}
            </div>
        </div>
    );
}

export default AllVacations;
