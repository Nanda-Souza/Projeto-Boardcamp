import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customersSchema } from "../schemas/customersSchema.js"
import { getCustomers,
         getCustomersById,
         createCustomer } from "../controllers/customersController.js"



const customersRoute = Router()

customersRoute.get("/customers", getCustomers)

customersRoute.get("/customers/:id", getCustomersById)

customersRoute.post("/customers", validateSchema(customersSchema), createCustomer)

export default customersRoute