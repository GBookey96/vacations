import { OkPacket } from "mysql"
import cyber from "../2-utils/cyber"
import dal from "../2-utils/dal"
import CredentialsModel from "../4-models/credentials-model"
import { ResourceNotFoundErrorModel, UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/error-model"
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
    const sql = `SELECT * FROM users WHERE userId = ?`
    const users = await dal.execute(sql, [id])
    if(users.length === 0) throw new ResourceNotFoundErrorModel(id)
    const user = users[0]
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