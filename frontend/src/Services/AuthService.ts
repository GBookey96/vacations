import { AuthActionType, authStore } from "../Redux/AuthState"
import axios from "axios"
import appConfig from "../Utils/config"
import UserModel from "../Models/user-model"
import CredentialsModel from "../Models/credentials-model"

class AuthService {
    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(appConfig.registerUrl, user)
        const token = response.data
        authStore.dispatch({type: AuthActionType.Register, payload: token})
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post(appConfig.loginUrl, credentials);
        const token = response.data;
        authStore.dispatch({type: AuthActionType.Login, payload: token})
    }

    public logout(): void {
        authStore.dispatch({type: AuthActionType.Logout})
    }

    public isLoggedIn(): boolean {
        return authStore.getState().token !== null
    }

    public async getOneUser(userId: number): Promise<UserModel> {
        const response = await axios.get(appConfig.usersUrl + userId)
        const user = response.data
        return user
    }

    public async updateUser(user: UserModel): Promise<void> {
        const response = await axios.patch<UserModel>(appConfig.usersUrl + user.userId, user)
        const updatedUser = response.data
        authStore.dispatch({type: AuthActionType.Update, payload: updatedUser})
    }
}

const authService = new AuthService()

export default authService