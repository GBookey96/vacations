import { useEffect, useState } from "react";
import "./VacationsReport.css";
import vacationsService from "../../../Services/VacationsService";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import VacationModel from "../../../Models/vacations-model";
import { vacationsStore } from "../../../Redux/VacationsState";
import { CSVLink } from "react-csv";

function VacationsReport(): JSX.Element {
    
    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(()=>{
        vacationsService.vacationsWithFollowerCount()
            .then(vacations => {
                // vacations.forEach(v => v.vacationDestination = v.vacationDestination.substring(0,10))
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

    

    const csvReport = {
        data: vacations,
        filename: 'vacationsReport.csv'
    }

    return (
        <div className="VacationsReport">
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
        </div>
    );
}

export default VacationsReport;
