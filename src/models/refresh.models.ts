import {
    REFRESH_TABLE_NAME,
    REFRESH_TABLE_RETURNING,
} from "../constants/model.constants";
import db from "../db/db";
import DatabaseError from "../errors/Database.error";
import { RefreshTokenNotFoundError } from "../errors/refresh.error";
import RefreshTokenDataInterface from "../interfaces/refreshTokenInterfaces";
import logger from "../misc/logger";

class RefreshTokenModel {
    public static table = REFRESH_TABLE_NAME;

    public static async createRefreshToken(
        refreshTokenData: RefreshTokenDataInterface
    ) {
        try {
            logger.info(`Insert refresh token: Model`);
            const response = await db
                .table(this.table)
                .insert(refreshTokenData)
                .returning(REFRESH_TABLE_RETURNING);

            logger.info(`Refresh token insert with id - [${response[0].id}]`);
            return response[0];
        } catch (error) {
            console.log(error);
            throw DatabaseError;
        }
    }

    public static async getRefreshToken(refreshToken: string) {
        try {
            logger.info(`Get refresh token  [${refreshToken}]: Model`);
            const response = await db
                .table(this.table)
                .select(REFRESH_TABLE_RETURNING)
                .where({ refreshToken: refreshToken })
                .first();

            if (!response) throw response;

            return response;
        } catch (error) {
            console.log(error);
            throw RefreshTokenNotFoundError;
        }
    }

    public static async deleteRefreshToken(refreshToken: string) {
        try {
            logger.info(`Delete refresh token [${refreshToken}]: Model`);
            const response = await db
                .table(this.table)
                .delete()
                .where({ refreshToken })
                .returning(REFRESH_TABLE_RETURNING);

            return response[0];
        } catch (error) {
            console.log(error);
            throw RefreshTokenNotFoundError;
        }
    }
}

export default RefreshTokenModel;
