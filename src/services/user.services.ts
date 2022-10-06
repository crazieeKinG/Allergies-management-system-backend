import { InvalidPasswordError } from "../errors/Signin.error";
import ResponseData from "../interfaces/responseInterface";
import UserInterface, {
    UserCredentials,
    UserToInsert,
} from "../interfaces/userInterfaces";
import logger from "../misc/logger";
import UserModel from "../models/user.models";
import hashPassword from "../utils/hashPassword";
import verifyPassword from "../utils/verifyPassword";
import jwt from "jsonwebtoken";
import uploadImage from "../fileHandlers/uploadImage";
import { unlinkSync } from "fs";
import deleteImage from "../fileHandlers/deleteImage";
import { DEFAULT_PROFILE_PICTURE } from "../constants/cloudinary.constants";

export const createUser = async (
    userData: UserToInsert
): Promise<ResponseData<UserInterface>> => {
    logger.info("Create User: Service");

    try {
        await UserModel.checkEmailExists(userData.email);
    } catch (error) {
        if (userData.photoUrl) {
            unlinkSync(userData.photoUrl);
        }
        throw error;
    }

    if (userData.photoUrl) {
        const uploadUrl = await uploadImage(userData.photoUrl);

        userData.photoUrl = uploadUrl;
    } else userData.photoUrl = DEFAULT_PROFILE_PICTURE;

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

export const getUserProfile = async (userId: string) => {
    logger.info("Get all users: Service");

    const retrievedUser = await UserModel.getUserById(userId);

    return {
        data: retrievedUser,
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
        process.env.JWT_SECRET_KEY as string,
        {
            expiresIn: process.env.JWT_EXPIRATION_INTERVAL,
        }
    );

    return {
        data: {
            user: retrievedUser.fullName,
            photoUrl: retrievedUser.photoUrl,
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

    try {
        const previousData = await UserModel.getUserById(userId);

        if (userData.photoUrl) {
            const uploadUrl = await uploadImage(userData.photoUrl);

            userData.photoUrl = uploadUrl;
        }

        const updatedData = await UserModel.updateUser(userData, userId);

        if (previousData.photoUrl) await deleteImage(previousData.photoUrl);

        return {
            data: updatedData,
            message: "User updated successfully",
        };
    } catch (error) {
        if (userData.photoUrl) {
            unlinkSync(userData.photoUrl);
        }
        throw error;
    }
};

export const resetPassword = async (password: string, userId: string) => {
    logger.info("Update user - reset password: Service");

    await UserModel.getUserById(userId);

    const hashedPassword = await hashPassword(password);
    const updatedData = await UserModel.resetPassword(hashedPassword, userId);

    return {
        data: updatedData,
        message: "User updated successfully - reset password",
    };
};

export const deleteUser = async (
    userId: string
): Promise<ResponseData<UserInterface>> => {
    logger.info("Delete User: Service");

    await UserModel.getUserById(userId);

    const deletedData = await UserModel.deleteUser(userId);

    if (deletedData.photoUrl) await deleteImage(deletedData.photoUrl);

    return {
        data: deletedData,
        message: "User deleted successfully",
    };
};
