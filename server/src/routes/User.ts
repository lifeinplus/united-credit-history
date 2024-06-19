import express from "express";
import { User } from "../controllers";

const router = express.Router();

router.post("/login", User.login);
router.get("/logout", User.logout);
router.get("/refreshToken", User.refreshToken);
router.post("/register", User.register);

export = router;
