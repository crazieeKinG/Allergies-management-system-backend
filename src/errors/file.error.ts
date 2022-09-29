import { StatusCodes } from "http-status-codes";
import CustomError from "../misc/CustomError";

export const UploadError = new CustomError(
    "Unable to upload",
    StatusCodes.INTERNAL_SERVER_ERROR
);
