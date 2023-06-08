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

// async function isFollowing(follow: FollowersModel): Promise<boolean> {
//     const sql = `SELECT * FROM followers WHERE userId = ? AND vacationId = ?`
//     const result = await dal.execute(sql, [follow.userId, follow.vacationId])
//     return result.length > 0 ? true : false
// }

// async function followerCount(vacationId: number): Promise<number> {
//     const sql = `SELECT * FROM followers WHERE vacationId = ?`
//     const result = await dal.execute(sql, [vacationId])
//     return result.length
// }

export default {
    follow,
    unFollow,
    // isFollowing,
    // followerCount
}