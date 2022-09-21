import bcrypt from "bcrypt";

const verifyPassword = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
};

export default verifyPassword;
