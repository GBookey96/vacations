import "./VacationsCard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/vacations-model";
import appConfig from "../../../Utils/config";
import { authStore } from "../../../Redux/AuthState";

interface VacationsCardProps {
	vacation: VacationModel,
}

function VacationsCard(props: VacationsCardProps): JSX.Element {

    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    const [followerCount, setFollowerCount] = useState<number>(0)
    const [isAdmin, setIsAdmin] = useState<boolean>()

    const navigate = useNavigate()

    function follow() {
        if(isFollowing) {
            setIsFollowing(false)
            setFollowerCount(followerCount - 1)
        }
        if(!isFollowing) {
            setIsFollowing(true)
            setFollowerCount(followerCount + 1)
        }
    }

    function formatDate(inputDate: string): string {
        const date = new Date(inputDate).toLocaleDateString().split("T")[0]
        return date
    }

    useEffect(()=>{
        let userRole = authStore.getState().user.userRole
        if(userRole === "Admin") setIsAdmin(true)
        const unsubscribe = authStore.subscribe(()=>{
            userRole = authStore.getState().user.userRole
            userRole === "Admin" ? setIsAdmin(true) : setIsAdmin(false)
        })
        return unsubscribe
    },[])
    
    return (
        <div className="VacationsCard">
            <div className="TopSection">
                {isAdmin && <button onClick={()=>navigate("/vacation/edit/" + props.vacation.vacationId)} className="EditVacationButton">Edit</button>}
                <h2 className="Destination">{props.vacation.vacationDestination}</h2>
                <div onClick={follow} className="Like">
                    {isFollowing && <><span className="Liked">❤</span></>}
                    {!isFollowing && <>🤍</>}
                    <span> {followerCount}</span>
                </div>
            </div>
            <p className="OneLine">{props.vacation.vacationOneLine}</p>
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
