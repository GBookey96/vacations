import "./EditVacation.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import { useForm } from "react-hook-form";
import VacationModel from "../../../Models/vacations-model";
import vacationsService from "../../../Services/VacationsService";
import AdminOnly from "../../AuthArea/AdminOnly/AdminOnly";

function EditVacation(): JSX.Element {
    
    const {register, handleSubmit, setValue} = useForm<VacationModel>()
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [rerender, setRerender] = useState<boolean>(false)

    const navigate = useNavigate()
    const params = useParams()
    
    useEffect(()=>{
        let user = authStore.getState().user
        let userRole = user?.userRole
        if(user && userRole === "Admin") setIsAdmin(true)
        const unsubscribe = authStore.subscribe(()=>{
            user = authStore.getState().user
            userRole = user?.userRole
            userRole === "Admin" ? setIsAdmin(true) : setIsAdmin(false)
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
            setRerender(!rerender)
            navigate("/home")
        }
        catch(err: any) {
            alert(err)
        }
    }

    return (
        <div>
            {isAdmin && <>
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
            </>}
            {!isAdmin && <>
                <AdminOnly />
            </>}
        
        </div>
    );
}

export default EditVacation;
