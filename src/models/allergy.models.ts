import {
    ALLERGY_TABLE_NAME,
    ALLERGY_TABLE_RETURNING,
    SYMPTOM_TABLE_NAME,
} from "../constants/model.constants";
import db from "../db/db";
import { AllergyNotFoundError } from "../errors/allergy.error";
import DatabaseError from "../errors/Database.error";
import deleteImage from "../fileHandlers/deleteImage";
import AllergyInterface, {
    AllergyToInsert,
} from "../interfaces/allergyInterfaces";
import logger from "../misc/logger";
import allergyOutputFormatter from "../utils/allergyOutputFormatter";
import createUniqueId from "../utils/createUniqueId";

class AllergyModel {
    public static table = ALLERGY_TABLE_NAME;

    // Create allergy

    public static createAllergy = async (allergyData: AllergyToInsert) => {
        try {
            logger.info("Create Allergy: Model");
            const uniqueId = createUniqueId();

            const insertedAllergy: AllergyInterface[] = await db
                .table(this.table)
                .insert({ ...allergyData, id: uniqueId })
                .returning(ALLERGY_TABLE_RETURNING);

            logger.info(
                `Allergy [${insertedAllergy[0].id}] created successfully`
            );
            return insertedAllergy[0];
        } catch (error) {
            console.log(error);
            if (allergyData.photoUrl) await deleteImage(allergyData.photoUrl);
            throw DatabaseError;
        }
    };

    // Read allergy data from database

    public static getAllergy = async () => {
        try {
            logger.info(`Get All Allergy: Model`);

            const retrievedAllergy: AllergyInterface[] = await db
                .table(this.table)
                .select(
                    `${this.table}.*`,
                    `${SYMPTOM_TABLE_NAME}.id as symptomId`,
                    `${SYMPTOM_TABLE_NAME}.symptom`
                )
                .leftJoin(
                    SYMPTOM_TABLE_NAME,
                    `${this.table}.id`,
                    `${SYMPTOM_TABLE_NAME}.allergy_id`
                )
                .then((records) => records.reduce(allergyOutputFormatter, []));

            logger.info(`All allergys retrieved successfully`);
            return retrievedAllergy;
        } catch (error) {
            console.log(error);
            throw DatabaseError;
        }
    };

    public static getAllergyById = async (id: string) => {
        try {
            logger.info(`Get Allergy by id [${id}]: Model`);

            const retrievedAllergy: AllergyInterface = await db
                .table(this.table)
                .select("*")
                .where({ id: id })
                .first();

            logger.info(
                `Allergy [${retrievedAllergy.id}] retrieved successfully`
            );
            return retrievedAllergy;
        } catch (error) {
            console.log(error);
            logger.error(`Allergy [${id}] not found`);
            throw AllergyNotFoundError;
        }
    };

    // Update allergy data

    public static updateAllergy = async (
        allergyData: AllergyToInsert,
        allergyId: string
    ) => {
        try {
            logger.info("Update Allergy: Model");

            const updatedAllergy: AllergyInterface[] = await db
                .table(this.table)
                .update({ ...allergyData })
                .where({ id: allergyId })
                .returning(ALLERGY_TABLE_RETURNING);

            logger.info(
                `Allergy [${updatedAllergy[0].id}] updated successfully`
            );
            return updatedAllergy[0];
        } catch (error) {
            console.log(error);
            if (allergyData.photoUrl) await deleteImage(allergyData.photoUrl);
            throw DatabaseError;
        }
    };

    //Delete allergy from database

    public static deleteAllergy = async (allergyId: string) => {
        try {
            logger.info("Delete Allergy: Model");

            const deletedData: AllergyInterface[] = await db
                .table(this.table)
                .delete()
                .where({ id: allergyId })
                .returning(ALLERGY_TABLE_RETURNING);

            logger.info(`Allergy [${allergyId}] deleted successfully`);
            return deletedData[0];
        } catch (error) {
            console.log(error);
            throw DatabaseError;
        }
    };
}

export default AllergyModel;
