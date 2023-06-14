import "./EditUser.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/user-model";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function EditUser(): JSX.Element {
    
    const {register, handleSubmit, setValue} = useForm<UserModel>()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(()=>{
        const id = +params.userId
        authService.getOneUser(id)
            .then(user => {
                console.log(user)
                setValue("userId", user.userId)
                setValue("userFirstName", user.userFirstName)
                setValue("userLastName", user.userLastName)
                setValue("userEmail", user.userEmail)
            })
            .catch(err => alert(err.message))
    },[])

    async function submit(user: UserModel) {
        try {
            await authService.updateUser(user)
            notifyService.success("Update Successful")
            navigate("/home")
        }
        catch(err: any) {
            notifyService.error(err)            
        }
    }
    
    return (
        <div className="EditUser">
			<form onSubmit={handleSubmit(submit)}>

                <input type="hidden" {...register("userId")} />
                
                <label>First Name:</label>
                <input type="text" {...register("userFirstName")} required autoFocus />

                <label>Last Name:</label>
                <input type="text" {...register("userLastName")} required />

                <label>Email Address:</label>
                <input type="email" {...register("userEmail")} required />

                <button>Update</button>
            </form>
        </div>
    );
}

export default EditUser;

