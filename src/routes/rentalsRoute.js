import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalsSchema } from "../schemas/rentalsSchema.js"
import { getRentals,
         createRentals,
         finalizeRentals,
         deleteRentals } from "../controllers/rentalsController.js";



const rentalsRoute = Router()

rentalsRoute.get("/rentals", getRentals)

rentalsRoute.post("/rentals", validateSchema(rentalsSchema), createRentals)

rentalsRoute.post("/rentals/:id/return", finalizeRentals)

rentalsRoute.delete("/rentals/:id", deleteRentals)


export default rentalsRoute