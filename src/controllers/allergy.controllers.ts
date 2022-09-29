import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AllergyInterface, {
    AllergyToInsert,
} from "../interfaces/Allergy.interfaces";
import SymptomInterface from "../interfaces/Symptom.interfaces";
import logger from "../misc/logger";
import { allergyService, symptomService } from "../services";

export const createAllergy = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    logger.info("Create Allergy: Controller");
    const allData = request.body as AllergyInterface;

    const allergyData: AllergyToInsert = {
        allergyName: allData.allergyName,
        riskLevel: allData.riskLevel,
        description: allData.description,
    };

    try {
        const result = await allergyService.createAllergy(allergyData);

        if (allData.symptoms) {
            const symptomData = [...allData.symptoms];
            symptomData.forEach(
                (symptom) =>
                    (symptom.allergyId = (<AllergyInterface>result.data).id)
            );

            const result_symptoms = await symptomService.createSymptom(
                symptomData
            );

            (result.data as AllergyInterface).symptoms =
                result_symptoms.data as SymptomInterface[];
        }
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
