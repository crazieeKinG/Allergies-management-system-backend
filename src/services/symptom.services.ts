import ResponseData from "../interfaces/Response.interface";
import SymptomInterface, { SymptomToInsert } from "../interfaces/Symptom.interfaceS";
import logger from "../misc/logger";
import SymptomModel from "../models/symptom.models";

export const createSymptom= async (
    symptomData: SymptomToInsert[]
): Promise<ResponseData<SymptomInterface>> => {
    logger.info("Create Symptom: Service");

    const insertedData = await SymptomModel.createSymptom(symptomData);

    return {
        data: insertedData,
        message: "Symptomcreated successfully",
    };
};
