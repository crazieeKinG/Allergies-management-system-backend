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
import generateAccessToken from "../utils/generateAccessToken";
import RefreshTokenModel from "../models/refresh.models";
import { TokenPayload } from "../interfaces/authenticatedRequestInterfaces";
import { RefreshTokenExpiredError } from "../errors/refresh.error";

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

    const accessToken = generateAccessToken(retrievedUser.id);

    const refreshToken = jwt.sign(
        { userId: retrievedUser.id },
        process.env.JWT_REFRESH_SECRET_KEY as string,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION_INTERVAL,
        }
    );

    await RefreshTokenModel.createRefreshToken({
        refreshToken: refreshToken,
        userId: retrievedUser.id,
    });

    return {
        data: {
            user: retrievedUser.fullName,
            photoUrl: retrievedUser.photoUrl,
            id: retrievedUser.id,
            accessToken: accessToken,
        },
        message: "User logged in successfully",
        refreshToken: refreshToken,
    };
};

export const generateAccessTokenFromRefreshToken = async (
    refreshToken: string
) => {
    logger.info("Generating access token from refresh token: Service");

    await RefreshTokenModel.getRefreshToken(refreshToken);

    try {
        const { userId } = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET_KEY as string
        ) as TokenPayload;

        const accessToken = generateAccessToken(userId);

        return {
            data: {
                accessToken,
            },
            message: "Access token generated successfully",
        };
    } catch (error) {
        await RefreshTokenModel.deleteRefreshToken(refreshToken);
        
        throw RefreshTokenExpiredError;
    }
};

export const signout = async (refreshToken: string) => {
    logger.info("Signing out user: Service");

    await RefreshTokenModel.getRefreshToken(refreshToken);

    await RefreshTokenModel.deleteRefreshToken(refreshToken);

    return {
        data: {},
        message: "User signed out successfully",
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
