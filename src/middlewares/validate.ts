import { Request, Response, NextFunction } from "express";
import { unlinkSync } from "fs";
import { StatusCodes } from "http-status-codes";
import { AnyObjectSchema } from "yup";
import CustomError from "../misc/CustomError";

const validateRequest =
    (schema: AnyObjectSchema) =>
    async (request: Request, response: Response, next: NextFunction) => {
        const body = request.body;

        if (request.file) {
            body.photo = request.file;
        }

        if (body.dateOfBirth) body.dateOfBirth = new Date(body.dateOfBirth);

        if (body.symptoms) body.symptoms = JSON.parse(body.symptoms);

        try {
            const validatedResponse = await schema.validate(body, {
                strict: true,
            });

            const stripedResponse = await schema.validate(validatedResponse, {
                stripUnknown: true,
            });

            request.body = { ...stripedResponse };

            next();
        } catch (error: any) {
            if (request.file) {
                unlinkSync(request.file.path);
            }
            next(
                new CustomError(
                    error.message as string,
                    StatusCodes.BAD_REQUEST
                )
            );
        }
    };

export default validateRequest;
