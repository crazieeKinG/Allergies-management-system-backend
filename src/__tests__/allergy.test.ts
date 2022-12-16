import { StatusCodes } from "http-status-codes";
import { allergyController } from "../controllers";
import DatabaseError from "../errors/Database.error";
import AllergyModel from "../models/allergy.models";
import SymptomModel from "../models/symptom.models";

jest.mock("../models/allergy.models");
jest.mock("../models/symptom.models");

afterEach(() => {
    jest.clearAllMocks();
});

describe("Create allergy without symptoms", () => {
    const data = {
        allergyName: "Scientific name",
        referredName: "Commom name",
        riskLevel: "High risk",
        description: "Description of allergy",
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
        AllergyModel.createAllergy(data as any);

        expect(AllergyModel.createAllergy).toBeCalled();
    });

    it(`should create a new allergy with status of CREATED(${StatusCodes.CREATED})`, async () => {
        (AllergyModel.createAllergy as jest.Mock).mockResolvedValueOnce([
            { id: "1", ...data },
        ]);

        await allergyController.createAllergy(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.status).toBeCalledWith(StatusCodes.CREATED);
    });

    it("should create a new allergy with message of 'Allergy created successfully'", async () => {
        (AllergyModel.createAllergy as jest.Mock).mockResolvedValueOnce([
            { id: "1", ...data },
        ]);

        await allergyController.createAllergy(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.send).toBeCalledWith({
            data: [{ id: "1", ...data }],
            message: "Allergy created successfully",
        });
    });

    it("should throw DatabaseError when rejected", async () => {
        (AllergyModel.createAllergy as jest.Mock).mockRejectedValueOnce(
            DatabaseError
        );

        await allergyController.createAllergy(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(DatabaseError);
    });
});

describe("Create allergy with symptoms", () => {
    const data = {
        allergyName: "Scientific name",
        referredName: "Commom name",
        riskLevel: "High risk",
        description: "Description of allergy",
        symptoms: [
            {
                symptom: "Symptom 1",
            },
            {
                symptom: "Symptom 2",
            },
            {
                symptom: "Symptom 3",
            },
        ],
    };

    const insertedSymptom = {
        symptoms: [
            { id: "1", allergyId: "1", ...data.symptoms[0] },
            { id: "2", allergyId: "1", ...data.symptoms[1] },
            { id: "3", allergyId: "1", ...data.symptoms[2] },
        ],
    };

    const insertedData = {
        id: "1",
        allergyName: "Scientific name",
        referredName: "Commom name",
        riskLevel: "High risk",
        description: "Description of allergy",
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
        AllergyModel.createAllergy(insertedData as any);
        SymptomModel.createSymptom(insertedSymptom as any);

        expect(AllergyModel.createAllergy).toBeCalled();
        expect(SymptomModel.createSymptom).toBeCalled();
    });

    it(`should create a new allergy with status of CREATED(${StatusCodes.CREATED})`, async () => {
        (AllergyModel.createAllergy as jest.Mock).mockResolvedValueOnce([
            insertedData,
        ]);
        (SymptomModel.createSymptom as jest.Mock).mockResolvedValueOnce([
            insertedSymptom,
        ]);

        await allergyController.createAllergy(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.status).toBeCalledWith(StatusCodes.CREATED);
    });

    it("should create a new allergy with message of 'Allergy created successfully'", async () => {
        (AllergyModel.createAllergy as jest.Mock).mockResolvedValueOnce(
            insertedData
        );
        (SymptomModel.createSymptom as jest.Mock).mockResolvedValueOnce(
            insertedSymptom.symptoms
        );

        await allergyController.createAllergy(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.send).toBeCalledWith({
            data: { ...insertedData, ...insertedSymptom },
            message: "Allergy created successfully",
        });
    });

    it("should throw DatabaseError when AllergyModel is rejected", async () => {
        (AllergyModel.createAllergy as jest.Mock).mockRejectedValueOnce(
            DatabaseError
        );

        await allergyController.createAllergy(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(DatabaseError);
    });

    it("should throw DatabaseError when SymptomModel is rejected", async () => {
        (AllergyModel.createAllergy as jest.Mock).mockResolvedValueOnce(
            insertedData
        );
        (SymptomModel.createSymptom as jest.Mock).mockRejectedValueOnce(
            DatabaseError
        );

        await allergyController.createAllergy(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(DatabaseError);
    });
});

describe("Get allergy", () => {
    const data = {
        id: "1",
        allergyName: "Scientific name",
        referredName: "Commom name",
        riskLevel: "High risk",
        description: "Description of allergy",
    };

    let requestMock = {};
    let responseMock = {
        send: jest.fn(),
    };
    let nextFunctionMock = jest.fn();

    it("should call mocked database model", () => {
        AllergyModel.getAllergy();

        expect(AllergyModel.getAllergy).toBeCalled();
    });

    it("should get all allergys with message of 'Allergy fetched successfully'", async () => {
        (AllergyModel.getAllergy as jest.Mock).mockResolvedValueOnce([data]);

        await allergyController.getAllergys(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.send).toBeCalledWith({
            data: [data],
            message: "Allergy fetched successfully",
        });
    });

    it("should throw DatabaseError when rejected", async () => {
        (AllergyModel.getAllergy as jest.Mock).mockRejectedValueOnce(
            DatabaseError
        );

        await allergyController.getAllergys(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(DatabaseError);
    });
});

describe("Update allergy", () => {
    const id = "1";
    const data = {
        allergyName: "Scientific name",
        referredName: "Commom name",
        riskLevel: "High risk",
        description: "Description of allergy",
    };

    const newData = {
        allergyName: "Scientific name 2",
        referredName: "Commom name 2",
        riskLevel: "High risk 2",
        description: "Description of allergy 2",
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
        AllergyModel.updateAllergy(data as any, id as string);
        AllergyModel.getAllergyById(id as string);

        expect(AllergyModel.updateAllergy).toBeCalled();
        expect(AllergyModel.getAllergyById).toBeCalled();
    });

    it("should update a allergy with message of 'Allergy updated successfully'", async () => {
        (AllergyModel.getAllergyById as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);
        (AllergyModel.updateAllergy as jest.Mock).mockResolvedValueOnce([
            { id: id, ...newData },
        ]);

        await allergyController.updateAllergy(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.send).toBeCalledWith({
            data: [{ id: id, ...newData }],
            message: "Allergy updated successfully",
        });
    });

    it("should throw DatabaseError when rejected", async () => {
        (AllergyModel.getAllergyById as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);
        (AllergyModel.updateAllergy as jest.Mock).mockRejectedValueOnce(
            DatabaseError
        );

        await allergyController.updateAllergy(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(DatabaseError);
    });
});

describe("Delete allergy", () => {
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
        AllergyModel.deleteAllergy(id as string);
        AllergyModel.getAllergyById(id as string);

        expect(AllergyModel.deleteAllergy).toBeCalled();
        expect(AllergyModel.getAllergyById).toBeCalled();
    });

    it("should delete allergy with message of 'Allergy deleted successfully'", async () => {
        (AllergyModel.getAllergyById as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);
        (AllergyModel.deleteAllergy as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);

        await allergyController.deleteAllergy(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.send).toBeCalledWith({
            data: [{ id: id, ...data }],
            message: "Allergy deleted successfully",
        });
    });

    it("should throw DatabaseError when rejected", async () => {
        (AllergyModel.getAllergyById as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);
        (AllergyModel.deleteAllergy as jest.Mock).mockRejectedValueOnce(
            DatabaseError
        );

        await allergyController.deleteAllergy(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(DatabaseError);
    });
});
