import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";


const gamesRoute = Router()

gamesRoute.get("/games",)

gamesRoute.post("/games", validateSchema(gamesSchema))


export default gamesRoute
