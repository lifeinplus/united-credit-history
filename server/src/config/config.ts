import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = "mongodb://localhost/uchdb";

const SERVER_PORT = process.env.SERVER_PORT
    ? Number(process.env.SERVER_PORT)
    : 1337;

export const config = {
    mongo: {
        uri: MONGO_URI,
    },
    server: {
        port: SERVER_PORT,
    },
};
