import { object, string } from "yup";

export const symptomInsertSchema = object().shape({
    symptom: string().max(100).required(),
});
