import { useEffect, useState } from "react";
import "./VacationsReport.css";
import vacationsService from "../../../Services/VacationsService";
import followerService from "../../../Services/FollowerService";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import VacationModel from "../../../Models/vacations-model";
import { vacationsStore } from "../../../Redux/VacationsState";

function VacationsReport(): JSX.Element {
    
    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(()=>{
        vacationsService.getAllVacations()
            .then(vacations => {
                vacations.forEach(v => v.vacationDestination = v.vacationDestination.substring(0,10))
                setVacations(vacations)
            })
            .catch(err => console.log(err))

            const unsubscribe = vacationsStore.subscribe(()=>{
                const vacations = vacationsStore.getState().vacations
                vacations.forEach(v => v.vacationDestination = v.vacationDestination.substring(0,10))
                setVacations(vacations)
            })
            return unsubscribe
    },[])

    return (
        <div className="VacationsReport">
			<h2>Vacations Report</h2>
            <div className="BarChartContainer">
                <BarChart width={1200} height={300} data={vacations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vacationDestination" />
                    <YAxis/>
                    <Bar dataKey="followerCount" fill="#374151" />
                </BarChart>
            </div>
        </div>
    );
}

export default VacationsReport;
