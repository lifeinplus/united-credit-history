import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { config } from "./config";

import {
    Common,
    Delinquency,
    Flc,
    Loan,
    Person,
    Report,
    RequestCount,
} from "./routes";

const app = express();

mongoose
    .connect(config.mongo.uri, { authSource: "admin" })
    .then(() => {
        console.log(`Connected to MongoDB`);
        StartServer();
    })
    .catch((error) => {
        console.error("Unable to connect to MongoDB: ");
        console.error(error);
    });

const StartServer = () => {
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/commons", Common);
    app.use("/delinquencies", Delinquency);
    app.use("/flcs", Flc);
    app.use("/loans", Loan);
    app.use("/persons", Person);
    app.use("/reports", Report);
    app.use("/requestCounts", RequestCount);

    app.get("/ping", (req, res, next) =>
        res.status(200).json({ message: "pong" })
    );

    app.use((req, res, next) => {
        const error = new Error("url not found");
        return res.status(404).json({ message: error.message });
    });

    app.listen(config.server.port, () => {
        console.log(`Server is running on port ${config.server.port}`);
    });
};
