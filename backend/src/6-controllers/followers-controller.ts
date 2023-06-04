import express, {Request, Response, NextFunction} from "express"
import blockNonLoggedIn from '../3-middleware/block-non-logged-in';
import followersLogic from "../5-logic/followers-logic";
import FollowersModel from "../4-models/followers-model";

const router = express.Router()

router.post("/follow", async(request: Request, response: Response, next: NextFunction)=> {
    try {
        const follow = new FollowersModel(request.body)
        const addedFollow = await followersLogic.follow(follow)
        response.status(201).json(addedFollow)
    }
    catch(err: any) {
        next(err)
    }
})

router.delete("/follow/delete/:userId/:vacationId", async(request: Request, response: Response, next: NextFunction)=> {
    try {
        const userId = +request.params.userId
        const vacationId = +request.params.vacationId
        await followersLogic.unFollow(userId, vacationId)
        response.sendStatus(204)
    }
    catch(err: any) {
        next(err)
    }
})

export default router