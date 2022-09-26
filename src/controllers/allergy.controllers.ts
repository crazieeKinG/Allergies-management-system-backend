import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AllergyToInsert } from "../interfaces/Allergy.interfaces";
import logger from "../misc/logger";
import { allergyService } from "../services";

export const createAllergy = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.info("Create Allergy: Controller");
    const allergyData = { ...request.body } as AllergyToInsert;

    try {
        const result = await allergyService.createAllergy(allergyData);
        
        response.status(StatusCodes.CREATED);
        response.send(result);
    } catch (error) {
        next(error);
    }
};

export const getAllergys = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.info("Get all allergys: Controller");

    try {
        const result = await allergyService.getAllergys();
        response.send(result);
    } catch (error) {
        next(error);
    }
};

export const updateAllergy = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.info("Update Allergy: Controller");
    const { allergyId } = request.params;
    const allergyData = { ...request.body } as AllergyToInsert;

    try {
        const result = await allergyService.updateAllergy(
            allergyData,
            allergyId
        );
        response.send(result);
    } catch (error) {
        next(error);
    }
};

export const deleteAllergy = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.info("Delete Allergy: Controller");
    const { allergyId } = request.params;

    try {
        const result = await allergyService.deleteAllergy(allergyId);
        response.send(result);
    } catch (error) {
        next(error);
    }
};
