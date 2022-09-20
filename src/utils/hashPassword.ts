import bcrypt from "bcrypt";
import logger from "../misc/logger";

const hashPassword = async (password: string) => {
    logger.info("Encryptng user password");

    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export default hashPassword;
