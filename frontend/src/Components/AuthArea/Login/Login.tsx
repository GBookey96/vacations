import "./Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import CredentialsModel from "../../../Models/credentials-model";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function Login(): JSX.Element {
    const { register, handleSubmit} = useForm<CredentialsModel>()
    const navigate = useNavigate()

    async function submit(credentials: CredentialsModel) {
        try {
            await authService.login(credentials)
            notifyService.success("Login Successful")
            navigate("/home")
        }
        catch(err: any) {
            notifyService.error(err)
        }
    }

    return (
        <div className="Login Form">
			<form onSubmit={handleSubmit(submit)}>
            <h2>Login</h2>

                <label>Email Address</label>
                <input type="email" {...register("userEmail")} placeholder="john@doe.com" required autoFocus/>
                <label>Password</label>
                <input type="password" {...register("userPassword")} required placeholder="******" minLength={4}/>
                <button>Login</button>
                <div className="Register">
                    <small>Don't have an account yet?</small>
                    <br />
                    <small>Click <NavLink to="/register">here</NavLink> to register</small>
                </div>
                
            </form>
        </div>
    );
}

export default Login;
