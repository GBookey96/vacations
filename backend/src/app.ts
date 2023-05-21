import express from "express"
import appConfig from './2-utils/app-config';
import catchAll from './3-middleware/catch-all';
import routeNotFound from "./3-middleware/route-not-found";
import cors from "cors";
import vacationController from "./6-controllers/vacation-controller";
import authController from "./6-controllers/auth-controller";

const server = express()

server.use(cors())

server.use(express.json())
server.use("/api", vacationController);
server.use("/api", authController);
server.use("*", routeNotFound)
server.use(catchAll)

server.listen(appConfig.port, ()=> console.log(`listening on http://localhost:${appConfig.port}`))