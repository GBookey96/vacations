class FollowersModel {
    public vacationId: number
    public userId: number

    public constructor(followers: FollowersModel) {
        this.vacationId = followers.vacationId
        this.userId = followers.userId
    }
}

export default FollowersModel