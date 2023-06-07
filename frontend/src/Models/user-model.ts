import FollowersModel from "./follower-model"
import RoleModel from "./role-model"

class UserModel {
    public userId: number
    public userFirstName: string
    public userLastName: string
    public userEmail: string
    public userPassword: string
    public userRole: RoleModel
    public followedVacations: []
}

export default UserModel