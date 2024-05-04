import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { config } from "./config/config";
import { Person, Report } from "./routes";

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

    app.use("/reports", Report);
    app.use("/persons", Person);

    app.get("/ping", (req, res, next) =>
        res.status(200).json({ message: "pong" })
    );

    app.use((req, res, next) => {
        const error = new Error("not found");
        return res.status(404).json({ message: error.message });
    });

    app.listen(config.server.port, () => {
        console.log(`Server is running on port ${config.server.port}`);
    });
};
