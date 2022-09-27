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
            const validatedResponse = await schema.validate(body, {
                strict: true,
            });

            const stripedResponse = await schema.validate(validatedResponse, {
                stripUnknown: true,
            });

            request.body = { ...stripedResponse };

            console.log(stripedResponse);
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
