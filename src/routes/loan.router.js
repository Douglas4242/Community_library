import { Router } from "express";
import loanControllers from "../controller/loan.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate, validateLoanId } from "../middlewares/validation.middlewares.js";
import { loanSchema } from "../schema/loan.schema.js";

const router = Router()

router.use(authMiddleware)
router.get('/', loanControllers.findAllLoansController)

router.post('/', validate(loanSchema), loanControllers.createLoanController)
router.get('/:id', validateLoanId, loanControllers.findLoanByIdController)
router.delete('/:id', validateLoanId, loanControllers.deleteLoanController)

export default router