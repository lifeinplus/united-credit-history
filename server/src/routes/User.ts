import express from "express";
import { User } from "../controllers";

const router = express.Router();
router.get("/getAll", User.getAll);
router.put("/updateById", User.updateById);
router.delete("/deleteById/:id", User.deleteById);

export = router;
