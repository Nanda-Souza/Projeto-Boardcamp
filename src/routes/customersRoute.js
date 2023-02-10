import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customersSchema } from "../schemas/customersSchema.js"
import { getCustomers,
         getCustomersById,
         createCustomer,
         updateCustomersById } from "../controllers/customersController.js"



const customersRoute = Router()

customersRoute.get("/customers", getCustomers)

customersRoute.get("/customers/:id", getCustomersById)

customersRoute.post("/customers", validateSchema(customersSchema), createCustomer)

customersRoute.put("/customers/:id", validateSchema(customersSchema), updateCustomersById)

export default customersRoute