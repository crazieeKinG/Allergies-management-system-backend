import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

userRouter.post("/", userController.createUser);
userRouter.post("/signin", userController.signin);

export default userRouter;
