import axios from "axios"
import FollowersModel from "../Models/follower-model"
import appConfig from "../Utils/config"


class FollowerService {

    public async follow(userId: number, vacationId: number): Promise<void> {
        await axios.post<FollowersModel>(appConfig.followUrl + "userId=" + userId + "&vacationId=" + vacationId)
    }

    public async unFollow(userId: number, vacationId: number): Promise<void> {
        await axios.delete(appConfig.unFollowUrl + "?userId=" + userId + "&vacationId=" + vacationId)
    }

    public async getFollowByUser(userId: number): Promise<FollowersModel[]> {
        const response = await axios.get(appConfig.isFollowingUrl + userId)
        return response.data        
    }

    public async howManyFollowingThisVacation(vacationId: number): Promise<number> {
        const response = await axios.get(appConfig.howManyFollowingUrl + vacationId)
        return response.data
    }

    public async getAllFollowers(): Promise<FollowersModel[]> {
        const response = await axios.get(appConfig.allFollowersUrl)
        return response.data
    }
}

const followerService = new FollowerService()
export default followerService