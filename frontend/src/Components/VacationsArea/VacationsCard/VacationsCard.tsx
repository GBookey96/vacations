import VacationModel from "../../../Models/vacations-model";
import "./VacationsCard.css";
import logo from "../../../assets/Rome-Inside-the-Colosseum-or-Coliseum-in-summer.jpg"
import { useState } from "react";

interface VacationsCardProps {
	vacation: VacationModel,
}

function VacationsCard(props: VacationsCardProps): JSX.Element {

    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    const [followerCount, setFollowerCount] = useState<number>(0)
    const [img, setImg] = useState<any>()

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

    return (
        <div className="VacationsCard">
            <button onClick={follow} className="Like">
                {isFollowing && <><span className="Liked">❤</span></>}
                {!isFollowing && <>🤍</>}
                <span> {followerCount}</span>
            </button>
            <h2 className="destination">{props.vacation.vacationDestination}</h2>
            <p className="OneLine">{props.vacation.vacationOneLine}</p>
            <img src={logo} alt="Vacation Image" className="Image" />
            <p className="Dates">{props.vacation.vacationStart} - {props.vacation.vacationEnd}</p>
            <p className="Description">{props.vacation.vacationDescription}</p>
            <p className="Price">${props.vacation.vacationPrice}</p>
        </div>
    );
}

export default VacationsCard;
