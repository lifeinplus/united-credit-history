import bcrypt from "bcrypt";
import { Request, Response } from "express";

import ROLE_LIST from "../../config/role_list";
import Logging from "../../library/Logging";
import { User } from "../../models";

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
            roles: { user: ROLE_LIST.user },
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

export default register;
