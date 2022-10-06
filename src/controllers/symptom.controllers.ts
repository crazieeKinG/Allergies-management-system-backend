import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SymptomToInsert } from "../interfaces/symptomInterfaces";
import logger from "../misc/logger";
import { symptomService } from "../services";

export const createSymptom = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.info("Create Symptom: Controller");
    const { symptoms } = request.body;

    try {
        const result = await symptomService.createSymptom(
            symptoms as SymptomToInsert[]
        );
        console.log(symptoms);

        response.status(StatusCodes.CREATED);
        response.send(result);
    } catch (error) {
        next(error);
    }
};

export const updateSymptom = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.info("Update Symptom: Controller");
    const { symptomId } = request.params;
    const symptomData = { ...request.body } as SymptomToInsert;

    try {
        const result = await symptomService.updateSymptom(
            symptomData,
            symptomId
        );
        response.send(result);
    } catch (error) {
        next(error);
    }
};

export const deleteSymptom = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.info("Delete Symptom: Controller");
    const { symptomId } = request.params;

    try {
        const result = await symptomService.deleteSymptom(symptomId);
        response.send(result);
    } catch (error) {
        next(error);
    }
};
