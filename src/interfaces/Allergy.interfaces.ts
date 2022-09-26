import SymptomInterface from "./Symptom.interfaceS";

interface AllergyInterface {
    id: string;
    allergyName: string;
    referredName?: string;
    riskLevel: string;
    subCategory: boolean;
    symptoms?: SymptomInterface[];
}

export type AllergyToInsert = Omit<AllergyInterface, "id">;

export default AllergyInterface;
