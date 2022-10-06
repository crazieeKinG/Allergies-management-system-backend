import { Router } from "express";
import allergyRouter from "./allergy.routes";
import symptomRouter from "./symptom.routes";
import userRouter from "./user.routes";

const appRouter = Router();

appRouter.use("/user", userRouter);

appRouter.use("/allergy", allergyRouter);
appRouter.use("/symptom", symptomRouter);

export default appRouter;
