import { Router } from "express";
import  userControllers from "../controller/userControllers.js";
import { validate, validateUserId } from "../middlewares/validationMiddlewares.js";
import { userSchema } from "../schema/userSchema.js";

const router = Router();

router.post("/users", validate(userSchema), userControllers.createUserController);
router.get("/users", userControllers.getUsersController);
router.get("/users/:id", validateUserId, userControllers.findUserByIdController);
router.patch("/users/:id", validateUserId, userControllers.updateUserController);
router.delete("/users/:id", validateUserId, userControllers.deleteUserController);

export default router;