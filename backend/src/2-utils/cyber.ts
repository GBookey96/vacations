import { Request } from "express";
import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken";
import crypto from "crypto"

const jwtSecretKey = "GershonBookeyVacationsProject"

function getNewToken(user: UserModel): string{
    delete user.userPassword

    const container = { user }
    const options = { expiresIn: "3h" }
    const token = jwt.sign(container, jwtSecretKey, options)
    return token;
}


function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = request.header("authorization")
            if(!header) {
                resolve(false)
                return
            }
            const token = header.substring(7)
            if(!token) {
                resolve(false)
                return
            }
            jwt.verify(token, jwtSecretKey, err => {
                if(err) {
                    resolve(false)
                    return
                }
                resolve(true)
            })
        }
        catch(err: any) {
            reject(err)
        }
    })
}

const salt = "LifeIsGood"

function hash(password: string): string {
    if(!password) return null
    const hashedPwd = crypto.createHmac("sha512", salt).update(password).digest("hex")
    return hashedPwd
}

export default {
    hash,
    getNewToken,
    verifyToken
}