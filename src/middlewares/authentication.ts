import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
    InvalidAccessToken,
    NoAuthorizationHeaderError,
} from "../errors/authentication.error";

const authenticate = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const token =
            request.headers.authorization?.split(" ")[1] ||
            (request.headers.auth as string);

        if (!token) return next(NoAuthorizationHeaderError);

        const result = await jwt.verify(
            token,
            process.env.JWT_SECRET_KEY as string
        );
        console.log(result);
        next();
    } catch (error) {
        next(InvalidAccessToken);
    }
};

export default authenticate;
