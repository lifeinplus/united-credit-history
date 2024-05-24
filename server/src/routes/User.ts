import express from "express";
import { User } from "../controllers";

const router = express.Router();

router.get("/getProfile", User.getProfile);
router.post("/signin", User.signin);
router.post("/signup", User.signup);

export = router;
