import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { config } from "../config";
import Logging from "../library/Logging";
import { User } from "../models";

const getProfile = (req: Request, res: Response) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(409).json({ message: `Token is required` });
    }

    const profile = jwt.verify(token, config.jwt.secret);

    if (profile) {
        return res.status(200).json({ profile });
    }

    return res.status(401).json({ message: `Profile not found` });
};

const signin = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res
            .status(409)
            .json({ message: `Username and password required` });
    }

    try {
        const user = await User.findOne({ userName });

        if (!user) {
            return res
                .status(401)
                .json({ message: `User [${userName}] not found` });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        const token = jwt.sign(
            { userName: user.userName, id: user._id },
            config.jwt.secret,
            { expiresIn: "1d" }
        );

        return res
            .status(200)
            .cookie("token", token)
            .json({ message: "Password is correct" });
    } catch (error) {
        Logging.error(error);

        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }

        return res.status(500).json({ error });
    }
};

const signup = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    if (!userName) {
        return res.status(409).json({
            message: `Username is required`,
        });
    }

    if (!password || password.length < 4) {
        return res.status(409).json({
            message: `Password is required and should be at least 4 characters long`,
        });
    }

    try {
        const user = await User.findOne({ userName });

        if (user) {
            return res.status(409).json({
                message: `Username [${userName}] is taken already`,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            userName,
            password: hashedPassword,
        });

        return res.status(200).json({
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

export default { getProfile, signin, signup };
