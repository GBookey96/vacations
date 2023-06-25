import "./Header.css";
import logo from "../../../assets/images/travelhub-logo.png"
import { NavLink } from "react-router-dom";

function Header(): JSX.Element {
    return (
        <div className="Header">
			<NavLink to="/home">
                <img src={logo}/>
            </NavLink>
        </div>
    );
}

export default Header;
