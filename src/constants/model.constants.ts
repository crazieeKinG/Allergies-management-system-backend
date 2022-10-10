export const USER_TABLE_NAME = "user_account";
export const ALLERGY_TABLE_NAME = "allergy";
export const SYMPTOM_TABLE_NAME = "symptom";
export const REFRESH_TABLE_NAME = "refresh";

export const USER_TABLE_RETURNING = [
    "id",
    "full_name",
    "gender",
    "email",
    "date_of_birth",
    "address",
    "photo_url",
    "created_at",
];

export const ALLERGY_TABLE_RETURNING = [
    "id",
    "allergy_name",
    "referred_name",
    "risk_level",
    "description",
    "photo_url",
    "created_at",
];

export const SYMPTOM_TABLE_RETURNING = ["id", "symptom", "allergy_id"];

export const REFRESH_TABLE_RETURNING = ["id", "refresh_token", "user_id"];
