import { USER_TABLE_NAME } from "../constants/model.constants";
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
                .returning("*");

            logger.info(`User [${insertedUser[0].id}] created successfully`);
            return insertedUser;
        } catch (error) {
            console.error(error);
            throw DatabaseError;
        }
    };
}

export default UserModel;
