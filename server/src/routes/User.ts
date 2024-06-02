import express from "express";
import { User } from "../controllers";

const router = express.Router();

router.get("/refreshToken", User.refreshToken);
router.post("/signin", User.signin);
router.get("/signout", User.signout);
router.post("/signup", User.signup);

export = router;
