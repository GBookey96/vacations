import { NavLink } from "react-router-dom";
import "./Menu.css";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
            <span> | </span>
            <NavLink to="/list">List</NavLink>
            <span> | </span>
            <NavLink to="/insert">Insert</NavLink>
            <AuthMenu />
        </div>
    );
}

export default Menu;
