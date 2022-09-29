import { array, object, string } from "yup";
import {
    FILE_SIZE_IN_BYTES,
    FILE_SIZE_IN_MEGABYTES,
    FILE_TYPES,
} from "../constants/cloudinary.constants";
import { symptomInitialInsertSchema } from "./symptom.schemas";

export const allergyInsertSchema = object({
    allergyName: string().max(30, "Name cannot be greater that 30").required(),
    referredName: string().max(30, "Name cannot be greater that 30"),
    description: string().max(1000),
    riskLevel: string().max(15).required(),
    photo: object()
        .nullable()
        .test(
            "Photo",
            `Please provide a valid photo of type: ${FILE_TYPES.join(", ")}`,
            (file) => {
                if (!!file) return FILE_TYPES.includes(file.mimetype);
                else return true;
            }
        )
        .test(
            "Photo",
            `Please provide photo of size less than ${FILE_SIZE_IN_MEGABYTES}MB`,
            (file) => {
                if (!!file) return file.size < FILE_SIZE_IN_BYTES;
                else return true;
            }
        ),
    symptoms: array().of(symptomInitialInsertSchema),
});

export const allergyUpdateSchema = object({
    allergyName: string().max(30, "Name cannot be greater that 30").required(),
    referredName: string().max(30, "Name cannot be greater that 30"),
    description: string().max(1000),
    riskLevel: string().max(15).required(),
});
