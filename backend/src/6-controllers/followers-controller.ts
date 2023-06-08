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

// router.get("/isfollowing", blockNonLoggedIn, async(request: Request, response: Response, next: NextFunction)=> {
//     try {
//         const userId = +request.query.userId
//         const vacationId = +request.query.vacationId
//         const follow = new FollowersModel({userId, vacationId})
//         const result = await followersLogic.isFollowing(follow)
//         response.json(result)
//     }
//     catch(err: any) {
//         next(err)
//     }
// })

// router.get("/followercountof", blockNonLoggedIn, async(request: Request, response: Response, next: NextFunction)=> {
//     try {
//         const vacationId = +request.query.vacationId
//         const result = await followersLogic.followerCount(vacationId)
//         response.json(result)
//     }
//     catch(err: any) {
//         next(err)
//     }
// })

export default router