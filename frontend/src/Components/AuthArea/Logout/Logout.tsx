import "./Logout.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";

function Logout(): JSX.Element {

    const navigate = useNavigate()
    useEffect(()=>{
        authService.logout()
        alert("Logout Successful")
        navigate("/home")
    },[])
    return null
}

export default Logout;
