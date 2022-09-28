import SymptomInterface from "./Symptom.interfaces";

interface AllergyInterface {
    id: string;
    allergyName: string;
    referredName?: string;
    riskLevel: string;
    description: string;
    symptoms?: SymptomInterface[];
}

export type AllergyToInsert = Omit<AllergyInterface, "id">;

export default AllergyInterface;
