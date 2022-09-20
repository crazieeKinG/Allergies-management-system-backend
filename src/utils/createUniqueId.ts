import crypto from "crypto";

const createUniqueId = () => {
    return crypto.randomUUID();
};

export default createUniqueId;
