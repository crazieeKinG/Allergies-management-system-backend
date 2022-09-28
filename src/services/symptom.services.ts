import ResponseData from "../interfaces/Response.interface";
import SymptomInterface, {
    SymptomToInsert,
} from "../interfaces/Symptom.interfaces";
import logger from "../misc/logger";
import SymptomModel from "../models/symptom.models";

export const createSymptom = async (
    symptomData: SymptomToInsert[]
): Promise<ResponseData<SymptomInterface>> => {
    logger.info("Create Symptom: Service");

    const insertedData = await SymptomModel.createSymptom(symptomData);

    return {
        data: insertedData,
        message: "Symptom created successfully",
    };
};

export const updateSymptom = async (
    symptomData: SymptomToInsert,
    symptomId: string
) => {
    logger.info("Update Symptom: Service");

    const updatedData = await SymptomModel.updateSymptom(
        symptomData,
        symptomId
    );

    return {
        data: updatedData,
        message: "Symptom updated successfully",
    };
};

export const deleteSymptom = async (symptomId: string) => {
    logger.info("Delete Symptom: Service");

    const deletedData = await SymptomModel.deleteSymptom(symptomId);

    return {
        data: deletedData,
        message: "Symptom deleted successfully",
    };
};
