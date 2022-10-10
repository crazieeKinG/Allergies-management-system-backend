import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import appRouter from "./routes";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import logger from "./misc/logger";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.get("/", (request: Request, response: Response) => {
    response.send("API is running...");
});

app.use(appRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    logger.info(`Server listening on port - ${PORT}`);
});
