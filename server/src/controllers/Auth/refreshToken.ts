import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { config } from "../../config";
import ROLE_LIST from "../../config/role_list";
import Logging from "../../library/Logging";
import { User } from "../../models";
import { UserToken } from "../../types";

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

        const roles = Object.values(foundUser.roles || {});

        const accessToken = jwt.sign(
            { userName: decoded.userName, roles },
            config.token.access.secret,
            { expiresIn: config.token.access.expiresIn }
        );

        return res
            .status(200)
            .json({ accessToken, roles, userName: foundUser.userName });
    } catch (error) {
        Logging.error(error);

        if (error instanceof Error) {
            return res.status(403).json({ message: error.message });
        }

        return res.status(500).json({ error });
    }
};

export default refreshToken;
