import { StatusCodes } from "http-status-codes";
import { userController } from "../../controllers";
import DatabaseError from "../../errors/Database.error";
import { userService } from "../../services";

jest.mock("../../services");

describe("Create user", () => {
    const data = {
        fullName: "Saajan Shrestha",
        email: "saajan@test.com",
        password: "admin",
        dateOfBirth: "2000-01-01",
        address: "Kathmandu",
    };

    let requestMock = {};
    let responseMock = {
        status: jest.fn(),
        send: jest.fn(),
    };
    let nextFunctionMock = jest.fn();

    beforeEach(() => {
        requestMock = {
            body: data,
        };
    });

    it("should call mocked services", () => {
        userService.createUser(data as any);

        expect(userService.createUser).toBeCalled();
    });

    it("should create a new user with status of CREATED", async () => {
        (userService.createUser as jest.Mock).mockResolvedValueOnce({
            data: [data as any],
            message: "User created successfully",
        });

        await userController.createUser(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.status).toBeCalledWith(StatusCodes.CREATED);
    });

    it("should have throw DatabaseError when rejected", async () => {
        (userService.createUser as jest.Mock).mockRejectedValueOnce(
            DatabaseError
        );

        await userController.createUser(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(
            DatabaseError
        );
    });
});
