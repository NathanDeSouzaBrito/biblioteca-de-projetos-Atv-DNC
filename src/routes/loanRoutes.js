import { Router } from "express";
import loanControllers from "../controller/loanControllers.js";
import { validate, validateLoanId } from "../middlewares/validationMiddlewares.js";
import { loanSchema } from "../schema/loanSchema.js";

const router = Router();

router.post("/loans", validate(loanSchema), loanControllers.createLoanController);
router.get("/loans", loanControllers.findAllLoansController);
router.get("/loans/:id", validateLoanId, loanControllers.findLoanByIdController);
router.delete("/loans/:id", validateLoanId, loanControllers.deleteLoanController);

export default router