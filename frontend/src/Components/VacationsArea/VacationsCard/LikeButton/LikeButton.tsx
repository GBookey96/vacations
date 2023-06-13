import "./LikeButton.css";
import followerService from "../../../../Services/FollowerService";
import { useEffect, useState } from 'react';

interface LikeButtonProps {
	userId: number,
    vacationId: number,
    followedVacations: number[],
    followerCount: number,
}

function LikeButton(props: LikeButtonProps): JSX.Element {
    
    
    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    const [followerCount, setFollowerCount] = useState<number>(props.followerCount)
    
    useEffect(()=>{
        setIsFollowing(props.followedVacations.includes(props.vacationId))
    },[props.followedVacations])

    function follow() {
        if(!isFollowing) {
            followerService.follow(props.userId, props.vacationId)
            setFollowerCount(followerCount + 1)
        }
        else {
            followerService.unFollow(props.userId, props.vacationId)
            setFollowerCount(followerCount - 1)
        }
        setIsFollowing(!isFollowing)
    }

    return (
        <div className="LikeButton">
                <div onClick={follow} className="Like">
                    {isFollowing && <><span className="Liked">❤</span></>}
                    {!isFollowing && <>🤍</>}
                </div>
                <small>{followerCount} following</small>
        </div>
    );
}

export default LikeButton;
