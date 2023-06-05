import dal from "../2-utils/dal"
import FollowersModel from "../4-models/followers-model"


async function follow(userId: number, vacationId: number): Promise<void> {
    const sql = 'INSERT INTO followers VALUES(DEFAULT, ?, ?)'
    await dal.execute(sql, [userId, vacationId])
}

async function unFollow(follow: FollowersModel): Promise<void> {
    const sql = 'DELETE FROM followers WHERE userId = ? AND vacationId = ?'
    await dal.execute(sql, [follow.userId, follow.vacationId])
}

async function getFollowByUser(userId: number): Promise<FollowersModel[]> {
    const sql = `SELECT userId, vacationId FROM followers WHERE userId = ?`
    const vacations = await dal.execute(sql, [userId])
    return vacations
}

async function howManyFollowers(vacationId: number): Promise<number> {
    const sql = 'SELECT userId, vacationId FROM followers WHERE vacationId = ?'
    const followers = await dal.execute(sql, [vacationId])
    return followers.length
}

async function getAllFollowers(): Promise<FollowersModel[]> {
    const sql = 'SELECT userId, vacationId FROM followers'
    const allFollowers = await dal.execute(sql)
    return allFollowers
}

export default {
    follow,
    unFollow,
    getFollowByUser,
    howManyFollowers,
    getAllFollowers
}