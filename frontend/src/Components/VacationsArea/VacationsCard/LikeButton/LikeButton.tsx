import FollowersModel from "../../../../Models/follower-model";
import followerService from "../../../../Services/FollowerService";
import "./LikeButton.css";
import { useState, useEffect } from 'react';

interface LikeButtonProps {
	userId: number,
    vacationId: number,
    followerCount: number,
}

function LikeButton(props: LikeButtonProps): JSX.Element {
    
    const [isFollowing, setIsFollowing] = useState<boolean>(false)

    useEffect(()=>{
        followerService.getFollowByUser(props.userId)
            .then(f => {
                for(let i = 0; i <= f.length; i ++) {
                    f[i].vacationId === props.vacationId ? setIsFollowing(true) : setIsFollowing(false)
                    const trueOrFalse = f[i].vacationId === props.vacationId ? true : false
                }
            })
    },[])

    function follow() {
        if(!isFollowing) followerService.follow(props.userId, props.vacationId)
        else followerService.unFollow(props.userId, props.vacationId)
        setIsFollowing(!isFollowing)
    }

    useEffect(()=>{

    },[])

    return (
        <div className="LikeButton">
                <div onClick={follow} className="Like">
                    {isFollowing && <><span className="Liked">❤</span></>}
                    {!isFollowing && <>🤍</>}
                    <span> {props.followerCount}</span>
                </div>
        </div>
    );
}

export default LikeButton;
