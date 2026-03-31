import { Router } from "express";
import  userControllers from "../controller/userControllers.js";

const router = Router();

router.post("/users", userControllers.createUserController);
router.get("/users", userControllers.getUsersController);

export default router;