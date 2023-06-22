import "./AdminOnly.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import { subscribe } from "diagnostics_channel";

function AdminOnly(): JSX.Element {

    const [userName, setUserName] = useState<string>("Guest")

    useEffect(()=>{
        let user = authStore.getState().user
        let userName = user?.userFirstName
        if(user) setUserName(userName)
        const unsubscribe = authStore.subscribe(()=>{
            user = authStore.getState().user
            userName = user?.userFirstName
            user ? setUserName(userName) : setUserName("Guest")

        })
        return ()=> unsubscribe()
    },[])
    return (
        <div className="AdminOnly">
                    <p>Dear {userName},</p>
                    <p>This page is exclusively for administrators. Please navigate back to our homepage to explore our incredible vacation packages. At TravelHub, we curate unforgettable experiences, offering the finest destinations, accommodations, and activities. We can't wait to welcome you on your dream vacation!</p>
                    <p>Click <NavLink to="/home">here</NavLink> to return to the homepage and start planning your next adventure with us.</p>
                    <p>Thank you for understanding and we look forward to welcoming you on your dream vacation!</p>
                    <p>Best regards,</p>
                    <p>TravelHub</p>
        </div>
    );
}

export default AdminOnly;
