class Config {
    public registerUrl = "http://localhost:3001/api/auth/register/"
    public loginUrl = "http://localhost:3001/api/auth/login/"
    public usersUrl = "http://localhost:3001/api/users/"
    public vacationsUrl = "http://localhost:3001/api/vacations/"
}

const appConfig = new Config()
export default appConfig