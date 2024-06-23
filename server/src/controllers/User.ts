import { Request, Response } from "express";
import { User } from "../models";

const getAll = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
            .select("-password -refreshToken")
            .sort("userName");

        const result = users.map((user) => {
            const { _id, userName, roles } = user;
            return { _id, userName, roles: JSON.stringify(roles) };
        });

        return result.length
            ? res.status(200).json(result)
            : res.status(404).json({ message: "Users not found" });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateById = async (req: Request, res: Response) => {
    const { id, roles } = req.body;

    if (!id) {
        return res.status(400).json({
            message: `User ID required`,
        });
    }

    try {
        const user = await User.findOne({ _id: id })
            .select("-password -refreshToken")
            .exec();

        if (!user) {
            return res.sendStatus(204);
        }

        if (roles) user.roles = JSON.parse(roles);

        const result = await user.save();

        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: `User ID required`,
        });
    }

    try {
        const user = await User.findOne({ _id: id })
            .select("-password -refreshToken")
            .exec();

        if (!user) {
            return res.sendStatus(204);
        }

        const result = await user.deleteOne({ _id: id });

        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default { getAll, updateById, deleteById };
