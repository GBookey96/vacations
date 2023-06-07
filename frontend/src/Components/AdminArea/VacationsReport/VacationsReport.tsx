import { useEffect, useState } from "react";
import "./VacationsReport.css";
import vacationsService from "../../../Services/VacationsService";
import followerService from "../../../Services/FollowerService";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

function VacationsReport(): JSX.Element {
    
    // const [listOfVacations, setListOfVacations] = useState<[]>([])
    // const [vacationsWithFollowers, setVacationsWithFollowers] = useState<[]>([])

    // useEffect(()=>{
    //     // vacationsService.listOfVacationsWithFollowerCount()
    //     //     .then(vacations => {
    //     //         setListOfVacations(vacations)
    //     //         console.log(vacations)
    //     //     })
    //     //     .catch(err => console.log(err))
    // },[])

    return (
        <div className="VacationsReport">
			<h2>Vacations Report</h2>
            {/* <BarChart width={1500} height={250} data={listOfVacations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vacationDestination" />
                <YAxis dataKey="followerCount"/>
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
            </BarChart> */}
        </div>
    );
}

export default VacationsReport;
