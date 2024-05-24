import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_PORT = process.env.MONGO_PORT || "";
const MONGO_DBNAME = process.env.MONGO_DBNAME || "";
const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_DBNAME}`;

const SERVER_PORT = process.env.SERVER_PORT
    ? Number(process.env.SERVER_PORT)
    : 1337;

export const config = {
    jwt: {
        secret: JWT_SECRET,
    },
    mongo: {
        uri: MONGO_URI,
    },
    server: {
        port: SERVER_PORT,
    },
};
