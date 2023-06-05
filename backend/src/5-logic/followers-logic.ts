import dal from "../2-utils/dal"
import FollowersModel from "../4-models/followers-model"


async function follow(follow: FollowersModel) {
    const sql = 'INSERT INTO followers VALUES(DEFAULT, ?,?)'
    await dal.execute(sql, [follow.userId, follow.vacationId])
}

async function unFollow(follow: FollowersModel) {
    const sql = 'DELETE FROM followers WHERE userId = ? AND vacationId = ?'
    await dal.execute(sql, [follow.userId, follow.vacationId])
}

export default {
    follow,
    unFollow
}