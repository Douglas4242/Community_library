import { Router } from "express";
import loanControllers from "../controller/loan.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { loanSchema } from "../schema/loan.schema.js";

const router = Router()

router.use(authMiddleware)
router.get('/loans', loanControllers.findAllLoansController)

router.post('/loans', validate(loanSchema), loanControllers.createLoanController)

export default router