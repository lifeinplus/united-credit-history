import express from "express";
import { Auth } from "../controllers";

const router = express.Router();

router.post("/login", Auth.login);
router.get("/logout", Auth.logout);
router.get("/refreshToken", Auth.refreshToken);
router.post("/register", Auth.register);

export = router;
