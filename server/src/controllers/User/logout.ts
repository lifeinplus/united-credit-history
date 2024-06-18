import { Request, Response } from "express";

import Logging from "../../library/Logging";
import { User } from "../../models";

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

export default logout;
