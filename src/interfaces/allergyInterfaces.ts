import SymptomInterface from "./symptomInterfaces";

interface AllergyInterface {
    id: string;
    allergyName: string;
    referredName?: string;
    riskLevel: string;
    description: string;
    photoUrl?: string;
    symptoms?: SymptomInterface[];
}

export type AllergyToInsert = Omit<AllergyInterface, "id">;

export default AllergyInterface;
