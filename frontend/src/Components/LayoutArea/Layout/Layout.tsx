import "./Layout.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <Header />

			<Menu />

            <Routing />
            <Footer />
        </div>
    );
}

export default Layout;
