import { StatusCodes } from "http-status-codes";
import CustomError from "../misc/CustomError";

const DatabaseError = new CustomError(
    "Database Error",
    StatusCodes.INTERNAL_SERVER_ERROR
);

export default DatabaseError;
