import {
    USER_TABLE_NAME,
    USER_TABLE_RETURNING,
} from "../constants/model.constants";
import db from "../db/db";
import DatabaseError from "../errors/Database.error";
import UserInterface, { UserToInsert } from "../interfaces/User.interfaces";
import logger from "../misc/logger";
import createUniqueId from "../utils/createUniqueId";

class UserModel {
    public static table = USER_TABLE_NAME;

    public static createUser = async (userData: UserToInsert) => {
        try {
            logger.info("Create User: Model");
            const uniqueId = createUniqueId();

            const insertedUser: UserInterface[] = await db
                .table(this.table)
                .insert({ ...userData, id: uniqueId })
                .returning(USER_TABLE_RETURNING);

            logger.info(`User [${insertedUser[0].id}] created successfully`);
            return insertedUser;
        } catch (error) {
            throw DatabaseError;
        }
    };

    public static getUserByEmail = async (email: string) => {
        try {
            logger.info(`Get User by email [${email}]: Model`);

            const retrievedUser: UserInterface = await db
                .table(this.table)
                .select("*")
                .where({ email: email })
                .first();

            logger.info(`User [${retrievedUser.id}] retrieved successfully`);
            return retrievedUser;
        } catch (error) {
            throw DatabaseError;
        }
    };

    public static updateUser = async (
        userData: UserToInsert,
        userId: string
    ) => {
        try {
            logger.info("Update User: Model");

            const updatedUser: UserInterface[] = await db
                .table(this.table)
                .update({ ...userData })
                .where({ id: userId })
                .returning(USER_TABLE_RETURNING);

            logger.info(`User [${updatedUser[0].id}] updated successfully`);
            return updatedUser;
        } catch (error) {
            throw DatabaseError;
        }
    };
}

export default UserModel;
