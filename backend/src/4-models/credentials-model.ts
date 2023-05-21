import Joi from 'joi';

class CredentialsModel {
    public userEmail: string
    public userPassword: string

    public constructor(credentials: CredentialsModel) {
        this.userEmail = credentials.userEmail
        this.userPassword = credentials.userPassword
    }

    public static validationSchema = Joi.object({
        userEmail: Joi.string().required().min(4).max(50),
        userPassword: Joi.string().required().min(3).max(20)
    })

    public validate(): string {
        const result = CredentialsModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default CredentialsModel