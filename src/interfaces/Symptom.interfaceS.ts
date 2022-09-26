interface SymptomInterface {
    id: string;
    symptom: string;
    description?: string;
    allergyId: string;
}

export type SymptomToInsert = Omit<SymptomInterface, "id">;

export default SymptomInterface;
