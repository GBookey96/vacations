import "./Header.css";
import logo from "../../../assets/images/travelhub-logo.png"

function Header(): JSX.Element {
    return (
        <div className="Header">
			<img src={logo}/>
        </div>
    );
}

export default Header;
