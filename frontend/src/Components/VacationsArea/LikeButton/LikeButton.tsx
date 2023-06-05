import followerService from "../../../Services/FollowerService";
import "./LikeButton.css";
import { useState, useEffect } from 'react';

interface LikeButtonProps {
	userId: number,
    vacationId: number,
    followerCount: number,
}

function LikeButton(props: LikeButtonProps): JSX.Element {
    const [isFollowing, setIsFollowing] = useState<boolean>(false)

    function follow() {
        if(!isFollowing) {
            followerService.follow(props.userId, props.vacationId)
        }
        if(isFollowing) followerService.unFollow(props.userId, props.vacationId)

        setIsFollowing(!isFollowing)
    }

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
