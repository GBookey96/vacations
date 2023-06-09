import axios from "axios"
import FollowersModel from "../Models/follower-model"
import appConfig from "../Utils/config"


class FollowerService {

    public async follow(userId: number, vacationId: number): Promise<void> {
        await axios.post<FollowersModel>(appConfig.followUrl + "userId=" + userId + "&vacationId=" + vacationId)
    }

    public async unFollow(userId: number, vacationId: number): Promise<void> {
        await axios.delete<FollowersModel>(appConfig.unFollowUrl + "?userId=" + userId + "&vacationId=" + vacationId)
    }
    
}
const followerService = new FollowerService()
export default followerService