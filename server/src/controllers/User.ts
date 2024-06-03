import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { config } from "../config";
import Logging from "../library/Logging";
import { User } from "../models";
import { UserToken } from "../types";

const login = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res
            .status(400)
            .json({ message: `Username and password required` });
    }

    try {
        const foundUser = await User.findOne({ userName });

        if (!foundUser) {
            return res
                .status(401)
                .json({ message: `User [${userName}] not found` });
        }

        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        const accessToken = jwt.sign(
            { userName: foundUser.userName },
            config.token.access.secret,
            { expiresIn: config.token.access.expiresIn }
        );

        const refreshToken = jwt.sign(
            { userName: foundUser.userName },
            config.token.refresh.secret,
            { expiresIn: config.token.refresh.expiresIn }
        );

        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        return res
            .status(200)
            .cookie("jwt", refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            })
            .json({ accessToken });
    } catch (error) {
        Logging.error(error);

        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }

        return res.status(500).json({ error });
    }
};

const logout = async (req: Request, res: Response) => {
    const { jwt: refreshToken } = req.cookies;
    if (!refreshToken) return res.sendStatus(204);

    res.clearCookie("jwt");

    try {
        const foundUser = await User.findOne({ refreshToken });

        if (foundUser) {
            foundUser.refreshToken = "";
            await foundUser.save();
        }

        return res.sendStatus(200);
    } catch (error) {
        Logging.error(error);

        if (error instanceof Error) {
            return res.status(403).json({ message: error.message });
        }

        return res.status(500).json({ error });
    }
};

const refreshToken = async (req: Request, res: Response) => {
    const { jwt: refreshToken } = req.cookies;
    if (!refreshToken)
        return res.status(401).json({ message: "refreshToken not found" });

    try {
        const foundUser = await User.findOne({ refreshToken: refreshToken });

        if (!foundUser) {
            return res.status(403).json({ message: "user not found" });
        }

        const decoded = jwt.verify(
            refreshToken,
            config.token.refresh.secret
        ) as UserToken;

        if (decoded.userName !== foundUser.userName) {
            return res.status(403).json({ message: "userName incorrect" });
        }

        const accessToken = jwt.sign(
            { userName: decoded.userName },
            config.token.access.secret,
            { expiresIn: config.token.access.expiresIn }
        );

        return res
            .status(200)
            .json({ accessToken, userName: foundUser.userName });
    } catch (error) {
        Logging.error(error);

        if (error instanceof Error) {
            return res.status(403).json({ message: error.message });
        }

        return res.status(500).json({ error });
    }
};

const register = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    if (!userName) {
        return res.status(400).json({
            message: `Username is required`,
        });
    }

    if (!password || password.length < 4) {
        return res.status(400).json({
            message: `Password is required and should be at least 4 characters long`,
        });
    }

    try {
        const foundUser = await User.findOne({ userName });

        if (foundUser) {
            return res.status(409).json({
                message: `Username [${userName}] is taken already`,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            userName,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: `User [${newUser.userName}] created successfully`,
        });
    } catch (error) {
        Logging.error(error);

        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }

        return res.status(500).json({ error });
    }
};

export default { login, logout, refreshToken, register };
