import "./Home.css";
import { NavLink, useNavigate } from "react-router-dom";
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
            <div className="Container">
                <h1>Welcome to Your Dream Vacation!</h1>
                <p className="Description">Discover the world with our all-inclusive package vacations to diverse destinations around the globe.
                    Skip the hassle of arranging accommodations, activities, and services separately—we've got you covered.</p>
                <p className="Description">Whether you're dreaming of sandy beaches, vibrant cities, or breathtaking landscapes, our carefully curated packages offer the perfect escape.
                    From tropical paradises to cultural hotspots, our vacations ensure you can relax and enjoy every moment.</p>
                <p className="Description">Picture yourself lounging by the pool, exploring local attractions, and immersing yourself in new experiences, all without the stress of planning.
                    Start your adventure today and let us handle the details while you create lifelong memories.</p>
                <p className="Note">Please note that our packages do not include flights to and from the vacation, allowing you the flexibility to choose your preferred travel arrangements.</p>
            </div>

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
