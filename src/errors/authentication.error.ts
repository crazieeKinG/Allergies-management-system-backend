import { StatusCodes } from "http-status-codes";
import CustomError from "../misc/CustomError";

export const NoAuthorizationHeaderError = new CustomError(
    "Authorization header not found",
    StatusCodes.UNAUTHORIZED
);

export const InvalidAccessToken = new CustomError(
    "Invalid access token",
    StatusCodes.UNAUTHORIZED
);
