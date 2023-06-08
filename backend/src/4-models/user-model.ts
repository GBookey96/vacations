import Joi from 'joi';
import RoleModel from './role-model';


class UserModel {
    public userId: number
    public userFirstName: string
    public userLastName: string
    public userEmail: string
    public userPassword: string
    public userRole: RoleModel
    public followedVacations: number[]

    public constructor(user: UserModel) {
        this.userId = user.userId
        this.userFirstName = user.userFirstName
        this.userLastName = user.userLastName
        this.userEmail = user.userEmail
        this.userPassword = user.userPassword
        this.userRole = user.userRole
        this.followedVacations = user.followedVacations
    }

    public static validationSchema = Joi.object({
        userId: Joi.number().optional().positive().integer(),
        userFirstName: Joi.string().required().min(3).max(20),
        userLastName: Joi.string().required().min(3).max(20),
        userEmail: Joi.string().required().min(4).max(50),
        userPassword: Joi.string().required().min(3).max(20),
        userRole: Joi.required(),
        followedVacations: Joi.optional()
    })

    public validate(): string {
        const result = UserModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default UserModel