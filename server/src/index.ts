import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { config } from "./config/config";

import Report from "./controllers/Report";

const app = express();

mongoose
    .connect(config.mongo.uri)
    .then(() => {
        console.log(`Connected to MongoDB`);
        StartServer();
    })
    .catch((error) => {
        console.error("Unable to connect: ");
        console.error(error);
    });

const StartServer = () => {
    app.use(cors());
    app.use(express.json());

    app.get("/reports", Report.readAll);

    app.listen(config.server.port, () => {
        console.log(`Server is running on port ${config.server.port}`);
    });
};
