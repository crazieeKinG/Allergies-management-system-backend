import { Router } from "express";
import { allergyController } from "../controllers";
import authenticate from "../middlewares/authentication";
import validateRequest from "../middlewares/validate";
import { allergyInsertSchema } from "../schemas/allergy.schemas";

const allergyRouter = Router();

allergyRouter.use(authenticate);

allergyRouter.get("/", allergyController.getAllergys);

allergyRouter.post(
    "/",
    validateRequest(allergyInsertSchema),
    allergyController.createAllergy
);

allergyRouter.put("/:allergyId", allergyController.updateAllergy);

allergyRouter.delete("/:allergyId", allergyController.deleteAllergy);

export default allergyRouter;
