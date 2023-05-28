import "./Header.css";
import logo from "../../../assets/travelhub-logo.png"
import Menu from "../Menu/Menu";

function Header(): JSX.Element {
    return (
        <div className="Header">
			<img src={logo}/>
        </div>
    );
}

export default Header;
