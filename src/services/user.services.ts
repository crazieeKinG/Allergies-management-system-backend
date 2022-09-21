import {
    InvalidPasswordError,
    UserNotFoundError,
} from "../errors/Signin.error";
import { UserCredentials, UserToInsert } from "../interfaces/User.interfaces";
import logger from "../misc/logger";
import UserModel from "../models/user.models";
import hashPassword from "../utils/hashPassword";
import verifyPassword from "../utils/verifyPassword";

export const createUser = async (userData: UserToInsert) => {
    logger.info("Create User: Service");

    const hashedPassword = await hashPassword(userData.password);

    const insertedData = await UserModel.createUser({
        ...userData,
        password: hashedPassword,
    });

    return {
        data: insertedData,
        message: "User successfully created",
    };
};

export const signin = async (userCredentials: UserCredentials) => {
    logger.info("Signin user: Service");

    const retrievedUser = await UserModel.getUserByEmail(userCredentials.email);
    if (!retrievedUser) throw UserNotFoundError;

    const passwordVerification = await verifyPassword(
        userCredentials.password,
        retrievedUser.password
    );
    if (!passwordVerification) throw InvalidPasswordError;

    return {
        data: {
            user: retrievedUser.fullName,
            accessToken: retrievedUser.id,
        },
        message: "User logged in successfully",
    };
};
