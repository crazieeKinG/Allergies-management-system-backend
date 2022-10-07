import jwt from "jsonwebtoken";

const generateAccessToken = (id: string) => {
    return jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: process.env.JWT_EXPIRATION_INTERVAL,
    });
};

export default generateAccessToken;
