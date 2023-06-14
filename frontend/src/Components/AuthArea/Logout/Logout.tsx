import "./Logout.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function Logout(): JSX.Element {

    const navigate = useNavigate()
    useEffect(()=>{
        authService.logout()
        notifyService.success("Logout Successful")
        navigate("/home")
    },[])
    return null
}

export default Logout;
