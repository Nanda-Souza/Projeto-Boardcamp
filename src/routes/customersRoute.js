import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customersSchema } from "../schemas/customersSchema.js"
import { getCustomers } from "../controllers/customersController.js"
import { getCustomersById } from "../controllers/customersController.js"


const customersRoute = Router()

customersRoute.get("/customers", getCustomers)

customersRoute.get("/customers/:id", getCustomersById)

export default customersRoute