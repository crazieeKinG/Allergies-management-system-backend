export const USER_TABLE_NAME = "user_account";
export const ALLERGY_TABLE_NAME = "allergy";
export const SYMPTOM_TABLE_NAME = "symptom";

export const USER_TABLE_RETURNING = [
    "id",
    "full_name",
    "email",
    "date_of_birth",
    "address",
    "created_at",
];

export const ALLERGY_TABLE_RETURNING = [
    "id",
    "allergy_name",
    "referred_name",
    "risk_level",
    "description",
    "created_at",
];

export const SYMPTOM_TABLE_RETURNING = [
    "id",
    "symptom",
    "allergy_id",
];
