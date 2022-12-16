import { StatusCodes } from "http-status-codes";
import { symptomController } from "../controllers";
import DatabaseError from "../errors/Database.error";
import SymptomModel from "../models/symptom.models";

jest.mock("../models/symptom.models");

afterEach(() => {
    jest.clearAllMocks();
});

describe("Create symptom with symptoms", () => {
    const data = {
        symptom: "Symptom 1",
    };
    const insertedSymptom = { id: "0", allergyId: "1", ...data };

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
        SymptomModel.createSymptom(insertedSymptom as any);

        expect(SymptomModel.createSymptom).toBeCalled();
    });

    it(`should create a new symptom with status of CREATED(${StatusCodes.CREATED})`, async () => {
        (SymptomModel.createSymptom as jest.Mock).mockResolvedValueOnce([
            insertedSymptom,
        ]);

        await symptomController.createSymptom(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.status).toBeCalledWith(StatusCodes.CREATED);
    });

    it("should create a new symptom with message of 'Symptom created successfully'", async () => {
        (SymptomModel.createSymptom as jest.Mock).mockResolvedValueOnce(
            insertedSymptom
        );

        await symptomController.createSymptom(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.send).toBeCalledWith({
            data: insertedSymptom,
            message: "Symptom created successfully",
        });
    });

    it("should throw DatabaseError when SymptomModel is rejected", async () => {
        (SymptomModel.createSymptom as jest.Mock).mockRejectedValueOnce(
            DatabaseError
        );

        await symptomController.createSymptom(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(DatabaseError);
    });
});

describe("Update symptom", () => {
    const id = "0";
    const data = { allergyId: "1", symptom: "Symptom 1" };

    const newData = { allergyId: "1", symptom: "Symptom 2" };

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
        SymptomModel.getSymptomById(id as string);
        SymptomModel.updateSymptom(data as any, id as string);

        expect(SymptomModel.getSymptomById).toBeCalled();
        expect(SymptomModel.updateSymptom).toBeCalled();
    });

    it("should update symptom with message of 'Symptom updated successfully'", async () => {
        (SymptomModel.getSymptomById as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);
        (SymptomModel.updateSymptom as jest.Mock).mockResolvedValueOnce([
            { id: id, ...newData },
        ]);

        await symptomController.updateSymptom(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.send).toBeCalledWith({
            data: [{ id: id, ...newData }],
            message: "Symptom updated successfully",
        });
    });

    it("should throw DatabaseError when rejected", async () => {
        (SymptomModel.getSymptomById as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);
        (SymptomModel.updateSymptom as jest.Mock).mockRejectedValueOnce(
            DatabaseError
        );

        await symptomController.updateSymptom(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(DatabaseError);
    });
});

describe("Delete symptom", () => {
    const id = "1";
    const data = { allergyId: "1", symptom: "Symptom 1" };

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
        SymptomModel.getSymptomById(id as string);
        SymptomModel.deleteSymptom(id as string);

        expect(SymptomModel.getSymptomById).toBeCalled();
        expect(SymptomModel.deleteSymptom).toBeCalled();
    });

    it("should delete symptom with message 'Symptom deleted successfully'", async () => {
        (SymptomModel.getSymptomById as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);
        (SymptomModel.deleteSymptom as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);

        await symptomController.deleteSymptom(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(responseMock.send).toBeCalledWith({
            data: [{ id: id, ...data }],
            message: "Symptom deleted successfully",
        });
    });

    it("should throw DatabaseError when rejected", async () => {
        (SymptomModel.getSymptomById as jest.Mock).mockResolvedValueOnce([
            { id: id, ...data },
        ]);
        (SymptomModel.deleteSymptom as jest.Mock).mockRejectedValueOnce(
            DatabaseError
        );

        await symptomController.deleteSymptom(
            requestMock as any,
            responseMock as any,
            nextFunctionMock as any
        );

        expect(nextFunctionMock).toBeCalledWith(DatabaseError);
    });
});
