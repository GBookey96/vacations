import axios from "axios"
import FollowersModel from "../Models/follower-model"
import appConfig from "../Utils/config"


class FollowerService {

    public async follow(userId: number, vacationId: number): Promise<void> {
        const follow = new FollowersModel({userId, vacationId})
        await axios.post<FollowersModel>(appConfig.followUrl, follow)
    }

    public async unFollow(userId: number, vacationId: number): Promise<void> {
        await axios.delete(appConfig.unFollowUrl + "?userId=" + userId + "&vacationId=" + vacationId)
    }
}

const followerService = new FollowerService()
export default followerService