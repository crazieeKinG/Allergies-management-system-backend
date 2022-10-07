import { Router } from "express";
import { userController } from "../controllers";
import upload from "../fileHandlers/multer";
import authenticate from "../middlewares/authentication";
import validateRequest from "../middlewares/validate";
import {
    userInsertSchema,
    userResetPasswordSchema,
    userSignInSchema,
    userUpdateSchema,
} from "../schemas/user.schemas";

const userRouter = Router();

userRouter.get("/", authenticate, userController.getUsers);
userRouter.get("/profile", authenticate, userController.getUserProfile);

userRouter.post(
    "/signup",
    upload.single("photo"),
    validateRequest(userInsertSchema),
    userController.createUser
);

userRouter.post(
    "/signin",
    validateRequest(userSignInSchema),
    userController.signin
);

userRouter.post("/refresh", userController.generateAccessTokenFromRefreshToken);
userRouter.post("/signout", userController.signout);

userRouter.put(
    "/:userId",
    authenticate,
    upload.single("photo"),
    validateRequest(userUpdateSchema),
    userController.updateUser
);
userRouter.put(
    "/reset/password",
    authenticate,
    validateRequest(userResetPasswordSchema),
    userController.resetPassword
);

userRouter.delete("/:userId", authenticate, userController.deleteUser);

export default userRouter;
