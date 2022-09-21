import { StatusCodes } from "http-status-codes";
import CustomError from "../misc/CustomError";

export const UserNotFoundError = new CustomError(
    "User not found",
    StatusCodes.BAD_REQUEST
);

export const InvalidPasswordError = new CustomError(
    "Incorrect password",
    StatusCodes.BAD_REQUEST
);
