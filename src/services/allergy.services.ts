import ResponseData from "../interfaces/Response.interface";
import AllergyInterface, {
    AllergyToInsert,
} from "../interfaces/Allergy.interfaces";
import logger from "../misc/logger";
import AllergyModel from "../models/allergy.models";

export const createAllergy = async (
    allergyData: AllergyToInsert
): Promise<ResponseData<AllergyInterface>> => {
    logger.info("Create Allergy: Service");

    const insertedData = await AllergyModel.createAllergy(allergyData);

    return {
        data: insertedData,
        message: "Allergy created successfully",
    };
};

export const getAllergys = async () => {
    logger.info("Get all allergys: Service");

    const retrievedAllergys = await AllergyModel.getAllergy();

    return {
        data: retrievedAllergys,
        message: "Allergy fetched successfully",
    };
};

export const updateAllergy = async (
    allergyData: AllergyToInsert,
    allergyId: string
): Promise<ResponseData<AllergyInterface>> => {
    logger.info("Update Allergy: Service");

    await AllergyModel.getAllergyById(allergyId);

    const updatedData = await AllergyModel.updateAllergy(
        allergyData,
        allergyId
    );

    return {
        data: updatedData,
        message: "Allergy updated successfully",
    };
};

export const deleteAllergy = async (
    allergyId: string
): Promise<ResponseData<AllergyInterface>> => {
    logger.info("Delete Allergy: Service");

    const deletedData = await AllergyModel.deleteAllergy(allergyId);

    return {
        data: deletedData,
        message: "Allergy deleted successfully",
    };
};
