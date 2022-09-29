import { Router } from "express";
import allergyRouter from "./allergy.routes";
import symptomRouter from "./symptom.routes";
import userRouter from "./user.routes";

const appRouter = Router();

appRouter.use("/users", userRouter);

appRouter.use("/allergys", allergyRouter);
appRouter.use("/symptoms", symptomRouter);

export default appRouter;
