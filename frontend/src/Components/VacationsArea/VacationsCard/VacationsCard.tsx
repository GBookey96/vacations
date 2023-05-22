import VacationModel from "../../../Models/vacations-model";
import "./VacationsCard.css";
import logo from "../../../assets/travelhub-logo.png"

interface VacationsCardProps {
	vacation: VacationModel
}

function VacationsCard(props: VacationsCardProps): JSX.Element {
    
    return (
        <div className="VacationsCard">
            <h2 className="destination">{props.vacation.vacationDestination}</h2>
            <p className="OneLine">{props.vacation.vacationOneLine}</p>
            <img src={logo} alt="Vacation Image" className="Image" />
            <p className="Dates">{props.vacation.vacationStart} - {props.vacation.vacationEnd}</p>
            <p className="Description">{props.vacation.vacationDescription}</p>
            <p className="Price">{props.vacation.vacationPrice}</p>
        </div>
    );
}

export default VacationsCard;
