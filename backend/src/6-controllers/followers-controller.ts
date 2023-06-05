import express, {Request, Response, NextFunction} from "express"
import blockNonLoggedIn from '../3-middleware/block-non-logged-in';
import followersLogic from "../5-logic/followers-logic";
import FollowersModel from "../4-models/followers-model";

const router = express.Router()

router.post("/follow", blockNonLoggedIn, async(request: Request, response: Response, next: NextFunction)=> {
    try {
        const userId = +request.query.userId
        console.log(typeof userId)
        const vacationId = +request.query.vacationId
        const addedFollow = await followersLogic.follow(+userId, vacationId)
        response.status(201).json(addedFollow)
    }
    catch(err: any) {
        next(err)
    }
})

router.delete("/unfollow", blockNonLoggedIn, async(request: Request, response: Response, next: NextFunction)=> {
    try {
        const userId = +request.query.userId
        const vacationId = +request.query.vacationId
        const follow = new FollowersModel({userId, vacationId})
        await followersLogic.unFollow(follow)
        response.sendStatus(204)
    }
    catch(err: any) {
        next(err)
    }
})

router.get("/isfollowing", async(request: Request, response: Response, next: NextFunction)=> {
    try {
        const userId = +request.query.userId
        const getFollowByUser = await followersLogic.getFollowByUser(userId)
        response.json(getFollowByUser)
    }
    catch(err: any) {
        next(err)
    }
})

router.get("/howmanyfollowing", async(request: Request, response: Response, next: NextFunction)=> {
    try {
        const vacationId = +request.query.vacationId
        const getFollowByUser = await followersLogic.howManyFollowers(vacationId)
        response.json(getFollowByUser)
    }
    catch(err: any) {
        next(err)
    }
})

router.get("/allfollowers", async(request: Request, response: Response, next: NextFunction)=> {
    try {
        const allFollowers = await followersLogic.getAllFollowers()
        response.json(allFollowers)
    }
    catch(err: any) {
        next(err)
    }
})

export default router