import dotenv from "dotenv";

dotenv.config();

const CORS_CREDENTIALS = process.env.CORS_CREDENTIALS?.toLowerCase() === "true";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "";

const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || "5m";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "1h";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_PORT = process.env.MONGO_PORT || "";
const MONGO_DBNAME = process.env.MONGO_DBNAME || "";
const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:${MONGO_PORT}/${MONGO_DBNAME}`;

const SERVER_PORT = process.env.SERVER_PORT
    ? Number(process.env.SERVER_PORT)
    : 1337;

export const config = {
    cors: {
        credentials: CORS_CREDENTIALS,
        origin: CORS_ORIGIN,
    },
    mongo: {
        uri: MONGO_URI,
    },
    server: {
        port: SERVER_PORT,
    },
    token: {
        access: {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN,
            secret: ACCESS_TOKEN_SECRET,
        },
        refresh: {
            expiresIn: REFRESH_TOKEN_EXPIRES_IN,
            secret: REFRESH_TOKEN_SECRET,
        },
    },
};
