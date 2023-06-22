import "./VacationsReport.css";
import { useEffect, useState } from "react";
import vacationsService from "../../../Services/VacationsService";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import VacationModel from "../../../Models/vacations-model";
import { vacationsStore } from "../../../Redux/VacationsState";
import { CSVLink } from "react-csv";
import { authStore } from "../../../Redux/AuthState";
import AdminOnly from "../../AuthArea/AdminOnly/AdminOnly";

function VacationsReport(): JSX.Element {
    
    const [vacations, setVacations] = useState<VacationModel[]>([])
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    
    useEffect(()=>{
        vacationsService.vacationsWithFollowerCount()
            .then(vacations => {
                setVacations(vacations)
            })
            .catch(err => console.log(err))

            const unsubscribe = vacationsStore.subscribe(()=>{
                const vacations = vacationsStore.getState().vacations
                vacations.forEach(v => v.vacationDestination = v.vacationDestination.substring(0,10))
                setVacations(vacations)
            })
            return ()=> unsubscribe()
    },[])

    useEffect(()=>{
        let user = authStore.getState().user
        let userRole = user?.userRole
        if(user && userRole === "Admin") setIsAdmin(true)
        const unsubscribe = authStore.subscribe(()=>{
            userRole = authStore.getState().user.userRole
            userRole === "Admin" ? setIsAdmin(true) : setIsAdmin(false)
        })
        return unsubscribe
    },[])
    
    const csvReport = {
        data: vacations,
        filename: 'vacationsReport.csv'
    }

    return (
        <div className="VacationsReport">
            {isAdmin && <>
                <h2>Vacations Report</h2>
                <div className="BarChartContainer">
                    <BarChart width={1450} height={300} data={vacations}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="vacationDestination" />
                        <YAxis/>
                        <Bar dataKey="followerCount" fill="#374151" />
                    </BarChart>
                </div>

                <CSVLink {...csvReport}><h3>Export Vacations Report Data</h3></CSVLink>
            </>}
            {!isAdmin && <AdminOnly />}
        </div>
    );
}

export default VacationsReport;
