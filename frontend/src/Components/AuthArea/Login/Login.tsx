import "./Login.css";
import { useForm } from "react-hook-form";
import CredentialsModel from "../../../Models/credentials-model";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import { NavLink } from "react-router-dom";

function Login(): JSX.Element {
    const { register, handleSubmit} = useForm<CredentialsModel>()
    const navigate = useNavigate()

    async function submit(credentials: CredentialsModel) {
        try {
            await authService.login(credentials)
            alert("Login Successful")
            navigate("/home")
        }
        catch(err: any) {
            alert(err)
        }
    }

    return (
        <div className="Login Form">
            <h2>Login</h2>
			<form onSubmit={handleSubmit(submit)}>
                <label>Email Address</label>
                <input type="email" {...register("userEmail")} placeholder="example@example.com" required/>
                <label>Password</label>
                <input type="password" {...register("userPassword")} required placeholder="******"/>
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
