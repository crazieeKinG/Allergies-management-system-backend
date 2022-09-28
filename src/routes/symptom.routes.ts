import { Router } from "express";
import { symptomController } from "../controllers";
import authenticate from "../middlewares/authentication";
import validateRequest from "../middlewares/validate";
import { symptomInsertSchema } from "../schemas/symptom.schemas";

const symptomRouter = Router();

symptomRouter.use(authenticate);

symptomRouter.post(
    "/",
    validateRequest(symptomInsertSchema),
    symptomController.createSymptom
);

symptomRouter.put("/:symptomId", symptomController.updateSymptom);

symptomRouter.delete("/:symptomId", symptomController.deleteSymptom);

export default symptomRouter;
