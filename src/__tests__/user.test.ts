import { StatusCodes } from "http-status-codes";
import { userController } from "../controllers";
import DatabaseError from "../errors/Database.error";
import UserModel from "../models/user.models";

jest.mock("../models/user.models");

afterEach(() => {
    jest.clearAllMocks();
});

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

    it("should call mocked database model", () => {
        UserModel.createUser(data as any);

        expect(UserModel.createUser).toBeCalled();
    });

    it(`should create a new user with status of CREATED(${StatusCodes.CREATED})`, async () => {
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

    it("should throw DatabaseError when rejected", async () => {
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

describe("Get user", () => {
    const data = {
        id: "1",
        fullName: "Saajan Shrestha",
        email: "saajan@test.com",
        password: "admin",
        dateOfBirth: "2000-01-01",
        address: "Kathmandu",
    };

    let requestMock = {};
    let responseMock = {
        send: jest.fn(),
    };
    let nextFunctionMock = jest.fn();

    it("should call mocked database model", () => {
        UserModel.getUser();

        expect(UserModel.getUser).toBeCalled();
    });

    it("should get all users with message of 'User fetched successfully'", async () => {
        (UserModel.getUser as jest.Mock).mockResolvedValueOnce([data]);

        await userController.getUsers(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.send).toBeCalledWith({
            data: [data],
            message: "User fetched successfully",
        });
    });

    it("should throw DatabaseError when rejected", async () => {
        (UserModel.getUser as jest.Mock).mockRejectedValueOnce(DatabaseError);

        await userController.getUsers(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(DatabaseError);
    });
});

describe("Get user profile", () => {
    const id = "1";
    const data = {
        id: id,
        fullName: "Saajan Shrestha",
        email: "saajan@test.com",
        password: "admin",
        dateOfBirth: "2000-01-01",
        address: "Kathmandu",
    };

    let requestMock = {};
    let responseMock = {
        send: jest.fn(),
    };
    let nextFunctionMock = jest.fn();

    beforeEach(() => {
        requestMock = {
            authenticatedUser: id,
        };
    });

    it("should call mocked database model", () => {
        UserModel.getUserById(id);

        expect(UserModel.getUserById).toBeCalled();
    });

    it("should get a user with message of 'User fetched successfully'", async () => {
        (UserModel.getUserById as jest.Mock).mockResolvedValueOnce([data]);

        await userController.getUserProfile(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.send).toBeCalledWith({
            data: [data],
            message: "User fetched successfully",
        });
    });

    it("should throw DatabaseError when rejected", async () => {
        (UserModel.getUserById as jest.Mock).mockRejectedValueOnce(
            DatabaseError
        );

        await userController.getUserProfile(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(DatabaseError);
    });
});

describe("Update user", () => {
    const id = "1";
    const data = {
        fullName: "Saajan Shrestha",
        email: "saajan@test.com",
        password: "admin",
        dateOfBirth: "2000-01-01",
        address: "Kathmandu",
    };

    const newData = {
        fullName: "Saajan Shrestha",
        email: "saajan@test.com",
        password: "admin2",
        dateOfBirth: "2000-01-01",
        address: "Kathmandu",
    };

    let requestMock = {};
    let responseMock = {
        send: jest.fn(),
    };
    let nextFunctionMock = jest.fn();

    beforeEach(() => {
        requestMock = {
            params: id,
            body: data,
        };
    });

    it("should call mocked database model", () => {
        UserModel.updateUser(data as any, id as string);
        UserModel.getUserById(id as string);

        expect(UserModel.updateUser).toBeCalled();
        expect(UserModel.getUserById).toBeCalled();
    });

    it("should update user with message of 'User updated successfully'", async () => {
        (UserModel.getUserById as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);
        (UserModel.updateUser as jest.Mock).mockResolvedValueOnce([
            { id: id, ...newData },
        ]);

        await userController.updateUser(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.send).toBeCalledWith({
            data: [{ id: id, ...newData }],
            message: "User updated successfully",
        });
    });

    it("should throw DatabaseError when rejected", async () => {
        (UserModel.getUserById as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);
        (UserModel.updateUser as jest.Mock).mockRejectedValueOnce(
            DatabaseError
        );

        await userController.updateUser(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(DatabaseError);
    });
});

describe("Delete user", () => {
    const id = "1";
    const data = {
        fullName: "Saajan Shrestha",
        email: "saajan@test.com",
        password: "admin",
        dateOfBirth: "2000-01-01",
        address: "Kathmandu",
    };

    let requestMock = {};
    let responseMock = {
        send: jest.fn(),
    };
    let nextFunctionMock = jest.fn();

    beforeEach(() => {
        requestMock = {
            params: id,
        };
    });

    it("should call mocked database model", () => {
        UserModel.deleteUser(id as string);
        UserModel.getUserById(id as string);

        expect(UserModel.deleteUser).toBeCalled();
        expect(UserModel.getUserById).toBeCalled();
    });

    it("should delete user with message of 'User deleted successfully'", async () => {
        (UserModel.getUserById as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);
        (UserModel.deleteUser as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);

        await userController.deleteUser(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.send).toBeCalledWith({
            data: [{ id: id, ...data }],
            message: "User deleted successfully",
        });
    });

    it("should throw DatabaseError when rejected", async () => {
        (UserModel.getUserById as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);
        (UserModel.deleteUser as jest.Mock).mockRejectedValueOnce(
            DatabaseError
        );

        await userController.deleteUser(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(DatabaseError);
    });
});
