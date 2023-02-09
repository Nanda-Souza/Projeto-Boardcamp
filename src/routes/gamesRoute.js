import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { gamesSchema } from "../schemas/gamesSchema.js"
import { getGames } from "../controllers/gamesController.js"


const gamesRoute = Router()

gamesRoute.get("/games", getGames)

gamesRoute.post("/games", validateSchema(gamesSchema))


export default gamesRoute
