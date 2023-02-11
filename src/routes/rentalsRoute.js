import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { getRentals } from "../controllers/rentalsController.js";



const rentalsRoute = Router()

rentalsRoute.get("/rentals", getRentals)

export default rentalsRoute