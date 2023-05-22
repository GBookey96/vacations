import axios from "axios";
import authService from "./AuthService";
import { authStore } from "../Redux/AuthState";

class InterceptorsService {

    public createInterceptors(): void {

        axios.interceptors.request.use(request => {
            if (authService.isLoggedIn()) {
                request.headers['Authorization'] = "Bearer " + authStore.getState().token;
            }
            return request;
        });
    }
}

const interceptorsService = new InterceptorsService();

export default interceptorsService;