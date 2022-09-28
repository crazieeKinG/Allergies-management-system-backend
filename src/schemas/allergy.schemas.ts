import { array, object, string } from "yup";
import { symptomInitialInsertSchema } from "./symptom.schemas";

export const allergyInsertSchema = object({
    allergyName: string().max(30, "Name cannot be greater that 30").required(),
    referredName: string().max(30, "Name cannot be greater that 30"),
    description: string().max(1000),
    riskLevel: string().max(15).required(),
    symptoms: array().of(symptomInitialInsertSchema),
});

export const allergyUpdateSchema = object({
    allergyName: string().max(30, "Name cannot be greater that 30").required(),
    referredName: string().max(30, "Name cannot be greater that 30"),
    description: string().max(1000),
    riskLevel: string().max(15).required(),
});
