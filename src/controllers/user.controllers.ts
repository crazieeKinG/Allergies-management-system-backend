import { NextFunction, Response } from "express";
import { UserCredentials, UserToInsert } from "../interfaces/userInterfaces";
import { userService } from "../services";
import { StatusCodes } from "http-status-codes";
import logger from "../misc/logger";
import AuthenticatedRequest from "../interfaces/authenticatedRequestInterfaces";
import getRefreshTokenFromCookie from "../utils/getRefreshTokenFromCookie";
import { NoRefreshTokenForund } from "../errors/refresh.error";

export const createUser = async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
) => {
    logger.info("Create User: Controller");
    const userData = { ...request.body } as UserToInsert;

    if (request.file) {
        const fileString = request.file.path;
        userData.photoUrl = fileString;
    }

    try {
        const result = await userService.createUser(userData);
        response.status(StatusCodes.CREATED);
        response.send(result);
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
) => {
    logger.info("Get all users: Controller");

    try {
        const result = await userService.getUsers();
        response.send(result);
    } catch (error) {
        next(error);
    }
};

export const getUserProfile = async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
) => {
    logger.info("Get user profile: Controller");

    const userId = request.authenticatedUser;

    try {
        const result = await userService.getUserProfile(userId as string);
        response.send(result);
    } catch (error) {
        next(error);
    }
};

export const signin = async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
) => {
    logger.info("Signin user: Controller");
    const userCredentials = { ...request.body } as UserCredentials;

    try {
        const { data, message, refreshToken } = await userService.signin(
            userCredentials
        );

        response.cookie("refreshToken", refreshToken).send({ data, message });
    } catch (error) {
        next(error);
    }
};

export const generateAccessTokenFromRefreshToken = async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
) => {
    logger.info("Generating access token from refresh token: Controller");
    const cookie = request.headers.cookie as string;

    if (!cookie) next(NoRefreshTokenForund);
    else {
        const refreshToken = getRefreshTokenFromCookie(cookie);

        try {
            const result =
                await userService.generateAccessTokenFromRefreshToken(
                    refreshToken
                );
            response.send(result);
        } catch (error) {
            response.clearCookie("refreshToken");
            next(error);
        }
    }
};

export const signout = async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
) => {
    logger.info("Signout user: Controller");

    const cookie = request.headers.cookie as string;

    if (!cookie) next(NoRefreshTokenForund);
    else {
        const refreshToken = getRefreshTokenFromCookie(cookie);

        try {
            const result = await userService.signout(refreshToken);

            response.clearCookie("refreshToken").send(result);
        } catch (error) {
            response.clearCookie("refreshToken");
            next(error);
        }
    }
};

export const updateUser = async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
) => {
    logger.info("Update User: Controller");
    const { userId } = request.params;
    const userData = { ...request.body } as UserToInsert;

    if (request.file) {
        const fileString = request.file.path;
        userData.photoUrl = fileString;
    }

    try {
        const result = await userService.updateUser(userData, userId);
        response.send(result);
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
) => {
    logger.info("Update User - reset password: Controller");

    const userId = request.authenticatedUser as string;
    const { password }: { password: string } = request.body;

    try {
        const result = await userService.resetPassword(password, userId);
        response.send(result);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
) => {
    logger.info("Delete User: Controller");
    const { userId } = request.params;

    try {
        const result = await userService.deleteUser(userId);
        response.send(result);
    } catch (error) {
        next(error);
    }
};
