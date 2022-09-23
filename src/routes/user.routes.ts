import { Router } from "express";
import { userController } from "../controllers";
import authenticate from "../middlewares/authentication";
import validateRequest from "../middlewares/validate";
import { userInsertSchema, userUpdateSchema } from "../schemas/userSchema";

const userRouter = Router();

userRouter.post(
    "/",
    validateRequest(userInsertSchema),
    userController.createUser
);
userRouter.get("/all", authenticate, userController.getUsers);
userRouter.post("/signin", userController.signin);
userRouter.put(
    "/:userId",
    authenticate,
    validateRequest(userUpdateSchema),
    userController.updateUser
);
userRouter.delete("/:userId", authenticate, userController.deleteUser);

export default userRouter;
