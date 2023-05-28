import "./PageNotFound.css";
import background from "../../../assets/pexels-ken-cheung-7459424.jpg"
import { NavLink } from "react-router-dom";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <img src={background} alt="" />
            <div className="TextOverlay">
                <h2>Oops!</h2>
                <h3>Looks like you've taken a detour to an undiscovered destination.</h3>
                <h3>Sit back, relax and let us naviagte you back to the amazing adventures that await.</h3>
                <h3>
                    <NavLink className="NavLink" to="/home">Home</NavLink>
                    <span> | </span>
                    <NavLink className="NavLink" to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink className="NavLink" to="/register">Register</NavLink></h3>
                <b>Rest assured, our team of seasoned exploreres is on the case, investigating this destination for you...</b>
            </div>
        </div>
    );
}

export default PageNotFound;
