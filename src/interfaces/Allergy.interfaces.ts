interface AllergyInterface {
    id: string;
    allergyName: string;
    referredName?: string;
    riskLevel: string;
    subCategory: boolean;
}

export type AllergyToInsert = Omit<AllergyInterface, "id">;

export default AllergyInterface;
