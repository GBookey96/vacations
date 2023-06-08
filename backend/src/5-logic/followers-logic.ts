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

export default {
    follow,
    unFollow
}