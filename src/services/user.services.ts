import { InvalidPasswordError } from "../errors/Signin.error";
import ResponseData from "../interfaces/Response.interface";
import UserInterface, {
    UserCredentials,
    UserToInsert,
} from "../interfaces/User.interfaces";
import logger from "../misc/logger";
import UserModel from "../models/user.models";
import hashPassword from "../utils/hashPassword";
import verifyPassword from "../utils/verifyPassword";
import jwt from "jsonwebtoken";

export const createUser = async (
    userData: UserToInsert
): Promise<ResponseData<UserInterface>> => {
    logger.info("Create User: Service");

    const hashedPassword = await hashPassword(userData.password);

    const insertedData = await UserModel.createUser({
        ...userData,
        password: hashedPassword,
    });

    return {
        data: insertedData,
        message: "User created successfully",
    };
};

export const getUsers = async () => {
    logger.info("Get all users: Service");

    const retrievedUsers = await UserModel.getUser();

    return {
        data: retrievedUsers,
        message: "User fetched successfully",
    };
};

export const signin = async (userCredentials: UserCredentials) => {
    logger.info("Signin user: Service");

    const retrievedUser = await UserModel.getUserByEmail(userCredentials.email);

    const passwordVerification = await verifyPassword(
        userCredentials.password,
        retrievedUser.password
    );
    if (!passwordVerification) throw InvalidPasswordError;

    const accessToken = jwt.sign(
        { userId: retrievedUser.id },
        process.env.JWT_SECRET_KEY as string
    );

    return {
        data: {
            user: retrievedUser.fullName,
            id: retrievedUser.id,
            accessToken: accessToken,
        },
        message: "User logged in successfully",
    };
};

export const updateUser = async (
    userData: UserToInsert,
    userId: string
): Promise<ResponseData<UserInterface>> => {
    logger.info("Update User: Service");

    await UserModel.getUserById(userId);

    const updatedData = await UserModel.updateUser(userData, userId);

    return {
        data: updatedData,
        message: "User updated successfully",
    };
};

export const deleteUser = async (
    userId: string
): Promise<ResponseData<UserInterface>> => {
    logger.info("Delete User: Service");

    const deletedData = await UserModel.deleteUser(userId);

    return {
        data: deletedData,
        message: "User deleted successfully",
    };
};
