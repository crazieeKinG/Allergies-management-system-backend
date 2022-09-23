import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyObjectSchema } from "yup";
import CustomError from "../misc/CustomError";

const validateRequest =
    (schema: AnyObjectSchema) =>
    async (request: Request, response: Response, next: NextFunction) => {
        const body = request.body;

        if (body.dateOfBirth) body.dateOfBirth = new Date(body.dateOfBirth);

        try {
            const response = await schema.validate(body, {
                strict: true,
                stripUnknown: true,
            });

            console.log(response);
            next();
        } catch (error: any) {
            next(
                new CustomError(
                    error.message as string,
                    StatusCodes.BAD_REQUEST
                )
            );
        }
    };

export default validateRequest;
