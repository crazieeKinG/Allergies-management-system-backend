import { UserToInsert } from "../interfaces/User.interfaces";
import logger from "../misc/logger";
import UserModel from "../models/user.models";
import hashPassword from "../utils/hashPassword";

export const createUser = async (userData: UserToInsert) => {
    logger.info("Create User: Service");

    const hashedPassword = await hashPassword(userData.password);

    const insertedData = await UserModel.createUser({
        ...userData,
        password: hashedPassword,
    });

    return {
        data: insertedData,
        message: "User successfully created",
    };
};
