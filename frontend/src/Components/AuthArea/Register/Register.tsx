import "./Register.css";
import { useForm } from "react-hook-form";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import UserModel from "../../../Models/user-model";
import { NavLink } from "react-router-dom";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();
    const [isBot, setIsBot] = useState<boolean>(true);

    async function submit(user: UserModel) {
        try {
            await authService.register(user);
            alert("Welcome!");
            navigate("/home");
        }
        catch (err: any) {
            alert(err);
        }
    }

    function reCaptchaChecked(value: string): void {
        setIsBot(value?.length === 0);
    }

    return (
        <div className="Register Form">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(submit)}>

                <label>First Name:</label>
                <input type="text" {...register("userFirstName")} required autoFocus />

                <label>Last Name:</label>
                <input type="text" {...register("userLastName")} required />

                <label>Email Address:</label>
                <input type="email" {...register("userEmail")} required />

                <label>Password:</label>
                <input type="password" {...register("userPassword")} required />

                <div className="ReCaptchaContainer">
                    <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={reCaptchaChecked} />
                </div>

                <button disabled={isBot}>Register</button>
                <div className="Login">
                    <small>Already have an account?</small>
                    <br />
                    <small>Click <NavLink to="/login">here</NavLink> to login</small>
                </div>
            </form>
            
        </div>
    );
}

export default Register;