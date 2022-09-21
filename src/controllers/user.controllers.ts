import { NextFunction, Request, Response } from "express";
import { UserCredentials, UserToInsert } from "../interfaces/User.interfaces";
import { userService } from "../services";
import { StatusCodes } from "http-status-codes";
import logger from "../misc/logger";

export const createUser = async (
    request: Request,
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

export const signin = async (
    request: Request,
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
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.info("Update User: Controller");
    const { userId } = request.params;
    const userData = { ...request.body } as UserToInsert;

    try {
        const result = await userService.updateUser(userData, userId);
        response.status(StatusCodes.CREATED);
        response.send(result);
    } catch (error) {
        next(error);
    }
};
