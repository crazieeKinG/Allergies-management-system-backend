import { array, boolean, object, string } from "yup";
import { symptomInsertSchema } from "./symptom.schemas";

export const allergyInsertSchema = object({
    allergyName: string().max(30, "Name cannot be greater that 30").required(),
    referredName: string().max(30, "Name cannot be greater that 30"),
    riskLevel: string().max(15).required(),
    subCategory: boolean().required(),
    symptoms: array().of(symptomInsertSchema)
});

export const allergyUpdateSchema = object({
    allergyName: string().max(30, "Name cannot be greater that 30").required(),
    referredName: string().max(30, "Name cannot be greater that 30"),
    riskLevel: string().max(15).required(),
    subCategory: boolean().required(),
});
