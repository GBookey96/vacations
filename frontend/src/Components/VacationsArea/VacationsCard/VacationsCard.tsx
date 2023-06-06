import "./VacationsCard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/vacations-model";
import appConfig from "../../../Utils/config";
import { authStore } from "../../../Redux/AuthState";
import vacationsService from "../../../Services/VacationsService";
import LikeButton from "./LikeButton/LikeButton";


interface VacationsCardProps {
	vacation: VacationModel,
}

function VacationsCard(props: VacationsCardProps): JSX.Element {
    const [userId, setUserId] = useState<number>()
    const [isAdmin, setIsAdmin] = useState<boolean>()

    const navigate = useNavigate()

    useEffect(()=>{

    },[])

    function formatDate(inputDate: string): string {
        let date = new Date(inputDate).toDateString()
        date = date.substring(4)
        return date
    }

    useEffect(()=>{
        let user = authStore.getState().user
        if(user.userRole === "Admin") setIsAdmin(true)
        setUserId(user.userId)
        const unsubscribe = authStore.subscribe(()=>{
            user = authStore.getState().user
            setUserId(user.userId)
            user.userRole === "Admin" ? setIsAdmin(true) : setIsAdmin(false)
        })
        return unsubscribe
    },[])

    const [showModal, setShowModal] = useState<boolean>(false)
    function toggleDeleteModal() {
        setShowModal(!showModal)
    }

    async function deleteVacation(id: number) {
        await vacationsService.deleteVacation(id)
        alert("Vacation has been deleted!")
    }
    
    return (
        <div className="VacationsCard">
            <div className="TopSection">
                {isAdmin && <button onClick={()=>navigate("/vacation/edit/" + props.vacation.vacationId)} className="Button">Edit</button>}
                {isAdmin && <button onClick={()=>toggleDeleteModal()} className="Button">Delete</button>}
                <h2 className="Destination">{props.vacation.vacationDestination}</h2>
                {showModal && <>
                <div className="ConfirmDeleteModal" onClick={toggleDeleteModal}>
                    <p>Are you sure you want to delete this vacation?</p>
                    <p>This action is irreversible?</p>
                    <button className="Button" onClick={()=>deleteVacation(props.vacation.vacationId)}>Confirm</button>
                    <button className="Button" onClick={toggleDeleteModal}>Cancel</button>
                </div>
                </>}
                {!isAdmin && <>
                    <LikeButton key={userId} userId={userId} vacationId={props.vacation.vacationId}/>
                </>}
            </div>
            <img src={appConfig.vacationImgUrl + props.vacation.vacationImgName} alt="Vacation Image" className="Image" />
            <p className="Dates">{formatDate(props.vacation.vacationStart)} ➡ {formatDate(props.vacation.vacationEnd)}</p>
            <p className="Description">{props.vacation.vacationDescription}</p>
            <div className="PriceContainer">
                <h3 className="Price">${props.vacation.vacationPrice}</h3>
            </div>
        </div>

    );
}

export default VacationsCard;
