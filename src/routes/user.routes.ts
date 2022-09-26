import { Router } from "express";
import { userController } from "../controllers";
import authenticate from "../middlewares/authentication";
import validateRequest from "../middlewares/validate";
import {
    userInsertSchema,
    userResetPasswordSchema,
    userSignInSchema,
    userUpdateSchema,
} from "../schemas/user.schema";

const userRouter = Router();

userRouter.post(
    "/",
    validateRequest(userInsertSchema),
    userController.createUser
);
userRouter.get("/all", authenticate, userController.getUsers);

userRouter.post(
    "/signin",
    validateRequest(userSignInSchema),
    userController.signin
);

userRouter.put(
    "/:userId",
    authenticate,
    validateRequest(userUpdateSchema),
    userController.updateUser
);
userRouter.put(
    "/:userId/reset/password",
    authenticate,
    validateRequest(userResetPasswordSchema),
    userController.resetPassword
);

userRouter.delete("/:userId", authenticate, userController.deleteUser);

export default userRouter;
