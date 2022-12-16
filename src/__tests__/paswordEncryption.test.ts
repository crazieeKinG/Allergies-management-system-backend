import hashPassword from "../utils/hashPassword";
import verifyPassword from "../utils/verifyPassword";

const password = "password";
const wrongPassword = "wrong password";
let hashedPassword: string;

describe("Password encryption and verification", () => {
    it("should encrypt the password", async () => {
        hashedPassword = await hashPassword(password);

        expect(hashedPassword).toBeTruthy();
    });

    it("should return true when password matches with the hashed value", async () => {
        const verification = await verifyPassword(password, hashedPassword);

        expect(verification).toBe(true);
    });

    it("should return false when the password matches with the hashed value", async () => {
        const verification = await verifyPassword(
            wrongPassword,
            hashedPassword
        );

        expect(verification).toBe(false);
    });
});
