import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/user-model";
import { authStore } from "../../../Redux/AuthState";

function Menu(): JSX.Element {
    
    const [user, setUser] = useState<UserModel>()

    useEffect(()=>{
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(()=>{
            setUser(authStore.getState().user)
        })
        return unsubscribe
    },[])
    
    return (
        <div className="Menu">
            			{
                !user &&
                <>
                    <span>Hello Guest</span>
                    <span> | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                </>
            }
            {
                user &&
                <>
                    <span>Hello {user.userFirstName}</span>
                    <span> | </span>
                    <NavLink to={"/profile/edit/" + user.userId}>Edit Profile</NavLink>
                    <span> | </span>
                    <NavLink to="/logout">Logout</NavLink>
                </>
            }
        </div>
    );
}

export default Menu;
