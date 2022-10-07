import { StatusCodes } from "http-status-codes";
import CustomError from "../misc/CustomError";

export const NoRefreshTokenForund = new CustomError(
    "No refresh token found",
    StatusCodes.BAD_REQUEST
);

export const RefreshTokenNotFoundError = new CustomError(
    "User already signed out.",
    StatusCodes.FORBIDDEN
);

export const RefreshTokenExpiredError = new CustomError(
    "Session expired. Please re-sign in to your account.",
    StatusCodes.UNAUTHORIZED
);
