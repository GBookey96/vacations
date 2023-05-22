class FollowersModel {
    public vacationId: number
    public vacationStart: string
    public vacationEnd: string
    public followerCount: number

    public constructor(followers: FollowersModel) {
        this.vacationId = followers.vacationId
        this.vacationStart = followers.vacationStart
        this.vacationEnd = followers.vacationEnd
        this.followerCount = followers.followerCount
    }
}

export default FollowersModel