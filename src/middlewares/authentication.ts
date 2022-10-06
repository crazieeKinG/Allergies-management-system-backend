import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
    InvalidAccessToken,
    NoAuthorizationHeaderError,
} from "../errors/authentication.error";
import AuthenticatedRequest, {
    TokenPayload,
} from "../interfaces/AuthenticatedRequest.interfaces";

const authenticate = async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
) => {
    try {
        const token =
            request.headers.authorization?.split(" ")[1] ||
            (request.headers.auth as string);

        if (!token) return next(NoAuthorizationHeaderError);

        const result = (await jwt.verify(
            token as string,
            process.env.JWT_SECRET_KEY as string
        )) as TokenPayload;

        request.authenticatedUser = result.userId;

        next();
    } catch (error) {
        next(InvalidAccessToken);
    }
};

export default authenticate;
