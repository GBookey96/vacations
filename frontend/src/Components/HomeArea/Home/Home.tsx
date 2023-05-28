import { NavLink, useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import AllVacations from "../../VacationsArea/AllVacations/AllVacations";

function Home(): JSX.Element {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const navigate = useNavigate()
    useEffect(()=>{
        let user = authStore.getState().user
        if(user) setIsLoggedIn(true)
        const unsubscribe = authStore.subscribe(()=>{
            user = authStore.getState().user
            user ? setIsLoggedIn(true) : setIsLoggedIn(false)
        })
        return unsubscribe
    },[])

    return (
        <div className="Home">
			{isLoggedIn &&
            <>
            <AllVacations />
            </>}
            {!isLoggedIn && 
            <>
            <h3>To unlock a treasure trove of inspiring experiences,
                <br />
                we encourage you to <NavLink to="/register">create an account</NavLink> or <NavLink to="/login">sign in</NavLink>
                <br /> 
                granting you privileged access to our captivating content.</h3>
            </>}
            
        </div>
    );
}

export default Home;
