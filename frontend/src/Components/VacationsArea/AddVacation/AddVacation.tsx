import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationModel from "../../../Models/vacations-model";
import { useNavigate } from "react-router-dom";
import vacationsService from "../../../Services/VacationsService";

function AddVacation(): JSX.Element {
    const {register, handleSubmit} = useForm<VacationModel>()
    const navigate = useNavigate()

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
                <input type="text" {...register("vacationDestination")} />

                <label>Vacation Description</label>
                <textarea cols={30} rows={10} {...register("vacationDescription")}></textarea>

                <label>Start Date</label>
                <input type="date" {...register("vacationStart")}/>

                <label>End Date</label>
                <input type="date" {...register("vacationEnd")}/>

                <label>One Word Description</label>
                <input type="text" {...register("vacationOneLine")} />
                
                <label>Price</label>
                <input type="number" {...register("vacationPrice")} />

                <label>Image</label>
                <input type="file" />

                <button>Add</button>
            </form>
        </div>
    );
}

export default AddVacation;
