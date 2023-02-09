import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customersSchema } from "../schemas/customersSchema.js"
import { getCustomers } from "../controllers/customersController.js"


const customersRoute = Router()

customersRoute.get("/customers", getCustomers)

export default customersRoute