import { StatusCodes } from "http-status-codes";
import { userController } from "../controllers";
import DatabaseError from "../errors/Database.error";
import UserModel from "../models/user.models";

jest.mock("../../models/user.models");

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

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call mocked database model", () => {
        UserModel.createUser(data as any);

        expect(UserModel.createUser).toBeCalled();
    });

    it("should create a new user with status of CREATED", async () => {
        (UserModel.createUser as jest.Mock).mockResolvedValueOnce([data]);

        await userController.createUser(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.status).toBeCalledWith(StatusCodes.CREATED);
    });

    it("should create a new user with message of 'User created successfully'", async () => {
        (UserModel.createUser as jest.Mock).mockResolvedValueOnce([data]);

        await userController.createUser(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.send).toBeCalledWith({
            data: [data],
            message: "User created successfully",
        });
    });

    it("should have throw DatabaseError when rejected", async () => {
        (UserModel.createUser as jest.Mock).mockRejectedValueOnce(
            DatabaseError
        );

        await userController.createUser(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(DatabaseError);
    });
});
