import { array, object, string } from "yup";

const symptomWithoutAllergyId = {
    symptom: string().max(100).required(),
};

export const symptomInitialInsertSchema = object().shape(
    symptomWithoutAllergyId
);

const symptomWithAllergyId = {
    ...symptomWithoutAllergyId,
    allergyId: string().min(36).max(36).required(),
};
export const symptomSchema = object().shape(symptomWithAllergyId);

export const symptomInsertSchema = object({
    symptoms: array().of(symptomSchema),
});
