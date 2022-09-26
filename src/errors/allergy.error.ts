import { StatusCodes } from "http-status-codes";
import CustomError from "../misc/CustomError";

export const AllergyNotFoundError = new CustomError(
    "Allergy not found",
    StatusCodes.BAD_REQUEST
);