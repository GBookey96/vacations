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
                console.log(typeof v)
                setValue("vacationId", v.vacationId)
                setValue("vacationDestination", v.vacationDestination)
                setValue("vacationDescription", v.vacationDescription)
                setValue("vacationStart", v.vacationStart)
                setValue("vacationEnd", v.vacationEnd)
                setValue("vacationOneLine", v.vacationOneLine)
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
                <input type="text" {...register("vacationDestination")} required autoFocus/>

                <label>Vacation Description</label>
                <textarea cols={30} rows={10} {...register("vacationDescription")} required></textarea>

                <label>Start Date</label>
                <input type="date" {...register("vacationStart")} required/>

                <label>End Date</label>
                <input type="date" {...register("vacationEnd")} required/>

                <label>One Word Description</label>
                <input type="text" {...register("vacationOneLine")} required/>
                
                <label>Price</label>
                <input type="number" {...register("vacationPrice")} required/>

                <label>Image</label>
                <input type="file" {...register("vacationImg")}/>

                <button>Update</button>
            </form>
        </div>
    );
}

export default EditVacation;
