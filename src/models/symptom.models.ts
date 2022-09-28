import {
    SYMPTOM_TABLE_NAME,
    SYMPTOM_TABLE_RETURNING,
} from "../constants/model.constants";
import db from "../db/db";
import { SymptomNotFoundError } from "../errors/allergy.error";
import DatabaseError from "../errors/Database.error";
import SymptomInterface, {
    SymptomToInsert,
} from "../interfaces/Symptom.interfaces";
import logger from "../misc/logger";

class SymptomModel {
    public static table = SYMPTOM_TABLE_NAME;

    // Create SYMPTOM

    public static createSymptom = async (symptomData: SymptomToInsert[]) => {
        try {
            logger.info("Create Symptom: Model");

            const insertedSymptom: SymptomInterface[] = await db
                .table(this.table)
                .insert(symptomData)
                .returning(SYMPTOM_TABLE_RETURNING);

            logger.info(
                `Symptom [${insertedSymptom.map(
                    (each) => `${each.id}`
                )}] created successfully`
            );
            return insertedSymptom;
        } catch (error) {
            console.log(error);
            throw DatabaseError;
        }
    };

    // Read symptom data from database

    public static getSymptom = async () => {
        try {
            logger.info(`Get All Symptom: Model`);

            const retrievedSymptom: SymptomInterface[] = await db
                .table(this.table)
                .select("*");

            logger.info(`All symptoms retrieved successfully`);
            return retrievedSymptom;
        } catch (error) {
            console.log(error);
            throw DatabaseError;
        }
    };

    public static getSymptomById = async (symptomId: string) => {
        try {
            logger.info(`Get Symptom by id [${symptomId}]: Model`);

            const retrievedSymptom: SymptomInterface = await db
                .table(this.table)
                .select("*")
                .where({ id: symptomId })
                .first();

            logger.info(
                `Symptom [${retrievedSymptom.id}] retrieved successfully`
            );
            return retrievedSymptom;
        } catch (error) {
            console.log(error);
            logger.error(`Symptom [${symptomId}] not found`);
            throw SymptomNotFoundError;
        }
    };

    // Update symptom data

    public static updateSymptom = async (
        symptomData: SymptomToInsert,
        symptomId: string
    ) => {
        try {
            logger.info("Update Symptom: Model");

            const updatedSymptom: SymptomInterface[] = await db
                .table(this.table)
                .update({ ...symptomData })
                .where({ id: symptomId })
                .returning(SYMPTOM_TABLE_RETURNING);

            logger.info(
                `Symptom [${updatedSymptom[0].id}] updated successfully`
            );
            return updatedSymptom;
        } catch (error) {
            console.log(error);
            throw DatabaseError;
        }
    };

    //Delete symptom from database

    public static deleteSymptom = async (symptomId: string) => {
        try {
            logger.info("Delete Symptom: Model");

            const deletedData = await db
                .table(this.table)
                .delete()
                .where({ id: symptomId })
                .returning(SYMPTOM_TABLE_RETURNING);

            logger.info(`Symptom [${symptomId}] deleted successfully`);
            return deletedData;
        } catch (error) {
            console.log(error);
            throw DatabaseError;
        }
    };
}

export default SymptomModel;
