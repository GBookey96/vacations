import "./AllVacations.css";
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import { vacationsStore } from "../../../Redux/VacationsState";
import VacationModel from "../../../Models/vacations-model";
import VacationsCard from "../VacationsCard/VacationsCard";
import filterVacationsService from "../../../Services/FilterVacationService";
import vacationsService from "../../../Services/VacationsService";
import NoVacations from './../NoVacations/NoVacations';

function AllVacations(): JSX.Element {
    const [allVacations, setAllVacations] = useState<VacationModel[]>([])
    const [showVacations, setShowVacations] = useState<VacationModel[]>([])
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [userId, setUserId] = useState<number>()

    const navigate = useNavigate()

    useEffect(()=>{
        let user = authStore.getState().user
        if(user.userRole === "Admin") setIsAdmin(true)
        setUserId(user.userId)
        const unsubscribe = authStore.subscribe(()=>{
            user = authStore.getState().user
            setUserId(user.userId)
            user.userRole === "Admin" ? setIsAdmin(true) : setIsAdmin(false)
        })
        return () => unsubscribe()
    },[])

    useEffect(()=>{
        
        vacationsService.getAllVacations().then().catch()
        setAllVacations(vacationsStore.getState().vacations)
        const unsubscribe = vacationsStore.subscribe(()=>{
            setAllVacations(vacationsStore.getState().vacations)
        })
        return () => unsubscribe()
    },[])


    async function showAll() {
        const allVacations = await vacationsService.getAllVacations()
        setAllVacations(allVacations)
    }

    async function showOnlyFollowing() {
        const vacationsFollowing = await filterVacationsService.followedVacations(userId)
        setAllVacations(vacationsFollowing)
    }

    async function showNotYetStartedVacations() {
        const notYetStarted = await filterVacationsService.notyetStarted()
        setAllVacations(notYetStarted)
    }

    async function showActiveVacations() {
        const activeVacations = await filterVacationsService.activeVacations()
        setAllVacations(activeVacations)
    }

    // pagination functions
    const [currentPage, setCurrentPage] = useState<number>(1)
    const vacationsPerPage = 9
    const lastVacationIndex = currentPage * vacationsPerPage
    const firstVacationIndex = lastVacationIndex - vacationsPerPage
    const totalPages = Math.ceil(allVacations.length/vacationsPerPage)

    let pages = []
    for(let i = 1; i <= totalPages; i++) pages.push(i)
                    
    useEffect(()=>{
        const vacationsForThisPage = allVacations.slice(firstVacationIndex, lastVacationIndex)
        setShowVacations(vacationsForThisPage)        
    },[allVacations, firstVacationIndex, lastVacationIndex])

    function addNewVacation() {
        navigate("/add-vacation")
    }
    

    return (
        <div className="AllVacations">
            <div className="FilterOptions">
                <h3>Filters</h3>
                <button onClick={showAll}>Show All</button>
                <br />
                {!isAdmin && <>
                    <button onClick={showOnlyFollowing}>Vacations you are following</button>
                    <br />
                </>}
                <button onClick={showNotYetStartedVacations}>Vacations that have not yet started</button>
                <br />
                <button onClick={showActiveVacations}>Active vacations</button>
            </div>
            {isAdmin && <>
                <button className="AddNew" onClick={addNewVacation}>
                    Add New Vacation
                </button>
            </>}
            {pages.length > 1 && <>
                <div className="Pagination">
                <button onClick={()=>{setCurrentPage(1)}}>First</button>
                {pages.map(p => <button key={p} onClick={()=>setCurrentPage(p)}>{p}</button>)}
                <button onClick={()=>{setCurrentPage(totalPages)}}>Last</button>
            </div>
            <br />
            </>}
            <div className="Vacations">
                {showVacations.map(v => <VacationsCard key={v.vacationId} vacation={v} />)}
            </div>
            {pages.length > 1 && <>
                <div className="Pagination">
                <button onClick={()=>{setCurrentPage(1)}}>First</button>
                {pages.map(p => <button key={p} onClick={()=>setCurrentPage(p)}>{p}</button>)}
                <button onClick={()=>{setCurrentPage(totalPages)}}>Last</button>
            </div>
            <br />
            </>}
            {showVacations.length === 0 && <>
            <NoVacations/>
            </>}
        </div>
    );
}

export default AllVacations;