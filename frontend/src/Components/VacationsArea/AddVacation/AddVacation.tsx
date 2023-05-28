import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationModel from "../../../Models/vacations-model";
import { useNavigate } from "react-router-dom";
import vacationsService from "../../../Services/VacationsService";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";

function AddVacation(): JSX.Element {
    const {register, handleSubmit} = useForm<VacationModel>()
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

    async function submit(vacation: VacationModel) {
        try {
            await vacationsService.addVacations(vacation)
            alert("Vacation Added")
            navigate("/home")
        }
        catch(err: any) {
            alert(err)
        }
    }

    return (
        <div className="AddVacation">
            <h2>Add Vacation</h2>
            <form onSubmit={handleSubmit(submit)}>
                <label>Destination</label>
                <input type="text" maxLength={30} {...register("vacationDestination")} placeholder="Enter Destination name" />

                <label>Vacation Description</label>
                <textarea cols={30} rows={10} maxLength={1000} {...register("vacationDescription")} placeholder="Provide a description of the vacation in less than 1000 characters"></textarea>

                <label>Start Date</label>
                <input type="date" {...register("vacationStart")}/>

                <label>End Date</label>
                <input type="date" {...register("vacationEnd")}/>

                <label>One Word Description</label>
                <input type="text" {...register("vacationOneLine")} placeholder="One-word description"/>
                
                <label>Price</label>
                <input type="number" {...register("vacationPrice")} placeholder="Enter Price"/>

                <label>Image</label>
                <input type="file" accept="image/*" {...register("vacationImg")} />

                <button>Add</button>
            </form>
        </div>
    );
}

export default AddVacation;
