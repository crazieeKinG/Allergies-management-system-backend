import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

userRouter.post("/", userController.createUser);
userRouter.post("/signin", userController.signin);
userRouter.put("/:userId", userController.updateUser);
userRouter.delete("/:userId", userController.deleteUser);

export default userRouter;
