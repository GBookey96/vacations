import { Request } from "express";
import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken";
import crypto from "crypto"
import RoleModel from "../4-models/role-model";

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
            const header = request.header("authorization");
            if (!header) {
                resolve(false);
                return;
            }
            const token = header.substring(7);
            if (!token) {
                resolve(false);
                return;
            }
            jwt.verify(token, jwtSecretKey, err => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err: any) {
            reject(err);
        }
    });
}

async function verifyAdmin(request: Request): Promise<boolean> {
    const isLoggedIn = await verifyToken(request)
    if(!isLoggedIn) return false

    const header = request.header("authorization")
    const token = header.substring(7)

    const container: any = jwt.decode(token)

    const user: UserModel = container.user

    return user.userRole === RoleModel.Admin
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
    verifyToken,
    verifyAdmin
}