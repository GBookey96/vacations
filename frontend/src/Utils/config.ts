class Config {
    public registerUrl = "http://localhost:3001/api/auth/register/"
    public loginUrl = "http://localhost:3001/api/auth/login/"
    public usersUrl = "http://localhost:3001/api/users/"
    public vacationsUrl = "http://localhost:3001/api/vacations/"
    public updateVacationsUrl = "http://localhost:3001/api/vacations/update/"
    public deleteVacationsUrl = "http://localhost:3001/api/vacations/delete/"
    public vacationImgUrl = "http://localhost:3001/api/vacations/img/"
    public followUrl = "http://localhost:3001/api/follow?"
    public unFollowUrl = "http://localhost:3001/api/unfollow"
    public vacationsWithFollowerCount = "http://localhost:3001/api/vacationsfollowercount"
}

const appConfig = new Config()
export default appConfig