import AllergyInterface from "../interfaces/allergy.interfaces";

const allergyOutputFormatter = (output: AllergyInterface[], allergy: any) => {
    let newAllergy = output.filter(
        (each) => each.id === allergy.id
    )[0] as AllergyInterface;

    if (!newAllergy) newAllergy = {} as AllergyInterface;

    const remainingData = output.filter(
        (each) => each.id !== allergy.allergyId
    ) as AllergyInterface[];

    newAllergy.id = allergy.allergyId;

    const { symptomId, symptom, allergyId, ...allergyData } = allergy;
    newAllergy = { ...newAllergy, ...allergyData };

    if (!newAllergy.symptoms) {
        newAllergy.symptoms = [];
    }
    if (symptomId)
        newAllergy.symptoms.push({ id: symptomId, symptom, allergyId });

    output = [...remainingData];
    output.push(newAllergy);

    return output;
};

export default allergyOutputFormatter;
