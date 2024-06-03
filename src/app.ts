import express from "express";
import serverless from "serverless-http";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorMiddleware";

const app = express();
app.use(express.json({}));

app.use("/", routes);
app.use(errorHandler);

export const handler = serverless(app);