import express from "express";
import { User } from "../controllers";

const router = express.Router();

router.get("/refreshToken", User.refreshToken);
router.get("/logout", User.logout);
router.post("/login", User.login);
router.post("/register", User.register);

export = router;
