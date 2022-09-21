import { NextFunction, Request, Response } from "express";
import { UserToInsert } from "../interfaces/User.interfaces";
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
