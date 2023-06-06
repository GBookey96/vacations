import followerService from "../../../../Services/FollowerService";
import "./LikeButton.css";
import { useState, useEffect } from 'react';

interface LikeButtonProps {
	userId: number,
    vacationId: number,
}

function LikeButton(props: LikeButtonProps): JSX.Element {
    
    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    const [followerCount, setFollowerCount] = useState<number>()

    useEffect(()=>{
        followerService.isFollowing(props.userId, props.vacationId)
            .then(result => setIsFollowing(result))
            .catch(err => console.log(err))

        followerService.followerCount(props.vacationId)
            .then(result => setFollowerCount(result))
    },[])

    function follow() {
        if(!isFollowing) followerService.follow(props.userId, props.vacationId)
        else followerService.unFollow(props.userId, props.vacationId)

        setIsFollowing(!isFollowing)
    }

    return (
        <div className="LikeButton">
                <div onClick={follow} className="Like">
                    {isFollowing && <><span className="Liked">❤</span></>}
                    {!isFollowing && <>🤍</>}
                    <span>{followerCount}</span>
                </div>
        </div>
    );
}

export default LikeButton;
