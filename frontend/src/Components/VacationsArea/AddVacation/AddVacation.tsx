import "./AddVacation.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import vacationsService from "../../../Services/VacationsService";
import VacationModel from "../../../Models/vacations-model";
import AdminOnly from "../../AuthArea/AdminOnly/AdminOnly";

function AddVacation(): JSX.Element {
    const {register, handleSubmit} = useForm<VacationModel>()
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const navigate = useNavigate()

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
        <div>

            {isAdmin && <>
                <div className="AddVacation">
                
                    <h2>Add Vacation</h2>

                    <form onSubmit={handleSubmit(submit)}>

                        <label>Destination</label>
                        <input type="text" maxLength={30} {...register("vacationDestination")} placeholder="Enter Destination name" />

                        <label>Vacation Description</label>
                        <textarea cols={30} rows={10} maxLength={1000} {...register("vacationDescription")} placeholder="Provide a description of the vacation in less than 1000 characters"></textarea>

                        <label>Start Date</label>
                        <input type="date" id="start" min={new Date().toISOString().split("T")[0]} {...register("vacationStart")}/>

                        <label>End Date</label>
                        <input type="date" id="end" {...register("vacationEnd")}/>
                        
                        <label>Price</label>
                        <input type="number" {...register("vacationPrice")} placeholder="Enter Price"/>

                        <label>Image</label>
                        <input type="file" accept="image/*" {...register("vacationImg")} />

                        <button>Add</button>
                    </form>
                </div>
            </>}
            {!isAdmin && <AdminOnly />}
        </div>
    );
}

export default AddVacation;
