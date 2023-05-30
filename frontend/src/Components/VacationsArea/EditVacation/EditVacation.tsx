import "./EditVacation.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/vacations-model";
import vacationsService from "../../../Services/VacationsService";

function EditVacation(): JSX.Element {
    
    const {register, handleSubmit, setValue} = useForm<VacationModel>()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const navigate = useNavigate()
    const params = useParams()
    
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
        const id = +params.vacationId
        vacationsService.getOneVacation(id)
            .then(v => {
                setValue("vacationId", v.vacationId)
                setValue("vacationDestination", v.vacationDestination)
                setValue("vacationDescription", v.vacationDescription)
                setValue("vacationStart", new Date(v.vacationStart).toISOString().split("T")[0])
                setValue("vacationEnd", new Date(v.vacationEnd).toISOString().split("T")[0])
                setValue("vacationPrice", v.vacationPrice)
            })
            .catch(err => alert(err.message))
    },[])

    async function submit(vacation: VacationModel) {
        try {
            await vacationsService.updateVacation(vacation)
            alert("Vacation Updated Successfully")
            navigate("/home")
        }
        catch(err: any) {
            alert(err)
        }
    }

    return (
        <div className="EditVacation">
            <h2>Update Vacation</h2>
            <form onSubmit={handleSubmit(submit)}>

                <input type="hidden" {...register("vacationId")} />

                <label>Destination</label>
                <input type="text" {...register("vacationDestination")} autoFocus/>

                <label>Vacation Description</label>
                <textarea cols={30} rows={10} {...register("vacationDescription")}></textarea>

                <label>Start Date</label>
                <input type="date" min={new Date().toISOString().split("T")[0]} {...register("vacationStart")}/>

                <label>End Date</label>
                <input type="date" {...register("vacationEnd")}/>
                
                <label>Price</label>
                <input type="number" {...register("vacationPrice")}/>

                <label>Image</label>
                <input type="file" accept="image/*" {...register("vacationImg")}/>

                <button>Update</button>
            </form>
        </div>
    );
}

export default EditVacation;
