import "./AddVacation.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import vacationsService from "../../../Services/VacationsService";
import VacationModel from "../../../Models/vacations-model";
import AdminOnly from "../../AuthArea/AdminOnly/AdminOnly";
import notifyService from "../../../Services/NotifyService";

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
        return ()=> unsubscribe()
    },[])

    async function submit(vacation: VacationModel) {
        try {
            await vacationsService.addVacations(vacation)
            notifyService.success("Vacation Added")
            navigate("/home")
        }
        catch(err: any) {
            notifyService.error(err)
        }
    }

    return (
        <div>

            {isAdmin && <>
                <div className="AddVacation">
                
                    <h2>Add Vacation</h2>

                    <form onSubmit={handleSubmit(submit)}>

                        <label>Destination<span className="Required">*</span></label>
                        <input type="text" minLength={3} maxLength={30} {...register("vacationDestination")} placeholder="Enter Destination name" autoFocus/>

                        <label>Vacation Description<span className="Required">*</span></label>
                        <textarea cols={30} rows={10} minLength={100} maxLength={1000} {...register("vacationDescription")} placeholder="Provide a description of the vacation in less than 1000 characters"></textarea>

                        <label>Start Date<span className="Required">*</span></label>
                        <input type="date" id="start" {...register("vacationStart")}/>

                        <label>End Date<span className="Required">*</span></label>
                        <input type="date" id="end" {...register("vacationEnd")}/>
                        
                        <label>Price<span className="Required">*</span></label>
                        <input type="number" min={0} max={10000} {...register("vacationPrice")} placeholder="Enter Price"/>

                        <label>Image<span className="Required">*</span></label>
                        <input type="file" accept="image/*" {...register("vacationImg")} />

                        <button>Add</button>
                        <small className="Required">* required fields</small>

                    </form>
                </div>
            </>}
            {!isAdmin && <AdminOnly />}
        </div>
    );
}

export default AddVacation;
