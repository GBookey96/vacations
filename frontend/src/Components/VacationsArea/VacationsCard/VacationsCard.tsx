import VacationModel from "../../../Models/vacations-model";
import "./VacationsCard.css";
import logo from "../../../assets/Rome-Inside-the-Colosseum-or-Coliseum-in-summer.jpg"
import { useEffect, useState } from "react";
import vacationsService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/config";

interface VacationsCardProps {
	vacation: VacationModel,
}

function VacationsCard(props: VacationsCardProps): JSX.Element {

    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    const [followerCount, setFollowerCount] = useState<number>(0)

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
        const date = new Date(inputDate)
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }
        return date.toLocaleDateString('en-GB', options)
    }
    
    return (
        <div className="VacationsCard">
            <button onClick={follow} className="Like">
                {isFollowing && <><span className="Liked">❤</span></>}
                {!isFollowing && <>🤍</>}
                <span> {followerCount}</span>
            </button>
            <h2 className="destination">{props.vacation.vacationDestination}</h2>
            <p className="OneLine">{props.vacation.vacationOneLine}</p>
            <img src={appConfig.vacationImgUrl + props.vacation.vacationImgName} alt="Vacation Image" className="Image" />
            <p className="Dates">{formatDate(props.vacation.vacationStart)} - {formatDate(props.vacation.vacationEnd)}</p>
            <p className="Description">{props.vacation.vacationDescription}</p>
            <h3 className="Price">${props.vacation.vacationPrice}</h3>
        </div>
    );
}

export default VacationsCard;
