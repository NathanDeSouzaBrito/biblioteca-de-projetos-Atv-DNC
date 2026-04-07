import bookControllers from "../controller/bookControllers.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddlewares.js";
import { bookSchema } from "../schema/bookSchema.js";

const router = Router();

router.get("/books", bookControllers.findAllBooksController);

router.use(authMiddleware);
router.post("/books", validate(bookSchema), bookControllers.createBookController);

export default router