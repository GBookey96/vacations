import FollowersModel from "./follower-model"

class VacationModel {
    public vacationId: number
    public vacationDestination: string
    public vacationDescription: string
    public vacationStart: string
    public vacationEnd: string
    public vacationPrice: number
    public vacationImg: FileList
    public vacationImgName: string
    public followerCount: number
}

export default VacationModel