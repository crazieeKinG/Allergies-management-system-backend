import { Router } from "express";
import allergyRouter from "./allergy.routes";
import userRouter from "./user.routes";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/allergys", allergyRouter);

export default appRouter;
