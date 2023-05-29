import "./Routing.css";
import { Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import EditUser from "../../AuthArea/EditUser/EditUser";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/home" element={<Home />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile/edit/:userId" element={<EditUser />} />

                <Route path="/add-vacation" element={<AddVacation />} />
                <Route path="/vacation/edit/:vacationId" element={<EditVacation />} />

                <Route path="/" element={<Home />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;