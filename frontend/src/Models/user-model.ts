import RoleModel from "./role-model"

class UserModel {
    public userId: number
    public userFirstName: string
    public userLastName: string
    public userEmail: string
    public userPassword: string
    public userRole: RoleModel
}

export default UserModel