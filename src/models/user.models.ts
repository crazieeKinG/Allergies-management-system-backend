import {
    USER_TABLE_NAME,
    USER_TABLE_RETURNING,
} from "../constants/model.constants";
import db from "../db/db";
import DatabaseError from "../errors/Database.error";
import { UserNotFoundError } from "../errors/Signin.error";
import UserInterface, { UserToInsert } from "../interfaces/User.interfaces";
import logger from "../misc/logger";
import createUniqueId from "../utils/createUniqueId";

class UserModel {
    public static table = USER_TABLE_NAME;

    // Create user

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
            console.log(error);
            throw DatabaseError;
        }
    };

    // Read user data from database

    public static getUser = async () => {
        try {
            logger.info(`Get All User: Model`);

            const retrievedUser: UserInterface[] = await db
                .table(this.table)
                .select("*");

            logger.info(`All users retrieved successfully`);
            return retrievedUser;
        } catch (error) {
            console.log(error);
            throw DatabaseError;
        }
    };

    public static getUserById = async (id: string) => {
        try {
            logger.info(`Get User by id [${id}]: Model`);

            const retrievedUser: UserInterface = await db
                .table(this.table)
                .select("*")
                .where({ id: id })
                .first();

            logger.info(`User [${retrievedUser.id}] retrieved successfully`);
            return retrievedUser;
        } catch (error) {
            console.log(error);
            logger.error(`User [${id}] not found`);
            throw UserNotFoundError;
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
            console.log(error);
            logger.error(`User [${email}] not found`);
            throw UserNotFoundError;
        }
    };

    // Update user data

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
            console.log(error);
            throw DatabaseError;
        }
    };

    public static resetPassword = async (password: string, userId: string) => {
        try {
            logger.info("update user - Reset password: Model");

            const updatedUser: UserInterface[] = await db
                .table(this.table)
                .update({ password: password })
                .where({ id: userId })
                .returning(USER_TABLE_RETURNING);

            logger.info(
                `User [${updatedUser[0].id}] updated successfully - reset password`
            );
            return updatedUser;
        } catch (error) {
            console.log(error);
            throw DatabaseError;
        }
    };

    //Delete user from database

    public static deleteUser = async (userId: string) => {
        try {
            logger.info("Delete User: Model");

            const deletedData = await db
                .table(this.table)
                .delete()
                .where({ id: userId })
                .returning(USER_TABLE_RETURNING);

            logger.info(`User [${userId}] deleted successfully`);
            return deletedData;
        } catch (error) {
            console.log(error);
            throw DatabaseError;
        }
    };
}

export default UserModel;
