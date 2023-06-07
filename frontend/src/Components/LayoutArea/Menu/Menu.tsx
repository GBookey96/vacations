import "./Menu.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import UserModel from "../../../Models/user-model";


function Menu(): JSX.Element {
    
    const [user, setUser] = useState<UserModel>()
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(()=>{
        let user = authStore.getState().user
        setUser(user);
        setIsAdmin(user?.userRole === "Admin" ? true : false)
        const unsubscribe = authStore.subscribe(()=>{
            user = authStore.getState().user
            setUser(user)
            setIsAdmin(user?.userRole === "Admin" ? true : false)
        })
        return unsubscribe
    },[])
    
    return (
        <div className="Menu">

            {!user &&
                <>
                    <span>Hello Guest</span>
                    <span> | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                </>
            }
            {user &&
                <>
                    <span>Hello {user.userFirstName} {user.userLastName}</span>
                    <span> | </span>
                    <NavLink to="/home">Home</NavLink>
                    <span> | </span>
                    <NavLink to={"/profile/edit/" + user.userId}>Edit Profile</NavLink>
                    <span> | </span>
                    <NavLink to="/logout">Logout</NavLink>
                </>
            }
            {isAdmin &&
                <> 
                    <span> | </span>
                    <NavLink to="/vacations-report">Vacations Report</NavLink>
                </>
            }
        </div>
    );
}

export default Menu;
