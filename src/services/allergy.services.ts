import ResponseData from "../interfaces/Response.interface";
import AllergyInterface, {
    AllergyToInsert,
} from "../interfaces/Allergy.interfaces";
import logger from "../misc/logger";
import AllergyModel from "../models/allergy.models";
import uploadImage from "../fileHandlers/uploadImage";
import { unlinkSync } from "fs";
import deleteImage from "../fileHandlers/deleteImage";

export const createAllergy = async (
    allergyData: AllergyToInsert
): Promise<ResponseData<AllergyInterface>> => {
    logger.info("Create Allergy: Service");

    if (allergyData.photoUrl) {
        const uploadUrl = await uploadImage(allergyData.photoUrl);

        allergyData.photoUrl = uploadUrl;
    }

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

    try {
        const previousData = await AllergyModel.getAllergyById(allergyId);

        if (allergyData.photoUrl) {
            const uploadUrl = await uploadImage(allergyData.photoUrl);

            allergyData.photoUrl = uploadUrl;
        }

        if (previousData.photoUrl) await deleteImage(previousData.photoUrl);

        const updatedData = await AllergyModel.updateAllergy(
            allergyData,
            allergyId
        );

        return {
            data: updatedData,
            message: "Allergy updated successfully",
        };
    } catch (error) {
        if (allergyData.photoUrl) {
            unlinkSync(allergyData.photoUrl);
        }
        throw error;
    }
};

export const deleteAllergy = async (
    allergyId: string
): Promise<ResponseData<AllergyInterface>> => {
    logger.info("Delete Allergy: Service");

    await AllergyModel.getAllergyById(allergyId);

    const deletedData = await AllergyModel.deleteAllergy(allergyId);

    if (deletedData.photoUrl) await deleteImage(deletedData.photoUrl);
    
    return {
        data: deletedData,
        message: "Allergy deleted successfully",
    };
};
