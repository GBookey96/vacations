import { ResourceNotFoundErrorModel, UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/error-model"
import { OkPacket } from "mysql"
import cyber from "../2-utils/cyber"
import dal from "../2-utils/dal"
import CredentialsModel from "../4-models/credentials-model"
import UserModel from "../4-models/user-model"

async function register(user: UserModel): Promise<string> {
    const error = user.validate()
    if(error) throw new ValidationErrorModel(error)

    if(await isEmailTaken(user.userEmail)) throw new ValidationErrorModel(`email address ${user.userEmail} is already associated with another account`)
    user.userPassword = cyber.hash(user.userPassword)

    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`
    await dal.execute(sql, [user.userFirstName, user.userLastName, user.userEmail, user.userPassword, "User"])

    const token = cyber.getNewToken(user)
    return token
}

async function isEmailTaken(email: string) {
    const sql = `SELECT COUNT(*) FROM users WHERE userEmail = ?`
    const count = await dal.execute(sql, [email])[0]
    return count > 0
}

async function login(credentials: CredentialsModel): Promise<string> {
    const error = credentials.validate()
    if(error) throw new ValidationErrorModel(error)

    credentials.userPassword = cyber.hash(credentials.userPassword)

    const sql = `SELECT * FROM users WHERE userEmail = ? AND userPassword = ?`
    const users = await dal.execute(sql, [credentials.userEmail, credentials.userPassword])

    if(users.length === 0) throw new UnauthorizedErrorModel("Incorrect email address or password")

    const user = users[0]
    const token = cyber.getNewToken(user)
    return token
}

async function getOneUser(id: number): Promise<UserModel> {
    // selects all info from users table, along with all vacationIds that user is following from the followers table
    const sql = `SELECT u.*, GROUP_CONCAT(f.vacationId) AS followedVacations
                FROM users AS u
                LEFT JOIN followers AS f ON u.userId = f.userId
                WHERE u.userId = ?
                GROUP BY u.userId;`
    const users = await dal.execute(sql, [id])

    if(users.length === 0) throw new ResourceNotFoundErrorModel(id)
    const user = users[0]

    // if user is following any vacations, turn it into an array of numbers
    if(user.followedVacations) {
        user.followedVacations = user.followedVacations.split(",")
        user.followedVacations = user.followedVacations.map((Number))
    }

    return user
}

async function updateUser(user: UserModel): Promise<UserModel> {
    const sql = `UPDATE users SET userFirstName = ?, userLastName = ?, userEmail = ? WHERE userId = ?`
    const info: OkPacket = await dal.execute(sql, [user.userFirstName, user.userLastName, user.userEmail, user.userId])
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(user.userId)
    return user
}

export default {
    register,
    login,
    getOneUser,
    updateUser
}