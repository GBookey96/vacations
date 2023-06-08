import followerService from "../../../../Services/FollowerService";
import "./LikeButton.css";
import { useState } from 'react';

interface LikeButtonProps {
	userId: number,
    vacationId: number,
    following: number[],
}

function LikeButton(props: LikeButtonProps): JSX.Element {
    
    const [isFollowing, setIsFollowing] = useState<boolean>(props.following.includes(props.vacationId))
    
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
                </div>
        </div>
    );
}

export default LikeButton;
