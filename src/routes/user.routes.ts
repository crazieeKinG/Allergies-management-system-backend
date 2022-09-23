import { Router } from "express";
import { userController } from "../controllers";
import authenticate from "../middlewares/authentication";

const userRouter = Router();

userRouter.post("/", userController.createUser);
userRouter.post("/signin", userController.signin);
userRouter.put("/:userId", authenticate, userController.updateUser);
userRouter.delete("/:userId", authenticate, userController.deleteUser);

export default userRouter;
