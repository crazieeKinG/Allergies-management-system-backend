import { NextFunction, Response } from "express";
import { UserCredentials, UserToInsert } from "../interfaces/User.interfaces";
import { userService } from "../services";
import { StatusCodes } from "http-status-codes";
import logger from "../misc/logger";
import AuthenticatedRequest from "../interfaces/AuthenticatedRequest.interfaces";

export const createUser = async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
) => {
    logger.info("Create User: Controller");
    const userData = { ...request.body } as UserToInsert;

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
        const result = await userService.signin(userCredentials);
        response.send(result);
    } catch (error) {
        next(error);
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
